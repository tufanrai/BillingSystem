"use client";
import React, { useState } from "react";
import {
  User,
  Sun,
  Info,
  Bell,
  Lock,
  Database,
  ShieldCheck,
  Key,
  LogOut,
  RefreshCcw,
  FileDown,
  Trash2,
} from "lucide-react";

// --- Types ---
interface SystemInfo {
  version: string;
  lastUpdated: string;
  environment: "Production" | "Development" | "Staging";
}

const SettingsPage: React.FC = () => {
  // --- State for Toggles ---
  const [darkMode, setDarkMode] = useState(false);
  const [orderNotifications, setOrderNotifications] = useState(true);
  const [paymentAlerts, setPaymentAlerts] = useState(true);
  const [dailyReports, setDailyReports] = useState(false);

  const systemInfo: SystemInfo = {
    version: "1.0.0",
    lastUpdated: "March 11, 2026",
    environment: "Production",
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-8 md:p-12 font-sans text-gray-900">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* === Profile Settings === */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Profile Settings</h2>
              <p className="text-sm text-gray-500">
                Manage your account preferences
              </p>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Name
              </label>
              <p className="text-lg font-semibold mt-1">Admin</p>
            </div>
            <div className="pt-4 border-t border-gray-50">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Email
              </label>
              <p className="text-lg font-semibold mt-1">admin@example.com</p>
            </div>
            <div className="pt-4 border-t border-gray-50">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Role
              </label>
              <p className="text-lg font-semibold mt-1 text-gray-700">
                Administrator
              </p>
            </div>
          </div>
        </section>

        {/* === Appearance === */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Appearance</h2>
              <p className="text-sm text-gray-500">
                Customize the look and feel
              </p>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Sun className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-bold">Dark Mode</p>
                  <p className="text-xs text-gray-500">
                    Switch between light and dark theme
                  </p>
                </div>
              </div>
              <Toggle checked={darkMode} onChange={setDarkMode} />
            </div>
            {/* Theme Note (Callout) */}
            <div className="flex gap-4 p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <Info className="w-5 h-5 text-blue-500 shrink-0" />
              <div>
                <p className="text-sm font-bold text-blue-900">Theme Note</p>
                <p className="text-xs text-blue-700 leading-relaxed mt-1">
                  Dark mode is currently in development and will be available in
                  the next update. The toggle will save your preference for when
                  it's ready.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* === Notifications === */}
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

        {/* === Security === */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center gap-4">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Security</h2>
              <p className="text-sm text-gray-500">
                Manage security preferences
              </p>
            </div>
          </div>
          <div className="p-6 space-y-3">
            <ActionButton
              label="Change Password"
              icon={<Key className="w-4 h-4" />}
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

        {/* === Data Management === */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Data Management</h2>
              <p className="text-sm text-gray-500">
                Manage your application data
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

        {/* === System Information === */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8">
            <h2 className="text-xl font-bold mb-6">System Information</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Version:</span>
                <span className="font-mono font-bold">
                  {systemInfo.version}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Last Updated:</span>
                <span className="font-medium">{systemInfo.lastUpdated}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Environment:</span>
                <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-bold">
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

// --- Helper Components ---

const Toggle = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <button
    onClick={() => onChange(!checked)}
    className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${checked ? "bg-orange-500" : "bg-gray-200"}`}
  >
    <div
      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${checked ? "translate-x-6" : ""}`}
    />
  </button>
);

const NotificationItem = ({ title, desc, checked, onChange }: any) => (
  <div className="flex items-center justify-between p-4 bg-gray-50/50 border border-gray-100 rounded-xl">
    <div>
      <p className="font-bold text-gray-800">{title}</p>
      <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
    </div>
    <Toggle checked={checked} onChange={onChange} />
  </div>
);

const ActionButton = ({ label, icon, variant = "default" }: any) => (
  <button
    className={`w-full flex items-center justify-between px-5 py-3 rounded-xl border transition-all active:scale-[0.98] ${
      variant === "danger"
        ? "border-red-100 bg-white text-red-600 hover:bg-red-50"
        : "border-gray-100 bg-white hover:bg-gray-50 text-gray-700"
    }`}
  >
    <span className="text-sm font-bold">{label}</span>
    {icon}
  </button>
);

export default SettingsPage;
