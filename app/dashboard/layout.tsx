"use client";
import { ReactNode, useState } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  Settings,
  Menu,
  LogOut,
  User,
  Calculator,
  ShoppingBag,
  UtensilsCrossed,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import HoC from "./hoc/HoC";
import {
  ContextProvider,
  UserContext,
} from "@/components/utils/Provider/ContextProvider";
import { useContext } from "react";

interface INavItem {
  icon: React.ReactNode;
  children: string;
  url: string;
}

interface IUser {
  name: string;
  email: string;
  id: string;
  role: string;
}

const NavigationItems: INavItem[] = [
  {
    icon: <LayoutDashboard size={18} />,
    children: "Dashboard",
    url: "/dashboard",
  },
  {
    icon: <Calculator size={18} />,
    children: "Cashier",
    url: "/dashboard/cashier",
  },
  {
    icon: <ShoppingBag size={18} />,
    children: "Orders",
    url: "/dashboard/orders",
  },
  {
    icon: <UtensilsCrossed size={18} />,
    children: "Menu & Tables",
    url: "/dashboard/menuandtables",
  },
  {
    icon: <ClipboardList size={18} />,
    children: "Reports",
    url: "/dashboard/reports",
  },
  {
    icon: <Settings size={18} />,
    children: "Settings",
    url: "/dashboard/settings",
  },
];
export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ContextProvider>
      <HoC>
        <div className="h-screen flex bg-gray-100">
          {/* Sidebar */}
          <aside
            className={`fix md:static z-40 top-0 left-0 min-h-screen w-64 bg-white border-r transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 transition-transform duration-200`}
          >
            <Sidebar />
          </aside>

          {/* Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/30 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main */}
          <div className="w-full flex-1 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b px-4 py-3 flex items-center gap-3">
              <button
                className="md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu />
              </button>

              <div>
                <h1 className="font-semibold text-lg text-neutral-800">
                  Dashboard
                </h1>
                <p className="text-xs text-gray-500">Sunday, March 29, 2026</p>
              </div>
            </header>

            {/* Page Content */}
            <main className="p-4 overflow-y-auto">{children}</main>
          </div>
        </div>
      </HoC>
    </ContextProvider>
  );
}

/* ================= Sidebar ================= */

function Sidebar() {
  const navigate = useRouter();
  const userDetail = useContext(UserContext);

  // Logout handler
  const onLogOut = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    toast.success("user logged out successfully");
    navigate.replace("/auth/login");
  };

  const user: IUser = userDetail ?? {
    name: "Guest",
    email: "guest@restaurantpos.local",
    id: "",
    role: "guest",
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Logo */}
      <div className="p-4 border-b flex items-center gap-3">
        <div className="bg-orange-500 text-white p-2 rounded-lg">
          <Utensils />
        </div>
        <div>
          <h2 className="font-semibold text-neutral-800">RestaurantPOS</h2>
          <p className="text-xs text-gray-500">Management System</p>
        </div>
      </div>

      {/* User */}
      <div className="p-4 flex items-center gap-3 border-b">
        <div className="bg-orange-100 p-2 rounded-full">
          <User size={18} className="text-orange-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-neutral-800">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {NavigationItems &&
          NavigationItems.map((navItem, index) => {
            const pathname = usePathname();
            const isActive = pathname === navItem.url;
            return (
              <NavItem
                key={index}
                icon={navItem.icon}
                active={isActive}
                url={navItem.url}
              >
                {navItem.children}
              </NavItem>
            );
          })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t mt-auto">
        <button
          onClick={() => onLogOut()}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black hover:bg-orange-100/50 w-full px-5 py-2 rounded-md  cursor-pointer"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

function NavItem({
  icon,
  children,
  url,
  active,
}: {
  icon: ReactNode;
  children: ReactNode;
  url: string;
  active: boolean;
}) {
  return (
    <Link href={url}>
      <div
        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm ${
          active
            ? "bg-orange-500 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        {icon}
        {children}
      </div>
    </Link>
  );
}
