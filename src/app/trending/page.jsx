import Link from "next/link";
import { headers } from "next/headers";
import { MongoClient } from "mongodb";

async function getproduct() {
  try {
     const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect()
    const db = client.db("project"); 
    const collection = db.collection("products"); 

    const products = await collection.find({}).toArray();

  
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
    <div className="bg-base-100 text-base-content">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-center text-3xl font-bold sm:text-4xl">
          All Products
        </h1>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {product.map((p) => (
              <Link
                key={p._id}
                href={`/products/${p._id}`}
                className="card border-2 bg-base-100 shadow-md transition hover:scale-[1.02]"
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
                 <div className="flex flex-col"><span className="text-gray-600">Description:</span>
                   {p.shortDesc}
                 </div>
                  <div className="card-actions justify-between">
                    <div className="badge badge-outline bg-purple-300 text-purple-600">
                     Price = {p.meta.price ?? "—"} $
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
