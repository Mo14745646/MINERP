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
  History,
  AlertTriangle,
  Warehouse,
  TrendingUp,
  ArrowUpRight
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const inventory = [
  { id: 1, name: "Laptop Pro 14", sku: "LP14-001", stock: 15, min: 20, max: 100, status: "low" },
  { id: 2, name: "Smartphone X", sku: "SX-99", stock: 5, min: 10, max: 60, status: "low" },
  { id: 3, name: "Wireless Buds", sku: "WB-02", stock: 120, min: 50, max: 200, status: "healthy" },
  { id: 4, name: "USB-C Cable 1m", sku: "ACC-01", stock: 0, min: 30, max: 150, status: "out" },
];

function StockBar({ stock, max, status }: { stock: number; max: number; status: string }) {
  const pct = Math.min((stock / max) * 100, 100);
  const color =
    status === "healthy" ? "bg-emerald-500" :
    status === "low" ? "bg-amber-500" :
    "bg-rose-500";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-24 rounded-full bg-slate-700/60">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-slate-500 tabular-nums">{stock}</span>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  if (status === "healthy")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Healthy
      </span>
    );
  if (status === "low")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400 ring-1 ring-inset ring-amber-500/20">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />Low
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-2.5 py-0.5 text-xs font-medium text-rose-400 ring-1 ring-inset ring-rose-500/20">
      <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />Out of Stock
    </span>
  );
}

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Warehouse className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">Warehouse</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Inventory</h1>
          <p className="mt-1 text-slate-400">Monitor stock levels and track warehouse transactions.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 border-slate-700/60 bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white">
            <History className="h-4 w-4" />
            Stock History
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 border-0 text-white shadow-lg shadow-violet-500/20 transition-all">
            <Plus className="h-4 w-4" />
            Stock Adjustment
          </Button>
        </div>
      </div>

      {/* Alert Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-rose-500/20 bg-rose-500/8 shadow-lg shadow-rose-500/10">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-rose-300">Out of Stock</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/20">
                <AlertTriangle className="h-4 w-4 text-rose-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">12</div>
            <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Requires immediate restock
            </p>
          </CardContent>
        </Card>

        <Card className="border-amber-500/20 bg-amber-500/8 shadow-lg shadow-amber-500/10">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-amber-300">Low Stock Alerts</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">45</div>
            <p className="mt-1 text-xs text-amber-400 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Approaching reorder point
            </p>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/20 bg-emerald-500/8 shadow-lg shadow-emerald-500/10">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-emerald-300">Total Items</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">1,240</div>
            <p className="mt-1 text-xs text-emerald-400 flex items-center gap-1">
              <Warehouse className="h-3 w-3" />
              Across 4 warehouses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs + Table */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-slate-900/60 border border-slate-800/60 mb-4 p-1 rounded-xl">
          <TabsTrigger value="all" className="rounded-lg text-slate-400 data-[state=active]:bg-slate-700 data-[state=active]:text-white">
            All Items
          </TabsTrigger>
          <TabsTrigger value="low" className="rounded-lg text-slate-400 data-[state=active]:bg-slate-700 data-[state=active]:text-white">
            Low Stock
          </TabsTrigger>
          <TabsTrigger value="out" className="rounded-lg text-slate-400 data-[state=active]:bg-slate-700 data-[state=active]:text-white">
            Out of Stock
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="m-0">
          <Card className="border-slate-800/60 bg-slate-900/60 backdrop-blur-sm shadow-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-800/60 hover:bg-transparent">
                  <TableHead className="text-slate-500 font-medium">Product</TableHead>
                  <TableHead className="text-slate-500 font-medium">SKU</TableHead>
                  <TableHead className="text-slate-500 font-medium">Stock Level</TableHead>
                  <TableHead className="text-right text-slate-500 font-medium">Min</TableHead>
                  <TableHead className="text-right text-slate-500 font-medium">Status</TableHead>
                  <TableHead className="w-[100px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventory.map((item) => (
                  <TableRow
                    key={item.id}
                    className="group border-slate-800/40 transition-colors hover:bg-slate-800/30"
                  >
                    <TableCell className="font-medium text-slate-200">{item.name}</TableCell>
                    <TableCell className="font-mono text-xs text-slate-500">{item.sku}</TableCell>
                    <TableCell>
                      <StockBar stock={item.stock} max={item.max} status={item.status} />
                    </TableCell>
                    <TableCell className="text-right text-slate-500">{item.min}</TableCell>
                    <TableCell className="text-right">
                      <StatusPill status={item.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs gap-1 text-slate-400 hover:text-white hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        Adjust
                        <ArrowUpRight className="h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
        <TabsContent value="low" className="m-0">
          <Card className="border-slate-800/60 bg-slate-900/60 p-8 text-center text-slate-500">
            Filter by low stock items
          </Card>
        </TabsContent>
        <TabsContent value="out" className="m-0">
          <Card className="border-slate-800/60 bg-slate-900/60 p-8 text-center text-slate-500">
            Filter by out-of-stock items
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
