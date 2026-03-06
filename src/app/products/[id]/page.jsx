import Link from "next/link";
import { headers } from "next/headers";

async function getProduct(id) {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const baseUrl = host ? `${proto}://${host}` : "";

  const res = await fetch(`${baseUrl}/api/products/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.product ?? null;
}

export default async function ProductDetailsPage({ params }) {
  const product = await getProduct(params?.id);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-3 text-2xl font-semibold">Product not found</h1>
        <Link className="link" href="/trending">
          Back to Trending
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-6">
        <Link className="link" href="/trending">
          ← Back to Trending
        </Link>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row">
          {product.image ? (
            <div className="w-full md:w-1/2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.title || "Product"}
                className="h-[320px] w-full rounded-md object-cover"
              />
            </div>
          ) : null}

          <div className="flex-1">
            <h1 className="mb-2 text-3xl font-bold">{product.title || "Untitled"}</h1>

            <div className="mb-4 flex flex-wrap gap-2">
              <span className="badge badge-outline bg-green-100 text-green-700">
                {product.downloads ?? "—"} downloads
              </span>
              <span className="badge badge-outline bg-yellow-100 text-yellow-700">
                {product.ratingAvg ?? "—"} rating
              </span>
              {product.category ? (
                <span className="badge badge-outline">{product.category}</span>
              ) : null}
            </div>

            {product.description ? (
              <p className="whitespace-pre-line text-gray-700">{product.description}</p>
            ) : (
              <p className="text-gray-500">No description provided.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

