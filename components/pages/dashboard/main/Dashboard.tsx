"use client";
import React from "react";
import {
  Calculator,
  Clock,
  Users,
  CircleCheckBig,
  DollarSign,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

interface IButtonCard {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  url: string;
}

interface IFinanceCard {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  metaInfo: string;
  tag: React.ReactNode;
}

const ButtonCards: IButtonCard[] = [
  {
    icon: (
      <div className="flex items-center justify-center w-10 h-10 p-2 rounded-md bg-orange-100/50">
        <Calculator size={18} className="text-orange-500" />
      </div>
    ),
    title: "Cashier",
    subtitle: "Process Orders",
    url: "/dashboard/cashier",
  },
  {
    icon: (
      <div className="flex items-center justify-center w-10 h-10 p-2 rounded-md bg-orange-100/50">
        <Clock size={18} className="text-orange-500" />
      </div>
    ),
    title: "Pending Orders",
    subtitle: "0",
    url: "/dashboard/orders",
  },
  {
    icon: (
      <div className="flex items-center justify-center w-10 h-10 p-2 rounded-md bg-blue-100/50">
        <Users size={18} className="text-blue-500" />
      </div>
    ),
    title: "Total Tables",
    subtitle: "0",
    url: "/dashboard/menuandtables",
  },
  {
    icon: (
      <div className="flex items-center justify-center w-10 h-10 p-2 rounded-md bg-green-100/50">
        <CircleCheckBig size={18} className="text-green-500" />
      </div>
    ),
    title: "Menu items",
    subtitle: "0",
    url: "/dashboard/menuandtables",
  },
];

const FinanceCards: IFinanceCard[] = [
  {
    icon: (
      <div className="flex items-center justify-center w-10 h-10 p-2 rounded-md bg-green-100/50">
        <DollarSign size={18} className="text-green-500" />
      </div>
    ),
    title: "Today's Revenue",
    subtitle: "$0",
    metaInfo: "0 orders today",
    tag: (
      <span className="px-3 py-2 rounded-full text-xs bg-green-100/50 text-green-500">
        +12.5%
      </span>
    ),
  },
  {
    icon: (
      <div className="flex items-center justify-center w-10 h-10 p-2 rounded-md bg-blue-100/50">
        <ShoppingCart size={18} className="text-blue-500" />
      </div>
    ),
    title: "Total Orders",
    subtitle: "0",
    metaInfo: "All time completed",
    tag: (
      <span className="px-3 py-2 rounded-full text-xs bg-blue-100/50 text-blue-500">
        0 active
      </span>
    ),
  },
  {
    icon: (
      <div className="flex items-center justify-center w-10 h-10 p-2 rounded-md bg-indigo-100/50">
        <TrendingUp size={18} className="text-indigo-500" />
      </div>
    ),
    title: "Monthly Revenue",
    subtitle: "$0",
    metaInfo: "Total earnings",
    tag: (
      <span className="px-3 py-2 rounded-full text-xs bg-indigo-100/50 text-indigo-500">
        This month
      </span>
    ),
  },
  {
    icon: (
      <div className="flex items-center justify-center w-10 h-10 p-2 rounded-md bg-orange-100/50">
        <Users size={18} className="text-orange-500" />
      </div>
    ),
    title: "Tables Occupied",
    subtitle: "0",
    metaInfo: "4 available",
    tag: (
      <span className="px-3 py-2 rounded-full text-xs bg-orange-100/50 text-orange-500">
        0/4
      </span>
    ),
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-4 p-4 md:p-6 lg:p-8">
      {/* Top button cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ButtonCards &&
          ButtonCards.map((buttonCard, idx) => (
            <ButtonCard
              key={idx}
              title={buttonCard.title}
              subtitle={buttonCard.subtitle}
              icon={buttonCard.icon}
              url={buttonCard.url}
            />
          ))}
      </div>

      {/* Finance Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {FinanceCards &&
          FinanceCards.map((financeCard, idx) => (
            <FinanceCard
              key={idx}
              title={financeCard.title}
              subtitle={financeCard.subtitle}
              tag={financeCard.tag}
              metaInfo={financeCard.metaInfo}
              icon={financeCard.icon}
            />
          ))}
      </div>

      {/* Top Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Monthly Sales Trend" subtitle="Revenue over the year">
          <PlaceholderChart />
        </Card>

        <Card title="Daily Sales (This Month)" subtitle="Day-by-day breakdown">
          <PlaceholderChart />
        </Card>
      </div>

      {/* Middle */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Menu Categories" subtitle="Items by category">
          <PiePlaceholder />
        </Card>

        <Card title="Payment Methods" subtitle="Revenue breakdown">
          <PaymentMethods />
        </Card>
      </div>

      {/* Orders */}
      <Card
        title="Recent Orders"
        subtitle="Latest completed transactions"
        action={
          <button className="text-sm text-white bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded-md cursor-pointer">
            View All →
          </button>
        }
      >
        <div className="text-center text-gray-500 py-10">
          No completed orders yet
        </div>
      </Card>
    </div>
  );
}

/* ================= Components ================= */

function Card({
  title,
  subtitle,
  children,
  action,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-slate-800">{title}</h3>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function ButtonCard({
  title,
  subtitle,
  icon,
  url,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  url: string;
}) {
  return (
    <a href={url} className="group">
      <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-center gap-3 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
        <div>{icon}</div>
        <div>
          <p className="text-xs text-slate-500 group-hover:text-slate-700">
            {title}
          </p>
          <h3 className="font-semibold text-slate-900">{subtitle}</h3>
        </div>
      </div>
    </a>
  );
}

function FinanceCard({
  icon,
  tag,
  title,
  subtitle,
  metaInfo,
}: {
  icon: React.ReactNode;
  tag: React.ReactNode;
  title: string;
  subtitle: string;
  metaInfo: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col justify-between gap-2 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        {icon}
        {tag}
      </div>
      <div className="flex flex-col items-start justify-between gap-2">
        <p className="text-xs text-slate-500">{title}</p>
        <h3 className="font-semibold text-slate-900 text-lg">{subtitle}</h3>
        <p className="text-xs text-slate-500">{metaInfo}</p>
      </div>
    </div>
  );
}

/* ================= UI Blocks ================= */

function PlaceholderChart() {
  return (
    <div className="h-40 flex items-center justify-center text-muted text-sm">
      Coming soon...
    </div>
  );
}

function PiePlaceholder() {
  return (
    <div className="h-48 flex items-center justify-center text-muted text-sm">
      Coming soon...
    </div>
  );
}

function PaymentMethods() {
  return (
    <div className="space-y-4">
      <Progress label="Cash Payments" value="$0.00" color="text-green-600" />
      <Progress label="Online Payments" value="$0.00" color="text-blue-600" />

      <div className="border-t pt-3 flex justify-between text-sm">
        <span className="text-gray-600">Total Revenue</span>
        <span className="text-orange-500 font-medium">$0.00</span>
      </div>
    </div>
  );
}

function Progress({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-600">{label}</span>
        <span className={color}>{value}</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full" />
    </div>
  );
}
