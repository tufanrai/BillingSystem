"use client";
import React from "react";

// Defining our types for future scalability
// (Easy to expand when connecting to a MongoDB/Express backend)
interface Table {
  id: number;
  name: string;
  status: "Available" | "Occupied" | "Reserved";
}

// Mock data reflecting the initial state
const TABLE_DATA: Table[] = [
  {
    id: 1,
    name: "Table 1",
    status: "Reserved",
  },
  {
    id: 2,
    name: "Table 2",
    status: "Available",
  },
  {
    id: 3,
    name: "Table 3",
    status: "Occupied",
  },
  {
    id: 4,
    name: "Table 4",
    status: "Available",
  },
];

const Cashier: React.FC = () => {
  // Generates the dynamic date string (e.g., "Monday, March 30, 2026")
  const currentDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Main Workspace */}
      <main className="flex-1 p-4 max-w-7xl mx-auto w-full">
        {/* Page Title Area */}
        <div className="mb-8 relative">
          <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
            Cashier Terminal
          </h2>
          <p className="text-gray-500 mt-2 text-xs">
            Process orders and payments
          </p>
        </div>

        {/* Primary Interaction Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900">Select a Table</h3>
            <p className="text-gray-500 text-sm mt-1 mb-8">
              Choose a table to start taking orders
            </p>

            {/* Mobile-First Grid: 
              1 col on mobile -> 2 cols on small screens -> 4 cols on large screens 
            */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {TABLE_DATA.map((table) => (
                <button
                  key={table.id}
                  className="group flex flex-col items-center p-6 bg-white border border-gray-200 rounded-2xl hover:border-orange-300 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                  onClick={() =>
                    console.log(`Routing to ${table.name} orders...`)
                  }
                >
                  {/* Circular Number Indicator */}
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-full mb-4 group-hover:bg-gray-100 transition-colors duration-200">
                    <span className="text-xl font-bold text-gray-900">
                      {table.id}
                    </span>
                  </div>

                  {/* Table Label */}
                  <span className="text-lg font-bold text-neutral-800 mb-3">
                    {table.name}
                  </span>

                  {/* Status Badge */}
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold border ${
                      table.status === "Available"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : table.status === "Reserved"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-orange-50 text-orange-700 border-orange-200"
                    }`}
                  >
                    {table.status}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cashier;
