"use client";
import React, { useEffect, useState } from "react";
import {
  Banknote,
  CreditCard,
  Database,
  DollarSign,
  Download,
  Percent,
  ShoppingBag,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllReports } from "@/app/api/apiRequests";
import toast from "react-hot-toast";

// --- Types ---
interface FilterOption {
  label: string;
  value: "today" | "week" | "month" | "year";
}

interface OrderDetail {
  id: string;
  table: string;
  gross: number;
  discount: number;
  net: number;
  payment: "Cash" | "Card";
  date: string;
}

// --- Mock Data ---
const FILTER_OPTIONS: FilterOption[] = [
  { label: "Today", value: "today" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "Year", value: "year" },
];

const ORDER_DETAILS: OrderDetail[] = []; // Empty state mock

// --- Sub-components (for modularity within one file) ---

const StatBadge: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = "bg-slate-100 text-slate-600",
}) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${color}`}
  >
    {children}
  </span>
);

const ChartPlaceholder: React.FC<{ id: string; color?: string }> = ({
  id,
  color = "text-slate-400",
}) => (
  <div className="flex-1 flex flex-col items-center justify-center py-10 rounded-xl border border-dashed border-slate-200">
    <Database className={`w-12 h-12 ${color} mb-3`} strokeWidth={1} />
    <p className="text-slate-500 font-medium">
      No {id} data for selected period
    </p>
    <p className="text-xs text-slate-400 mt-1">
      Check back later or change filters
    </p>
  </div>
);

// --- Main Component ---
const FinancialDashboard: React.FC = () => {
  const queryClient = useQueryClient;
  const [selectedFilter, setSelectedFilter] =
    useState<FilterOption["value"]>("month");

  // Query data
  const { data } = useQuery({
    queryKey: ["Reports"],
    queryFn: getAllReports,
  });

  useEffect(() => {
    if (typeof data === "string") toast.error("You don't have any bills yet");
  }, [data]);

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 font-sans text-slate-900">
      <div className="max-w-[1700px] mx-auto space-y-8 sm:space-y-10">
        {/* === Part 1: Upper Section (Header & KPI Cards) === */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tighter">
              Financial Reports
            </h1>
            <p className="text-slate-500 mt-1.5">
              Comprehensive profit and loss statements at a glance
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            {/* Filter Buttons */}
            <div className="inline-flex gap-1.5 p-1 bg-white border border-slate-200 rounded-full shadow-inner w-full sm:w-auto">
              {FILTER_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedFilter(option.value)}
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition w-full sm:w-auto ${
                    selectedFilter === option.value
                      ? "bg-orange-500 text-white shadow"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {/* Export Button */}
            <button className="inline-flex items-center justify-center gap-2.5 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm font-semibold transition border border-slate-200 w-full sm:w-auto">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </header>

        {/* KPI Cards Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Card 1: Total Revenue */}
          <article className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between group hover:border-orange-100 hover:shadow-lg transition">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-green-100 text-green-700 rounded-2xl">
                <DollarSign className="w-7 h-7" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500 opacity-0 group-hover:opacity-100 transition" />
            </div>
            <div className="mt-8">
              <p className="text-sm font-medium text-slate-500">
                Total Revenue
              </p>
              <p className="text-4xl font-extrabold mt-1.5">$0.00</p>
              <div className="flex gap-1.5 mt-3">
                <StatBadge color="bg-green-50 text-green-700">
                  0 orders
                </StatBadge>
              </div>
            </div>
          </article>

          {/* Card 2: Net Profit */}
          <article className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between group hover:border-orange-100 hover:shadow-lg transition">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-blue-100 text-blue-700 rounded-2xl">
                <TrendingUp className="w-7 h-7" />
              </div>
              <StatBadge color="bg-blue-100 text-blue-700">0.0%</StatBadge>
            </div>
            <div className="mt-8">
              <p className="text-sm font-medium text-slate-500">Net Profit</p>
              <p className="text-4xl font-extrabold mt-1.5">$0.00</p>
              <div className="flex gap-1.5 mt-3">
                <StatBadge color="bg-blue-50 text-blue-700">
                  After COGS (30%)
                </StatBadge>
              </div>
            </div>
          </article>

          {/* Card 3: Total Discounts */}
          <article className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between group hover:border-orange-100 hover:shadow-lg transition">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-red-100 text-red-700 rounded-2xl">
                <Percent className="w-7 h-7" />
              </div>
              <TrendingDown className="w-5 h-5 text-red-500 opacity-0 group-hover:opacity-100 transition" />
            </div>
            <div className="mt-8">
              <p className="text-sm font-medium text-slate-500">
                Total Discounts
              </p>
              <p className="text-4xl font-extrabold mt-1.5 text-orange-600">
                $0.00
              </p>
              <div className="flex gap-1.5 mt-3">
                <StatBadge color="bg-red-50 text-red-700">
                  0.0% of gross
                </StatBadge>
              </div>
            </div>
          </article>

          {/* Card 4: Cost of Goods (COGS) */}
          <article className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between group hover:border-orange-100 hover:shadow-lg transition">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-red-100 text-red-700 rounded-2xl">
                <DollarSign className="w-7 h-7" />
              </div>
              <TrendingUp className="w-5 h-5 text-red-500 opacity-0 group-hover:opacity-100 transition" />
            </div>
            <div className="mt-8">
              <p className="text-sm font-medium text-slate-500">
                Cost of Goods (COGS)
              </p>
              <p className="text-4xl font-extrabold mt-1.5 text-red-700">
                $0.00
              </p>
              <div className="flex gap-1.5 mt-3">
                <StatBadge color="bg-red-50 text-red-700">
                  30% of gross revenue
                </StatBadge>
              </div>
            </div>
          </article>
        </section>

        {/* Charts Grid */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <article className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-full flex flex-col">
            <h3 className="text-xl font-bold mb-6">Revenue Trend</h3>
            <ChartPlaceholder id="revenue" color="text-green-400" />
            <div className="mt-5 text-sm text-slate-500 text-center flex items-center justify-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              revenue
            </div>
          </article>
          {/* Order Volume */}
          <article className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-full flex flex-col">
            <h3 className="text-xl font-bold mb-6">Order Volume</h3>
            <ChartPlaceholder id="order volume" color="text-orange-400" />
            <div className="mt-5 text-sm text-slate-500 text-center flex items-center justify-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-orange-500"></div>
              orders
            </div>
          </article>
        </section>

        {/* === Part 2: Bottom Section (Payment & Table) === */}

        {/* Payment Methods Analysis */}
        <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold mb-8">Payment Methods Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cash Payments */}
            <article className="bg-green-50/50 p-6 rounded-2xl border border-green-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white text-green-700 rounded-xl shadow-inner border border-green-100">
                  <Banknote className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-green-700">
                    Cash Payments
                  </p>
                  <p className="text-3xl font-extrabold text-green-900 mt-0.5">
                    $0.00
                  </p>
                </div>
                <Users className="w-5 h-5 text-green-500" />
              </div>
              <ul className="mt-6 space-y-2.5 text-sm text-slate-600">
                <li className="flex justify-between items-center">
                  <span className="font-medium text-slate-700">
                    Transactions
                  </span>{" "}
                  <span>0</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-medium text-slate-700">
                    Average Order
                  </span>{" "}
                  <span>$0.00</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-medium text-slate-700">% of Total</span>{" "}
                  <span className="text-orange-600 font-bold">0.0%</span>
                </li>
              </ul>
            </article>
            {/* Online Payments */}
            <article className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white text-blue-700 rounded-xl shadow-inner border border-blue-100">
                  <CreditCard className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-blue-700">
                    Online Payments
                  </p>
                  <p className="text-3xl font-extrabold text-blue-900 mt-0.5">
                    $0.00
                  </p>
                </div>
                <ShoppingBag className="w-5 h-5 text-blue-500" />
              </div>
              <ul className="mt-6 space-y-2.5 text-sm text-slate-600">
                <li className="flex justify-between items-center">
                  <span className="font-medium text-slate-700">
                    Transactions
                  </span>{" "}
                  <span>0</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-medium text-slate-700">
                    Average Order
                  </span>{" "}
                  <span>$0.00</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-medium text-slate-700">% of Total</span>{" "}
                  <span className="text-orange-600 font-bold">0.0%</span>
                </li>
              </ul>
            </article>
          </div>
        </section>

        {/* Order Details Table */}
        <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <h3 className="text-xl font-bold mb-8">Order Details</h3>
          {ORDER_DETAILS.length === 0 ? (
            <ChartPlaceholder id="order detail" />
          ) : (
            // Wrapper for horizontal scrolling on tiny screens
            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full text-sm text-left">
                <thead className="text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 border-b border-slate-200">
                  <tr>
                    {[
                      "Order ID",
                      "Table",
                      "Gross",
                      "Discount",
                      "Net Total",
                      "Payment",
                      "Date",
                    ].map((header) => (
                      <th
                        key={header}
                        scope="col"
                        className="px-6 py-4 whitespace-nowrap"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ORDER_DETAILS.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-orange-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono font-medium text-slate-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 font-medium">{order.table}</td>
                      <td className="px-6 py-4 text-slate-600">
                        ${order.gross.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-orange-600 font-medium">
                        -${order.discount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 font-extrabold text-slate-900">
                        ${order.net.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${order.payment === "Cash" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"}`}
                        >
                          {order.payment === "Cash" ? (
                            <Banknote className="w-3.5 h-3.5" />
                          ) : (
                            <CreditCard className="w-3.5 h-3.5" />
                          )}
                          {order.payment}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                        {order.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default FinancialDashboard;
