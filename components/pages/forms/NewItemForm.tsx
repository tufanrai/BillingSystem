"use client";
import React, { useEffect } from "react";
import { X } from "lucide-react";
import { foodItemSchema } from "@/components/utils/schema/auth-schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { socketManager } from "../../../app/api/socketInstance";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  // In a real app, you'd pass a submit handler here
  // onSubmit: (data: any) => void;
}

export interface IFoodItem {
  itemName: string;
  price: number;
  category: string;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose }) => {
  // Handle 'Esc' key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  // Form handler
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(foodItemSchema),
  });

  // submit function
  const submit = (data: IFoodItem) => {
    const socket = socketManager.socket("/", {
      auth: {
        token: Cookies.get("token"),
      },
    });

    socket.emit("join", { data });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* 1. Backdrop Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* 2. Modal Container */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-50">
          <h2 className="text-xl font-bold text-slate-900">
            Add New Menu Item
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form className="p-8 space-y-6" onSubmit={handleSubmit(submit)}>
          {/* Item Name */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">
              Item Name <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              {...register("itemName")}
              placeholder="e.g., Margherita Pizza"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-slate-300"
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">
              Price <span className="text-orange-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price")}
              placeholder="e.g., 12.99"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-slate-300"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">
              Category <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              {...register("category")}
              placeholder="e.g., Main Course, Dessert, Beverage"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-slate-300"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 mt-10 pt-6 border-t border-slate-50">
            <button
              type="reset"
              onClick={onClose}
              className="w-full sm:w-auto px-8 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors border border-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-lg shadow-orange-500/25 transition-all active:scale-95"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
