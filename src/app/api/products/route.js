import { NextResponse } from "next/server";
import { getMongoClient } from "@/lib/mongoConnect";

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

