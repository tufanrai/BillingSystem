"use client";
import { useState } from "react";
import { Eye, EyeOff, Utensils, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signUpSchema } from "@/utils/schema/auth-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpUser } from "@/app/api/apiRequests";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export interface ISignUp {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  restaurant: string;
}

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useRouter();

  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: SignUpUser,
    onSuccess: (data) => {
      if (!data) {
        return;
      }
      toast.success(data.message);
      Cookies.set("token", data.data.token);
      Cookies.set("user", JSON.stringify(data.data.user));
      reset();
      navigate.replace("/dashboard");
    },
    onError: (err: any) => {
      toast.error(err);
      reset();
    },
  });

  // Form validator
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({
    resolver: yupResolver(signUpSchema),
  });

  // Submit function
  const submit = (data: ISignUp) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5e9d8] px-4">
      <div className="w-full max-w-md bg-gray-100 rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="bg-orange-500 p-4 rounded-xl shadow-md">
            <span className="text-white text-2xl">
              <Utensils />
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          RestaurantPOS
        </h1>
        <p className="text-center text-gray-500 text-sm mt-1 mb-6">
          Create an account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(submit)} className="space-y-5">
          {/* Full name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full name
            </label>
            <input
              type="text"
              {...register("fullName")}
              placeholder="Jhon Doe"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-transparent text-gray-700 placeholder-gray-400"
            />
            {errors.fullName && errors.fullName.message ? (
              <p className="text-xs text-red-500 text-start py-2">
                {errors.fullName.message}
              </p>
            ) : (
              ""
            )}
          </div>

          {/* Restaurant name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Restaurant name
            </label>
            <input
              type="text"
              {...register("restaurant")}
              placeholder="Jhon Doe"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-transparent text-gray-700 placeholder-gray-400"
            />
            {errors.restaurant && errors.restaurant.message ? (
              <p className="text-xs text-red-500 text-start py-2">
                {errors.restaurant.message}
              </p>
            ) : (
              ""
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="admin@restaurant.com"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-transparent text-gray-700 placeholder-gray-400"
            />
            {errors.email && errors.email.message ? (
              <p className="text-xs text-red-500 text-start py-2">
                {errors.email.message}
              </p>
            ) : (
              ""
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className="w-full px-3 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-transparent text-gray-700 placeholder-gray-400"
              />
              {errors.password && errors.password.message ? (
                <p className="text-xs text-red-500 text-start py-2">
                  {errors.password.message}
                </p>
              ) : (
                ""
              )}

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("confirmPassword")}
                className="w-full px-3 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-transparent text-gray-700 placeholder-gray-400"
              />
              {errors.confirmPassword && errors.confirmPassword.message ? (
                <p className="text-xs text-red-500 text-start py-2">
                  {errors.confirmPassword.message}
                </p>
              ) : (
                ""
              )}

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isPending}
            className={`w-full bg-orange-500 ease duration-200 hover:bg-orange-600 text-white py-2.5 rounded-xl font-medium transition duration-200 ${isPending ? "cursor-disabled" : "cursor-pointer"}`}
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-4">
                <Loader className="animate-spin" /> Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-sm text-neutral-500 text-center mt-4">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="text-orange-500 ease hover:underline hover:font-medium"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
