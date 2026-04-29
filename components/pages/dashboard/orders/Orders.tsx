"use client";
import React, { useState } from "react";
import {
  ShoppingCart,
  Clock,
  Calendar,
  CircleDollarSign,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";

// --- Types ---
// Ready for your MongoDB schema integration
export interface Order {
  id: string;
  tableNumber: string;
  itemCount: number;
  status: "Pending" | "Completed" | "Cancelled";
  paymentStatus: "Paid" | "Unpaid";
  total: number;
  date: string;
}

interface ICards {
  icon: React.ReactNode;
  title: string;
  subtitle: React.ReactNode;
}

const CardDetails: ICards[] = [
  {
    icon: (
      <div className="p-2 bg-orange-50 text-orange-500 rounded-lg">
        <ShoppingCart className="w-5 h-5" />
      </div>
    ),
    title: "Total Orders",
    subtitle: <p className="text-3xl font-semibold">0</p>,
  },
  {
    icon: (
      <div className="p-2 bg-yellow-50 text-yellow-500 rounded-lg">
        <Clock />
      </div>
    ),
    title: "Pending",
    subtitle: <p className="text-3xl font-semibold text-yellow-600">0</p>,
  },
  {
    icon: (
      <div className="p-2 bg-green-50 text-green-500 rounded-lg">
        <Calendar />
      </div>
    ),
    title: "Completed",
    subtitle: <p className="text-3xl font-semibold text-green-600">0</p>,
  },
  {
    icon: (
      <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
        <CircleDollarSign />
      </div>
    ),
    title: "Total Revenue",
    subtitle: <p className="text-3xl font-semibold text-blue-600">$0.00</p>,
  },
];

// --- Main Component ---
const Orders: React.FC = () => {
  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Pending" | "Completed"
  >("All");

  const navigate = useRouter();

  // Mock empty state (can be replaced with actual fetched data)
  const orders: Order[] = [];

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Order Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              View and manage all orders
            </p>
          </div>
          <button
            onClick={() => navigate.replace("/cashier")}
            className="inline-flex items-center cursor-pointer justify-center px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm w-full sm:w-auto"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            New Order
          </button>
        </div>

        {/* Stats Grid (Mobile: 1 col, Tablet: 2 cols, Desktop: 4 cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Cards */}
          {CardDetails &&
            CardDetails.map((detail, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-32"
              >
                <div className="flex items-center gap-3 mb-4">
                  {detail.icon}
                  <span className="text-sm font-medium text-gray-500">
                    {detail.title}
                  </span>
                </div>
                {detail.subtitle}
              </div>
            ))}
        </div>

        {/* Action Bar (Search & Filters) */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center">
          {/* Search Input */}
          <div className="relative w-full lg:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-colors"
              placeholder="Search by order ID, table number, or item name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Toggles */}
          <div className="flex p-1 space-x-1 bg-gray-50/50 rounded-lg border border-gray-200 w-full lg:w-auto">
            {["All Orders", "Pending", "Completed"].map((filter) => {
              const isActive =
                activeFilter === filter.split(" ")[0] ||
                (filter === "All Orders" && activeFilter === "All");
              return (
                <button
                  key={filter}
                  onClick={() =>
                    setActiveFilter(
                      filter === "All Orders" ? "All" : (filter as any),
                    )
                  }
                  className={`flex-1 lg:flex-none px-4 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors ${
                    isActive
                      ? "bg-orange-500 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Data Table Area */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {/* Wrapper for horizontal scrolling on mobile */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  {[
                    "Order ID",
                    "Table",
                    "Items",
                    "Status",
                    "Payment",
                    "Total",
                    "Date",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-6 py-4 text-left text-sm font-semibold text-gray-500 tracking-wider whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-16 text-center text-gray-500 text-sm"
                    >
                      No orders found
                    </td>
                  </tr>
                ) : (
                  // Map over your actual orders here
                  orders.map((order) => (
                    <tr key={order.id}>
                      {/* Add table cells (td) based on your data structure */}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
