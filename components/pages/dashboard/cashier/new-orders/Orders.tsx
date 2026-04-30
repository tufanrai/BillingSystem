"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  Banknote,
  CreditCard,
} from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllFoodItem, placeNewOrder } from "@/app/api/apiRequests";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { orderBill } from "@/components/utils/schema/auth-schema";
import { useForm } from "react-hook-form";

// --- Type Definitions ---
interface MenuItem {
  _id: number;
  itemName: string;
  price: number;
  category: string;
  image?: string;
}

interface IItem {
  itemName: string;
  price: number;
  quantity: number;
}
export interface IOrderBill {
  restaurantId?: string;
  tableId?: string;
  items: IItem[];
}

interface CartItem extends MenuItem {
  quantity: number;
}

type GroupedItems = Record<string, MenuItem[]>;

export const Orders = () => {
  const navigate = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discountValue, setDiscountValue] = useState<string>("0");
  const [tableNumber, setTableNumber] = useState<string>("");
  const [tableId, setTableId] = useState<string>("");

  // Query data
  const { data: MENU_ITEMS } = useQuery({
    queryKey: ["MenuItem"],
    queryFn: getAllFoodItem,
  });

  // Mutate data
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(orderBill),
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: placeNewOrder,
    mutationKey: ["newOrder"],
  });

  // Get the table id and number for the localStorage
  useEffect(() => {
    setTableNumber(localStorage.getItem("table_number") ?? "0");
    setTableId(localStorage.getItem("table_id") ?? "");
  }, []);

  // Group items by category and filter by search query
  const filteredAndGroupedItems = useMemo<GroupedItems>(() => {
    const filtered = (MENU_ITEMS || [])?.filter((item: MenuItem) =>
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return filtered.reduce((acc: GroupedItems, item: MenuItem) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [searchQuery, MENU_ITEMS]);

  // Cart Calculations
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const grossTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discountAmount = parseFloat(discountValue) || 0;
  const netTotal = Math.max(0, grossTotal - discountAmount);

  const isCartEmpty = cart.length === 0;

  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existingItem = prev.find((i) => i._id === item._id);
      if (existingItem) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // --- New Cart Control Handlers ---
  const handleIncreaseQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleDecreaseQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const handleRemoveItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  // Handle submit Bill.
  const createBill = (data: IOrderBill) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 font-sans text-gray-800">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Cashier Terminal
          </h1>
          <p className="text-sm text-gray-500">Process orders and payments</p>
        </div>
        <button
          onClick={() => navigate.replace("/cashier")}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors w-fit"
        >
          <ArrowLeft size={16} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            Back to Tables
          </span>
        </button>
      </header>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column: Menu Items */}
        <main className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">Menu Items</h2>

          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Menu Categories */}
          <div className="space-y-8">
            {Object.entries(filteredAndGroupedItems).map(
              ([category, items]) => (
                <div key={category}>
                  <h3 className="text-orange-500 font-medium mb-4">
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((item) => (
                      <div
                        key={item._id}
                        onClick={() => handleAddToCart(item)}
                        className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:shadow-md transition-shadow bg-white cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image || "/api/placeholder/64/64"}
                            alt={item.itemName}
                            className="w-16 h-16 rounded-lg object-cover bg-gray-100"
                          />
                          <div>
                            <h4 className="font-medium text-sm text-gray-900">
                              {item.itemName}
                            </h4>
                            <p className="text-orange-500 font-semibold text-sm">
                              ${Number(item?.price).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <button
                          className="p-1.5 text-orange-500 hover:bg-orange-50 rounded-full transition-colors"
                          aria-label={`Add ${item.itemName} to cart`}
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </main>

        {/* Right Column: Cart & Checkout (Sticky on Desktop) */}
        <form
          onSubmit={handleSubmit(createBill)}
          className="w-full lg:w-[450px] flex flex-col gap-6 lg:sticky lg:top-6 h-fit"
        >
          {/* Cart Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <ShoppingCart size={20} className="text-orange-500" />
                <h2 className="font-semibold text-gray-900">
                  Table {tableNumber}
                </h2>
              </div>
              <span className="bg-orange-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                {totalItems} items
              </span>
            </div>

            <div className="min-h-[200px] flex flex-col items-center justify-center text-gray-400 space-y-3">
              {isCartEmpty ? (
                <>
                  <ShoppingCart
                    size={48}
                    strokeWidth={1.5}
                    className="text-gray-300"
                  />
                  <p className="text-sm">No items added yet</p>
                </>
              ) : (
                <div className="w-full flex-1 overflow-y-auto max-h-[350px] space-y-3 pr-2 scrollbar-thin">
                  {cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-3 p-3 bg-[#F4F6F9] rounded-xl transition-all"
                    >
                      <img
                        src={item.image || "/api/placeholder/48/48"}
                        alt={item.itemName}
                        className="w-12 h-12 rounded-lg object-cover bg-gray-200 flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 truncate">
                          {item.itemName}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          ${Number(item.price).toFixed(2)} each
                        </p>
                      </div>

                      <div className="flex items-center gap-2 ml-auto">
                        <button
                          onClick={() => handleDecreaseQuantity(item._id)}
                          className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-md hover:bg-gray-50 text-gray-600 transition-colors shadow-sm"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-4 text-center text-sm font-medium text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncreaseQuantity(item._id)}
                          className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-md hover:bg-gray-50 text-gray-600 transition-colors shadow-sm"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors mx-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} strokeWidth={2.5} />
                      </button>

                      <div className="font-bold text-sm text-gray-900 min-w-[55px] text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Checkout Totals Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
            {/* Totals Calculation */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 font-mono">$</span>
                  <span className="text-sm">Gross Total:</span>
                </div>
                <span className="font-semibold text-gray-900 text-lg">
                  ${grossTotal.toFixed(2)}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-gray-400 font-mono">%</span>
                  <span className="text-sm">Discount Amount</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Net Total Highlight */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex justify-between items-center">
              <span className="font-bold text-gray-900">Net Total:</span>
              <span className="text-2xl font-bold text-orange-500">
                ${netTotal.toFixed(2)}
              </span>
            </div>

            {/* Payment Buttons */}
            <div className="space-y-3">
              <button
                disabled={isCartEmpty}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-white transition-all
                  ${isCartEmpty ? "bg-[#98D8A3] cursor-not-allowed opacity-90" : "bg-green-500 hover:bg-green-600 shadow-sm"}`}
              >
                <Banknote size={18} />
                Paid by Cash
              </button>

              <button
                disabled={isCartEmpty}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-white transition-all
                  ${isCartEmpty ? "bg-[#93B4FF] cursor-not-allowed opacity-90" : "bg-blue-500 hover:bg-blue-600 shadow-sm"}`}
              >
                <CreditCard size={18} />
                Paid Online
              </button>

              {isCartEmpty && (
                <p className="text-center text-xs text-gray-400 pt-2">
                  Add items to enable payment
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
