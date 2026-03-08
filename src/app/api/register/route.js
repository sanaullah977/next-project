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
    const { name, email, password, image } = await req.json();

    const client = await getClient();
    const db = client.db("project");       // তোমার DB নাম
    const collection = db.collection("users"); // collection নাম

    // Check if user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {  status: 400 , message: "User already exists with this email!" },
       
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // New user document
    const newUser = {
      name,
      email,
      password: hashedPassword,
      image: image || "",
      role: "user",
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newUser);

    return NextResponse.json(
    {status:201, message: "Registration successful!", id: result.insertedId })  
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {status: 500, message: "Internal Server Error" },
      
    );
  }
}