"use client";

import { useState } from "react";

export default function AddProduct() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const product = {
      title: form.title.value,
      shortDesc: form.shortDesc.value,
      fullDesc: form.fullDesc.value,
      price: form.price.value,
      date: form.date.value,
      priority: form.priority.value,
      banner: form.banner.value,
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Product Added Successfully");
        form.reset();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="title"
          placeholder="Title"
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="shortDesc"
          placeholder="Short Description"
          required
          className="w-full border p-2 rounded"
        />

        <textarea
          name="fullDesc"
          placeholder="Full Description"
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="date"
          name="date"
          required
          className="w-full border p-2 rounded"
        />

        <select
          name="priority"
          className="w-full border p-2 rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          name="banner"
          type="url"
          placeholder="Image URL "
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded"
        >
          {loading ? "Adding..." : "Submit"}
        </button>

      </form>
    </div>
  );
}