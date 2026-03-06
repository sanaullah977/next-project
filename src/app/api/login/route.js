import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

// MongoClient cache for reuse
let client;
async function getClient() {
  if (!client) {
    client = new MongoClient("mongodb://127.0.0.1:27017");
    await client.connect();
  }
  return client;
}

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const client = await getClient();
    const db = client.db("project");          // Same DB as register
    const collection = db.collection("users"); // Same collection

    // Find user by email
    const user = await collection.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password!" },
        { status: 400 }
      );
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password!" },
        { status: 400 }
      );
    }

    // Successful login (return minimal user data)
    const { _id, name, image, role } = user;
    return NextResponse.json(
      { message: "Login successful!", user: { _id, name, email, image, role } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}