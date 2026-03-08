"use client";

export async function handleLogout() {
  try {
    const res = await fetch("/api/logout", {
      method: "POST",
    });

    if (!res.ok) {
      alert("Logout failed");
      return;
    }

    alert("Logged out successfully");

    window.location.href = "/login";
  } catch (error) {
    console.log(error);
  }
}