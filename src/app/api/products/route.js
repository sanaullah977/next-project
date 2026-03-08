import { NextResponse } from "next/server";
import { getMongoClient } from "@/lib/mongoConnect";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit") || 8);

    const client = await getMongoClient();
    const db = client.db("project");

    const products = await db
      .collection("products")
      .find({})
      .sort({ createdAt: -1 })
      .limit(Number.isFinite(limit) ? Math.max(1, Math.min(limit, 50)) : 8)
      .toArray();

    return NextResponse.json(
      {
        products: products.map((p) => ({ ...p, _id: p._id.toString() })),
      },
      { status: 200 }
    );
  } catch (_error) {
    console.log(_error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const { title, shortDesc, fullDesc, price, date, priority, banner } = body;

    const client = await getMongoClient();
    const db = client.db("project");

    const newProduct = {
      title,
      shortDesc,
      fullDesc,
      meta: {
        price: Number(price),
        date: new Date(date),
        priority,
      },
      banner: banner || "",
      createdAt: new Date(),
    };

    const result = await db.collection("products").insertOne(newProduct);

    return NextResponse.json(
      { message: "Product added successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to add product" },
      { status: 500 }
    );
  }
}



export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const client = await getMongoClient();
    const db = client.db("project");

    const result = await db
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}
