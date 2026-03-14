"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  Package, 
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles
} from "lucide-react";
import { 
  Area,
  AreaChart,
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  CartesianGrid
} from "recharts";

const data = [
  { name: "Jan", total: 4500, prev: 3200 },
  { name: "Feb", total: 5200, prev: 4100 },
  { name: "Mar", total: 4800, prev: 4400 },
  { name: "Apr", total: 6100, prev: 4900 },
  { name: "May", total: 5900, prev: 5200 },
  { name: "Jun", total: 7200, prev: 5800 },
];

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231",
    description: "+20.1% from last month",
    icon: TrendingUp,
    trend: "up",
    gradient: "from-violet-600 to-purple-600",
    glow: "shadow-violet-500/20",
    bg: "bg-violet-500/10",
    text: "text-violet-400",
  },
  {
    title: "Active Users",
    value: "2,350",
    description: "+180.1% from last month",
    icon: Users,
    trend: "up",
    gradient: "from-blue-600 to-cyan-600",
    glow: "shadow-blue-500/20",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
  },
  {
    title: "Products in Stock",
    value: "12,234",
    description: "+19% from last month",
    icon: Package,
    trend: "up",
    gradient: "from-emerald-600 to-teal-600",
    glow: "shadow-emerald-500/20",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
  },
  {
    title: "Pending Orders",
    value: "573",
    description: "-12% from last month",
    icon: ShoppingCart,
    trend: "down",
    gradient: "from-amber-600 to-orange-600",
    glow: "shadow-amber-500/20",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
  },
];

const activity = [
  { name: "John Doe", action: "placed a new order", time: "2 min ago", amount: "+$250.00", positive: true, avatar: "JD", color: "bg-violet-500" },
  { name: "Inventory", action: "restocked Laptop Pro", time: "15 min ago", amount: "+10 units", positive: true, avatar: "IV", color: "bg-blue-500" },
  { name: "Alice Smith", action: "returned a product", time: "1 hour ago", amount: "-$120.00", positive: false, avatar: "AS", color: "bg-pink-500" },
  { name: "System", action: "backup completed", time: "2 hours ago", amount: "", positive: true, avatar: "SY", color: "bg-emerald-500" },
];

const CustomTooltip = ({ active, payload, label }: {active?: boolean; payload?: {value: number}[]; label?: string}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-3 shadow-xl">
        <p className="mb-1 text-xs text-slate-400">{label}</p>
        <p className="text-sm font-bold text-white">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-4 w-4 text-violet-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">Overview</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
          <p className="mt-1 text-slate-400">
            Welcome back! Here&apos;s what&apos;s happening in your ERP today.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/40 px-3 py-2 text-xs text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live data
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card
            key={stat.title}
            className="border-slate-800/60 bg-slate-900/60 backdrop-blur-sm shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">{stat.title}</CardTitle>
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg ${stat.glow}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="mt-1 flex items-center text-xs">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-400" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3 text-rose-400" />
                )}
                <span className={stat.trend === "up" ? "text-emerald-400" : "text-rose-400"}>
                  {stat.description.split(" ")[0]}
                </span>
                <span className="ml-1 text-slate-500">
                  {stat.description.split(" ").slice(1).join(" ")}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts & Activity */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="col-span-4 border-slate-800/60 bg-slate-900/60 backdrop-blur-sm shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold text-white">Revenue Analytics</CardTitle>
              <p className="mt-0.5 text-xs text-slate-500">Jan – Jun 2024</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-violet-500" />Current</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-slate-600" />Previous</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPrev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#475569" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#475569" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="#475569"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#64748b" }}
                  />
                  <YAxis
                    stroke="#475569"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `$${v / 1000}k`}
                    tick={{ fill: "#64748b" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="prev"
                    stroke="#475569"
                    strokeWidth={1.5}
                    fill="url(#colorPrev)"
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#7c3aed"
                    strokeWidth={2.5}
                    fill="url(#colorTotal)"
                    dot={false}
                    activeDot={{ r: 5, fill: "#7c3aed", strokeWidth: 2, stroke: "#1e1b4b" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-3 border-slate-800/60 bg-slate-900/60 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-white">Recent Activity</CardTitle>
            <p className="text-xs text-slate-500">Latest system events</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activity.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${item.color} text-xs font-bold text-white shadow-md`}>
                    {item.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-200 leading-tight">
                      <span className="font-semibold">{item.name}</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.action}</p>
                  </div>
                  <div className="text-right shrink-0">
                    {item.amount && (
                      <p className={`text-xs font-semibold ${item.positive ? "text-emerald-400" : "text-rose-400"}`}>
                        {item.amount}
                      </p>
                    )}
                    <p className="text-[10px] text-slate-600 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
