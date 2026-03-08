"use client";

export default function DeleteButton({ id }) {
  async function handleDelete() {
    const confirmDelete = confirm("Are you sure you want to delete?");

    if (!confirmDelete) return;

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
      window.location.href = "/trending";
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-white bg-red-600 px-4 py-2 rounded-lg mt-4"
    >
      Delete
    </button>
  );
}