"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Title from "@/Components/Title";
import React from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Register() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, imageUrl, email, password } = data;

    try {
      // রেজিস্ট্রেশন এপিআই কল
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          image: imageUrl || "",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      Swal.fire({
        title: "Well Done!",
        text: "Your account has been created.",
        icon: "success",
      });

      router.push("/login"); 
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (err) {
      toast.error(err?.message);
    }
  };
  return (
    <div
      className="flex  flex-col justify-center items-center min-h-screen 
                bg-white dark:bg-slate-950 
                transition-colors duration-300"
    >
      <Title>WellCome To Register </Title>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate=""
        className="space-y-6"
      >
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Your Name Here"
              className="w-full px-3 py-2 border rounded-md
                       border-gray-300 dark:border-slate-700
                       bg-gray-200 dark:bg-slate-800
                       text-gray-900 dark:text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-orange-500
                       transition-colors"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label
              className="block mb-2 text-sm font-medium 
                            text-gray-700 dark:text-gray-300"
            >
              Profile Image URL (optional)
            </label>

            <input
              type="url"
              placeholder="https://example.com/avatar.png"
              className="w-full px-3 py-2 border rounded-md
                       border-gray-300 dark:border-slate-700
                       bg-gray-200 dark:bg-slate-800
                       text-gray-900 dark:text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-orange-500
                       transition-colors"
              {...register("imageUrl")}
            />

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              If you don&apos;t have an image URL, leave this empty.
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email Here"
              className="w-full px-3 py-2 border rounded-md
                       border-gray-300 dark:border-slate-700
                       bg-gray-200 dark:bg-slate-800
                       text-gray-900 dark:text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-orange-500
                       transition-colors"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative items-center">
            <label htmlFor="password" className="block mb-2 text-sm">
              Password
            </label>

            <input
              type={showPass ? "text" : "password"}
              autoComplete="current-password"
              id="password"
              required
              placeholder="*******"
              className="w-full px-3 py-2 border rounded-md
                       border-gray-300 dark:border-slate-700
                       bg-gray-200 dark:bg-slate-800
                       text-gray-900 dark:text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-orange-500
                       transition-colors"

                       {...register("password", { required: "Password is required" })}
            />

            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-9 cursor-pointer 
                       text-gray-600 dark:text-gray-400 mt-1
                       hover:text-orange-500 transition duration-300"
            >
              {showPass ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex justify-center items-center gap-2
                   bg-orange-500 hover:bg-orange-600
                   w-full rounded-md py-3
                   text-white font-medium
                   transition-all duration-200"
        >
          {/* {loading && (
          <PiGearFineDuotone size={20} className="animate-spin" />
        )} */}
          Continue
        </button>
      </form>

       <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center gap-3
                 border border-gray-300 dark:border-slate-700
                 bg-white dark:bg-slate-800
                 hover:bg-gray-50 dark:hover:bg-slate-700
                 rounded-md m-3 p-3
                 cursor-pointer transition-colors"
        >
          <FcGoogle size={26} />
          <p className="text-gray-700 dark:text-gray-200">
            Continue with Google
          </p>
        </div>
    </div>
  );
}
