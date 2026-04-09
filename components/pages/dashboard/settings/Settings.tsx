"use client";
import React, { useState } from "react";
import {
  User,
  Bell,
  Lock,
  Database,
  ShieldCheck,
  Key,
  LogOut,
  RefreshCcw,
  FileDown,
  Trash2,
  Loader,
} from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "@/components/utils/schema/auth-schema";
import { updateUserCredentails } from "@/app/api/apiRequests";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface SystemInfo {
  version: string;
  lastUpdated: string;
  environment: "Production" | "Development" | "Staging";
}

export interface IUserSchema {
  email?: string;
  name?: string;
}

const NotificationItem = ({ title, desc, checked, onChange }: any) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl">
    <div>
      <p className="font-bold text-gray-800">{title}</p>
      <p className="text-xs text-gray-500 mt-1">{desc}</p>
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full transition-colors ${checked ? "bg-orange-500" : "bg-gray-200"}`}
      aria-label={`${checked ? "Disable" : "Enable"} ${title}`}
    >
      <span
        className={`block h-4 w-4 bg-white rounded-full transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`}
      />
    </button>
  </div>
);

const ActionButton = ({ label, icon, url = "", variant = "default" }: any) => {
  const style =
    variant === "danger"
      ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
      : "bg-white border-gray-100 text-gray-700 hover:bg-gray-50";

  return (
    <Link
      href={url || "#"}
      className={`w-full flex items-center justify-between px-5 py-3 rounded-xl border ${style} transition`}
    >
      <span className="font-bold text-sm">{label}</span>
      {icon}
    </Link>
  );
};

const SettingsPage: React.FC = () => {
  const navigate = useRouter();
  const [editingProfile, setEditingProfile] = useState<boolean>(false);
  const [orderNotifications, setOrderNotifications] = useState<boolean>(true);
  const [paymentAlerts, setPaymentAlerts] = useState<boolean>(true);
  const [dailyReports, setDailyReports] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState(
    JSON.parse(Cookies.get("user") || "{}"),
  );

  console.log(JSON.parse(Cookies.get("user")!));
  const systemInfo: SystemInfo = {
    version: "1.0.0",
    lastUpdated: "March 11, 2026",
    environment: "Production",
  };

  // mutate data
  const { mutate, isPending } = useMutation({
    mutationFn: updateUserCredentails,
    onSuccess: (data) => {
      toast.success(data.message);
      Cookies.set("user", JSON.stringify(data?.data.user));
      setUserDetails(data?.data);
      navigate.refresh();
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
      reset();
    },
  });

  // Form input valdiation
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  // Submit function
  const Submit = (data: IUserSchema) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 md:p-12 font-sans text-gray-900 bg-gray-100">
      <div className="max-w-3xl mx-auto space-y-6">
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Profile Settings</h2>
              <p className="text-sm text-gray-500">
                Manage your account details
              </p>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <form
              onSubmit={handleSubmit(Submit)}
              onDoubleClick={() => setEditingProfile(!editingProfile)}
              className="grid gap-3 sm:grid-cols-2"
            >
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">
                  Name
                </p>
                {editingProfile ? (
                  <>
                    <input
                      type="text"
                      {...register("name")}
                      defaultValue={userDetails?.name}
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.name && errors.name.message ? (
                      <p className="text-xs text-red-500 text-start py-3">
                        {errors.name.message}
                      </p>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <p className="mt-1 text-lg font-semibold text-gray-800">
                    {userDetails?.name ?? "Guest User"}
                  </p>
                )}
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">
                  Email
                </p>
                {editingProfile ? (
                  <>
                    <input
                      {...register("email")}
                      defaultValue={userDetails?.email}
                      type="email"
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.email && errors.email.message ? (
                      <p className="text-xs text-red-500 text-start py-3">
                        {errors.email.message}
                      </p>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <p className="mt-1 text-lg font-semibold text-gray-800">
                    {userDetails?.email ?? "user@example.com"}
                  </p>
                )}
              </div>
              <div>
                {editingProfile ? (
                  <div className="flex gap-2">
                    <button
                      disabled={isPending}
                      className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 flex items-center justify-center gap-2"
                    >
                      {isPending ? (
                        <span>
                          <Loader className="w-6 h-6 animate-spin" /> Saving...
                        </span>
                      ) : (
                        "Save"
                      )}
                    </button>
                  </div>
                ) : null}
              </div>
            </form>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Notifications</h2>
              <p className="text-sm text-gray-500">
                Manage notification preferences
              </p>
            </div>
          </div>
          <div className="p-6 space-y-3">
            <NotificationItem
              title="Order Notifications"
              desc="Get notified when new orders are placed"
              checked={orderNotifications}
              onChange={setOrderNotifications}
            />
            <NotificationItem
              title="Payment Alerts"
              desc="Receive alerts for completed payments"
              checked={paymentAlerts}
              onChange={setPaymentAlerts}
            />
            <NotificationItem
              title="Daily Reports"
              desc="Get daily sales summary via email"
              checked={dailyReports}
              onChange={setDailyReports}
            />
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center gap-4">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Security</h2>
              <p className="text-sm text-gray-500">Manage security settings</p>
            </div>
          </div>
          <div className="p-6 space-y-3">
            <ActionButton
              label="Change Password"
              icon={<Key className="w-4 h-4" />}
              url="/auth/confirmPassword"
            />
            <ActionButton
              label="Two-Factor Authentication"
              icon={<ShieldCheck className="w-4 h-4" />}
            />
            <ActionButton
              label="Session Management"
              icon={<LogOut className="w-4 h-4" />}
            />
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Data Management</h2>
              <p className="text-sm text-gray-500">
                Data operations and backups
              </p>
            </div>
          </div>
          <div className="p-6 space-y-3">
            <ActionButton
              label="Export All Data"
              icon={<FileDown className="w-4 h-4" />}
            />
            <ActionButton
              label="Backup Database"
              icon={<RefreshCcw className="w-4 h-4" />}
            />
            <ActionButton
              label="Clear All Data"
              icon={<Trash2 className="w-4 h-4" />}
              variant="danger"
            />
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8">
            <h2 className="text-xl font-bold mb-6">System Information</h2>
            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-500">Version:</span>
                <span className="font-mono font-bold">
                  {systemInfo.version}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Last Updated:</span>
                <span>{systemInfo.lastUpdated}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Environment:</span>
                <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-semibold">
                  {systemInfo.environment}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
