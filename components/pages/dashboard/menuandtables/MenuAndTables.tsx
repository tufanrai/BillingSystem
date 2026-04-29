"use client";
import React, { useState } from "react";
import AddItemModal from "../../forms/NewItemForm";
import { useQuery } from "@tanstack/react-query";
import { getAllFoodItem, getAllTable } from "@/app/api/apiRequests";

// --- Types ---
interface MenuItem {
  _id: string;
  itemName: string;
  price: number;
  category: string;
}
export interface Table {
  _id: number;
  tableNumber: number;
  capacity: number;
  status: "Available" | "Occupied";
}

// --- Icons ---
const PlusIcon = () => (
  <svg
    className="w-4 h-4 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

const TrashIcon = () => (
  <svg
    className="w-4 h-4 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const EditIcon = () => (
  <svg
    className="w-4 h-4 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

// --- Component ---
const MenuAndTables: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Menu Items" | "Tables">(
    "Menu Items",
  );
  const [openForm, setOpenForm] = useState<boolean>(false);

  const { data: itemList } = useQuery({
    queryKey: ["foodItems"],
    queryFn: getAllFoodItem,
  });

  const { data: tableList } = useQuery({
    queryKey: ["tableLists"],
    queryFn: getAllTable,
  });

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-8 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Tab Navigation */}
        <div className="bg-gray-100/50 p-2 flex gap-2 w-fit rounded-xl m-6">
          {["Menu Items", "Tables"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-8 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === tab
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="px-6 pb-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold">{activeTab} Management</h2>
              <p className="text-sm text-gray-500 mt-1">
                {activeTab === "Menu Items"
                  ? `Total Items: ${itemList?.length ?? 0} | Categories: ${(itemList ?? []).filter((i: MenuItem) => i.category).length}`
                  : `Total: ${(tableList ?? []).length} | Available: ${(tableList ?? []).filter((t: Table) => t.status === "Available").length} | Occupied: ${tableList.filter((t: Table) => t.status === "Occupied")}`}
              </p>
            </div>
            <button
              onClick={() => setOpenForm(!openForm)}
              className="inline-flex items-center px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors shadow-sm"
            >
              <PlusIcon />
              Add New {activeTab === "Menu Items" ? "Item" : "Table"}
            </button>
          </div>

          {/* Conditional Content Rendering */}
          {activeTab === "Menu Items" ? (
            <div className="space-y-12">
              {(itemList ?? [])?.map(({ category }: MenuItem) => (
                <section key={category}>
                  <h3 className="text-lg font-bold mb-6 border-b border-gray-100 pb-2">
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(itemList ?? [])
                      .filter((item: MenuItem) => item.category === category)
                      .map((item: MenuItem) => (
                        <div
                          key={item._id}
                          className="group border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all"
                        >
                          <div className="p-5">
                            <h4 className="font-bold text-gray-900">
                              {item.itemName}
                            </h4>
                            <p className="text-orange-500 font-bold text-lg mt-1">
                              ${item.price}
                            </p>
                            <div className="flex gap-2 mt-4">
                              <button className="cursor-pointer flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                                <EditIcon /> Edit
                              </button>
                              <button className="cursor-pointer flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors">
                                <TrashIcon /> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            /* Tables Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(tableList ?? []).map((table: Table) => (
                <div
                  key={table._id}
                  className="border border-gray-200 rounded-2xl p-8 flex flex-col items-center hover:border-orange-200 transition-colors"
                >
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-gray-400">
                      {table.tableNumber}
                    </span>
                  </div>
                  <h4 className="font-bold text-lg mb-2">
                    Capacity {table.capacity}
                  </h4>
                  <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
                    {table.status}
                  </span>
                  <button className="w-full inline-flex justify-center items-center px-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium hover:bg-red-50 hover:text-red-600 transition-colors">
                    <TrashIcon /> Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {openForm === true ? (
        <AddItemModal
          isOpen
          section={activeTab}
          onClose={() => setOpenForm(!openForm)}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default MenuAndTables;
