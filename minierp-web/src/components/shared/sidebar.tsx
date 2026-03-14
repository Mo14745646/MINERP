"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  Warehouse,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { ThemeToggle } from "@/components/theme-toggle";

const items = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", color: "text-violet-400" },
  { label: "Products", icon: Package, href: "/products", color: "text-blue-400" },
  { label: "Inventory", icon: Warehouse, href: "/inventory", color: "text-amber-400" },
  { label: "Orders", icon: ShoppingCart, href: "/orders", color: "text-emerald-400" },
  { label: "Customers", icon: Users, href: "/customers", color: "text-pink-400" },
  { label: "Settings", icon: Settings, href: "/settings", color: "text-slate-400" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  const initials = `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`;
  const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

  return (
    <div className="flex h-screen w-64 flex-col bg-slate-950 border-r border-slate-800/60 relative overflow-hidden shrink-0">
      {/* Decorative glow blobs */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-blue-600/8 blur-3xl" />

      {/* Logo */}
      <div className="relative flex h-16 items-center justify-between border-b border-slate-800/60 px-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg shadow-violet-500/25">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-violet-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
            MiniERP
          </span>
        </div>
        <ThemeToggle />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 px-3 py-4">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          Main Menu
        </p>
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-white/8 text-white shadow-sm"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              )}
            >
              {/* Active left bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-violet-400" />
              )}
              <item.icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors",
                  isActive ? item.color : "text-slate-500 group-hover:text-slate-300"
                )}
              />
              <span>{item.label}</span>
              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-slate-800/60 p-3 space-y-1">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 bg-white/4">
          <div className="relative shrink-0">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-md shadow-violet-500/30">
              {initials || "U"}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-emerald-400" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-xs font-semibold text-slate-200">{fullName || "User"}</span>
            <span className="truncate text-[10px] text-slate-500 uppercase tracking-wide">
              {user?.roles?.[0] ?? "Member"}
            </span>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-500 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
