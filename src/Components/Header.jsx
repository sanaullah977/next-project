"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });

      localStorage.removeItem("user");
      setUser();

      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="navbar bg-base-100 shadow-sm">

      {/* Left */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/trending">Products</Link>
            </li>
            <li>
              <Link href="/addproduct">Add Products</Link>
            </li>
          </ul>
        </div>

        <Link href="/" className="btn btn-ghost text-xl">
          ProductHub
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/trending">Products</Link>
          </li>
          <li>
            <Link href="/addproduct">Add Products</Link>
          </li>
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end">
        {user ? (
          <button
            onClick={handleLogout}
            className="btn bg-red-500 text-white"
          >
            Logout
          </button>
        ) : (
          <Link href="/login" className="btn bg-green-500 text-white">
            Login
          </Link>
        )}
      </div>

    </div>
  );
};

export default Header;