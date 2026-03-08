import Link from "next/link";
import { headers } from "next/headers";
import DeleteButton from "@/Components/DeleteButton";

async function getProduct(id) {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.product;
}

async function handleDelete(id) {
  try {
    const res = await fetch(`/api/products?id=${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Delete failed");
      return;
    }

    alert("Product deleted successfully");

    // page refresh
    window.location.reload();
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
}
export default async function ProductDetails({ params }) {
  const { id } = await params;

  const product = await getProduct(id);
  console.log(product.fullDesc);

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
          {product.banner ? (
            <div className="w-full md:w-1/2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.banner}
                alt={product.title || "Product"}
                className="h-[320px] w-full rounded-md object-cover"
              />
            </div>
          ) : null}

          <div className="card flex-1">
            <h1 className=" card-title mb-2 text-3xl font-bold">
              {product.title || "Untitled"}
            </h1>

            <div className="mb-4 flex flex-wrap gap-2">
              <span className="badge badge-outline bg-green-100 text-green-700">
               Price: ${product.meta.price ?? "—"}
              </span>
              
              {/* {product.category ? (
                <span className="badge badge-outline">{product.category}</span>
              ) : null} */}
            </div>

            {product.fullDesc ? (
              <p className="whitespace-pre-line text-gray-700">
                {product.fullDesc}
              </p>
            ) : (
              <p className="text-gray-500">No description provided.</p>
            )}

          <DeleteButton id={product._id}/>
          </div>
        </div>
      </div>
    </div>
  );
}
