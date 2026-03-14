"use client";

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Eye, 
  Download,
  Calendar,
  SlidersHorizontal,
  ShoppingCart,
  CheckCircle2,
  Clock,
  XCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";

const orders = [
  { id: "ORD-7231", customer: "John Doe", date: "2024-03-12", total: 1250.00, status: "completed" },
  { id: "ORD-7232", customer: "Alice Smith", date: "2024-03-11", total: 450.50, status: "pending" },
  { id: "ORD-7233", customer: "Bob Wilson", date: "2024-03-11", total: 890.00, status: "completed" },
  { id: "ORD-7234", customer: "Charlie Brown", date: "2024-03-10", total: 120.00, status: "cancelled" },
];

const statusConfig: Record<string, { label: string; icon: React.ElementType; classes: string }> = {
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    classes: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    classes: "bg-amber-500/10 text-amber-400 ring-amber-500/20",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    classes: "bg-rose-500/10 text-rose-400 ring-rose-500/20",
  },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status] ?? statusConfig.pending;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${cfg.classes}`}>
      <Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  );
}

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShoppingCart className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">Sales</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Orders</h1>
          <p className="mt-1 text-slate-400">Manage sales orders and track fulfillment status.</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2 border-slate-700/60 bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 border-0 text-white shadow-lg shadow-violet-500/20 transition-all">
            <Plus className="h-4 w-4" />
            Create Order
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <Button variant="outline" className="gap-2 border-slate-700/60 bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white text-sm">
          <Calendar className="h-4 w-4" />
          Last 30 Days
        </Button>
        <Button variant="outline" className="gap-2 border-slate-700/60 bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white text-sm">
          <SlidersHorizontal className="h-4 w-4" />
          Status: All
        </Button>
      </div>

      {/* Table */}
      <Card className="border-slate-800/60 bg-slate-900/60 backdrop-blur-sm shadow-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-800/60 hover:bg-transparent">
              <TableHead className="text-slate-500 font-medium">Order ID</TableHead>
              <TableHead className="text-slate-500 font-medium">Customer</TableHead>
              <TableHead className="text-slate-500 font-medium">Date</TableHead>
              <TableHead className="text-right text-slate-500 font-medium">Total</TableHead>
              <TableHead className="text-right text-slate-500 font-medium">Status</TableHead>
              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                className="group border-slate-800/40 transition-colors hover:bg-slate-800/30"
              >
                <TableCell className="font-mono text-sm font-semibold text-violet-400">
                  {order.id}
                </TableCell>
                <TableCell className="font-medium text-slate-200">{order.customer}</TableCell>
                <TableCell className="text-sm text-slate-500">{order.date}</TableCell>
                <TableCell className="text-right font-bold text-slate-200">
                  ${order.total.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <StatusBadge status={order.status} />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-white hover:bg-slate-700"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
