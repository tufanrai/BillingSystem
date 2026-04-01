"use client";
import React, { useState } from "react";
import { Lock, Eye, EyeOff, CheckCircle2, Circle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { changePasswordSchema } from "@/components/utils/schema/auth-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { updatePassword } from "@/app/api/apiRequests";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export interface INewPassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ConfirmPassword: React.FC = () => {
  // --- State ---
  const navigate = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Visibility Toggles
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // --- Validation Logic (Mocked for UI demonstration) ---
  const requirements = [
    { text: "At least 8 characters long", met: newPassword.length >= 8 },
    { text: "Contains a number", met: /\d/.test(newPassword) },
    {
      text: "Contains a special character",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    },
  ];

  //   --- mutation function ---
  const { mutate } = useMutation({
    mutationFn: updatePassword,
    onSuccess: (data: any) => {
      toast.success(data.message);
      reset();
      Cookies.remove("token");
      Cookies.remove("user");
      setTimeout(() => {
        navigate.replace("/auth/login");
      }, 1000);
    },
    onError: (err: any) => {
      toast.error(err.message);
      reset();
    },
  });

  // --- Form input validation ---
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  // --- submit function ---
  const UpdatePassword = (data: INewPassword) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 flex items-center justify-center font-sans text-slate-900">
      {/* Card Container */}
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="p-6 sm:p-8 border-b border-slate-50 text-center">
          <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            Change Password
          </h2>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Ensure your account is using a long, random password to stay secure.
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit(UpdatePassword)}
          className="p-6 sm:p-8 space-y-6"
        >
          {/* Current Password */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">
              Current Password <span className="text-orange-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                {...register("currentPassword")}
                placeholder="Enter current password"
                className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-slate-300"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showCurrent ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              {errors.currentPassword && errors.currentPassword.message ? (
                <p className="text-xs text-red-500 text-start py-2">
                  {errors.currentPassword.message}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* New Password */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">
              New Password <span className="text-orange-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                {...register("newPassword")}
                placeholder="Create new password"
                className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-slate-300"
              />
              {errors.newPassword && errors.newPassword.message ? (
                <p className="text-xs text-red-500 text-start py-2">
                  {errors.newPassword.message}
                </p>
              ) : (
                ""
              )}
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showNew ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">
              Confirm New Password <span className="text-orange-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword")}
                placeholder="Confirm new password"
                className={`w-full px-4 py-3 pr-12 rounded-xl border focus:outline-none focus:ring-2 transition-all placeholder:text-slate-300 ${
                  confirmPassword && newPassword !== confirmPassword
                    ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                    : "border-slate-200 focus:ring-orange-500/20 focus:border-orange-500"
                }`}
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
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showConfirm ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="text-xs font-semibold text-red-500 mt-1.5">
                Passwords do not match.
              </p>
            )}
          </div>

          {/* Password Requirements Checklist */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Password Requirements
            </p>
            <ul className="space-y-2">
              {requirements.map((req, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm">
                  {req.met ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-300" />
                  )}
                  <span
                    className={req.met ? "text-slate-700" : "text-slate-500"}
                  >
                    {req.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row items-center gap-3 pt-4">
            <button
              type="reset"
              className={`px-3 border border-orange-500 ease duration-200 hover:bg-orange-600 hover:text-white text-orange-500 py-2.5 rounded-xl font-medium transition duration-200 cursor-pointer`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-3 bg-orange-500 ease duration-200 hover:bg-orange-600 text-white py-2.5 rounded-xl font-medium transition duration-200 cursor-pointer`}
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmPassword;
