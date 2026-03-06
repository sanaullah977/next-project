"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Title from "@/Components/Title";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      // ১. NextAuth দিয়ে লগইন চেষ্টা
      const res = await signIn("credentials", {
        redirect: false, 
        email,
        password,
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      // ২. সাকসেস মেসেজ
      Swal.fire({
        title: "Login Successful!",
        text: "Redirecting to home...",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      router.push("/");
      router.refresh(); 
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      // গুগল সাইন ইন করলে callbackUrl অটোমেটিক রিডাইরেক্ট করবে
      await signIn("google", { callbackUrl: "/" });
    } catch (err) {
      console.error(err);
      toast.error("Google sign in failed!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center px-5 py-5 w-auto h-auto">
      <Title>Wellcome to Login Page</Title>
      <form onSubmit={handleSubmit} noValidate="" className="space-y-6">
        <div className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Email address
            </label>

            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter Your Email Here"
              className="w-full px-3 py-2 border rounded-md
                       border-gray-300 dark:border-slate-700
                       bg-gray-200 dark:bg-slate-800
                       text-gray-900 dark:text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-orange-500
                       transition-colors"
            />
          </div>

          {/* Password */}
          <div className="relative items-center">
            <label htmlFor="password" className="block mb-2 text-sm">
              Password
            </label>

            <input
              type={showPass ? "text" : "password"}
              name="password"
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
        <div>
          <button
            type="submit"
            className="flex justify-center items-center gap-2
                     bg-orange-500 hover:bg-orange-600
                     w-full rounded-md py-3
                     text-white font-medium
                     transition-all duration-200"
          >
            {/* {loading && (
                // <PiGearFineDuotone size={20} className="animate-spin" />
              )} */}
            Continue
          </button>
        </div>
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
