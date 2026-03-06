import { MongoClient } from "mongodb";

const options = {};

let cached = global._mongoClient;

if (!cached) {
  cached = global._mongoClient = { client: null, promise: null };
}

export async function getMongoClient() {
  if (cached.client) return cached.client;

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
    }
    const client = new MongoClient(uri, options);
    cached.promise = client.connect().then((c) => {
      cached.client = c;
      return c;
    });
  }

  return cached.promise;
}