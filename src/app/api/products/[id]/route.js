import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getMongoClient } from "@/lib/mongoConnect";

export async function GET(_request, { params }) {
  try {
    const { id } = params || {};
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid product id" }, { status: 400 });
    }

    const client = await getMongoClient();
    const db = client.db("project");

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        product: {
          ...product,
          _id: product._id.toString(),
        },
      },
      { status: 200 }
    );
  } catch (_error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}