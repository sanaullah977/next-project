import Link from "next/link";
import { headers } from "next/headers";
import { MongoClient } from "mongodb";

async function getproduct() {
  try {
     const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect()
    const db = client.db("project"); // তোমার DB নাম
    const collection = db.collection("products"); // collection নাম

    // Latest 12 products নাও
    const products = await collection.find({}).limit(12).toArray();

    // ObjectId কে string এ convert করা
    return products.map((p) => ({
      ...p,
      _id: p._id.toString(),
    }));
  } catch (err) {
    console.error("MongoDB fetch error:", err);
    return [];
  }
}

export default async function TrendingPage() {
  const product = await getproduct();

  return (
    <div className="bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-4xl font-bold">Trending Apps</h1>

        {/* {product.length === 0 ? (
          <p className="text-center text-gray-500">
            No product found yet. Add some documents to your MongoDB
            <code className="mx-1 rounded bg-white px-2 py-1">product</code>
            collection.
          </p>
        ) : ( */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {product.map((p) => (
              <Link
                key={p._id}
                href={`/products/${p._id}`}
                className="card border-2 bg-white shadow-md transition hover:scale-[1.02]"
              >
                {p.banner ? (
                  <figure className="px-4 pt-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="h-[180px] w-full rounded-md object-cover"
                      src={p.banner}
                      alt={p.title || "Product"}
                    />
                  </figure>
                ) : null}
                <div className="card-body">
                  <h2 className="card-title line-clamp-1">{p.title || "Untitled"}</h2>
                  <div className="card-actions justify-between">
                    <div className="badge badge-outline bg-green-100 text-green-600">
                      {p.downloads ?? "—"} downloads
                    </div>
                    <div className="badge badge-outline bg-yellow-100 text-yellow-600">
                      {p.ratingAvg ?? "—"} rating
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        {/* )} */}
      </div>
    </div>
  );
}
