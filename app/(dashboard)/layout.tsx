"use client";
import { ReactNode, useEffect, useState } from "react";
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
import { set } from "react-hook-form";

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
  { icon: <LayoutDashboard size={18} />, children: "Dashboard", url: "/" },
  { icon: <Calculator size={18} />, children: "Cashier", url: "/cashier" },
  { icon: <ShoppingBag size={18} />, children: "Orders", url: "/orders" },
  {
    icon: <UtensilsCrossed size={18} />,
    children: "Menu & Tables",
    url: "/menuandtables",
  },
  { icon: <ClipboardList size={18} />, children: "Reports", url: "/reports" },
  { icon: <Settings size={18} />, children: "Settings", url: "/settings" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <HoC>
      <div className="h-screen flex bg-gray-100 text-gray-900">
        <aside
          className={`fixed md:static z-40 top-0 left-0 min-h-screen w-64 border-r bg-white border-gray-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-200`}
        >
          <Sidebar />
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="w-full flex-1 flex flex-col">
          <header className="px-4 py-3 flex items-center gap-3 border-b bg-white border-gray-200">
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu />
            </button>
            <div>
              <h1 className="font-semibold text-lg">Dashboard</h1>
              <p className="text-xs text-gray-500">Sunday, March 29, 2026</p>
            </div>
          </header>
          <main className="p-4 overflow-y-auto">{children}</main>
        </div>
      </div>
    </HoC>
  );
}

function Sidebar() {
  const navigate = useRouter();
  const pathname = usePathname();
  const [userDetail, setUserDetail] = useState({
    name: "Guest",
    email: "guest@restaurantpos.local",
    id: "",
    role: "guest",
  });

  const onLogOut = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    toast.success("user logged out successfully");
    navigate.replace("/auth/login");
  };

  useEffect(() => {
    setUserDetail(JSON.parse(Cookies.get("user")!));
  }, []);

  const user: IUser = userDetail ?? {
    name: "Guest",
    email: "guest@restaurantpos.local",
    id: "",
    role: "guest",
  };

  return (
    <div className="flex flex-col min-h-screen text-slate-900">
      <div className="p-4 border-b flex items-center gap-3 border-gray-200">
        <div className="bg-orange-500 text-white p-2 rounded-lg">
          <Utensils />
        </div>
        <div>
          <h2 className="font-semibold text-neutral-800">RestaurantPOS</h2>
          <p className="text-xs text-gray-500">Management System</p>
        </div>
      </div>
      <div className="p-4 flex items-center gap-3 border-b border-gray-200">
        <div className="bg-orange-100 p-2 rounded-full">
          <User size={18} className="text-orange-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-neutral-800">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {NavigationItems.map((navItem, index) => {
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
      <div className="p-4 border-t mt-auto">
        <button
          onClick={onLogOut}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black hover:bg-orange-100/50 w-full px-5 py-2 rounded-md cursor-pointer"
        >
          <LogOut size={18} /> Logout
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
  const baseClass = active
    ? "bg-orange-500 text-white"
    : "text-gray-600 hover:bg-gray-100";

  return (
    <Link href={url}>
      <div
        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors duration-200 ${baseClass}`}
      >
        {icon}
        {children}
      </div>
    </Link>
  );
}
