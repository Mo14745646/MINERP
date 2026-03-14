"use client";

import { useState, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MoreHorizontal, 
  Plus, 
  Search, 
  Package2,
  SlidersHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  stockQuantity: number;
  categoryName: string;
}

function StockBadge({ qty }: { qty: number }) {
  if (qty > 10)
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        In Stock
      </span>
    );
  if (qty > 0)
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400 ring-1 ring-inset ring-amber-500/20">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
        Low Stock
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-2.5 py-0.5 text-xs font-medium text-rose-400 ring-1 ring-inset ring-rose-500/20">
      <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
      Out of Stock
    </span>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/products?pageSize=50");
      setProducts(response.data.data.items);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Package2 className="h-4 w-4 text-blue-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Catalog</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Products</h1>
          <p className="mt-1 text-slate-400">Manage your product catalog and inventory levels.</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 border-0 text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-all">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Search + Filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            placeholder="Search products or SKU..."
            className="pl-10 bg-slate-900/60 border-slate-700/60 text-slate-200 placeholder:text-slate-500 focus:border-violet-500/50 focus:ring-violet-500/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2 border-slate-700/60 bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Table */}
      <Card className="border-slate-800/60 bg-slate-900/60 backdrop-blur-sm shadow-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-800/60 hover:bg-transparent">
              <TableHead className="text-slate-500 font-medium">SKU</TableHead>
              <TableHead className="text-slate-500 font-medium">Name</TableHead>
              <TableHead className="text-slate-500 font-medium">Category</TableHead>
              <TableHead className="text-right text-slate-500 font-medium">Price</TableHead>
              <TableHead className="text-right text-slate-500 font-medium">Stock</TableHead>
              <TableHead className="text-right text-slate-500 font-medium">Status</TableHead>
              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="border-slate-800/40">
                  <TableCell><Skeleton className="h-4 w-16 bg-slate-700/50" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-40 bg-slate-700/50" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24 bg-slate-700/50" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-4 w-12 ml-auto bg-slate-700/50" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-4 w-8 ml-auto bg-slate-700/50" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-5 w-20 ml-auto rounded-full bg-slate-700/50" /></TableCell>
                  <TableCell />
                </TableRow>
              ))
            ) : filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-slate-500">
                  <div className="flex flex-col items-center gap-2">
                    <Package2 className="h-8 w-8 text-slate-700" />
                    <p>No products found.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow
                  key={product.id}
                  className="group border-slate-800/40 transition-colors hover:bg-slate-800/30"
                >
                  <TableCell className="font-mono text-xs text-slate-500">{product.sku}</TableCell>
                  <TableCell className="font-medium text-slate-200">{product.name}</TableCell>
                  <TableCell>
                    <Badge className="bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 font-normal">
                      {product.categoryName}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-slate-200">
                    ${product.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right text-slate-300">
                    {product.stockQuantity}
                  </TableCell>
                  <TableCell className="text-right">
                    <StockBadge qty={product.stockQuantity} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-white hover:bg-slate-700"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700">
                        <DropdownMenuLabel className="text-slate-400">Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          className="text-slate-300 focus:bg-slate-800 focus:text-white"
                          onClick={() => navigator.clipboard.writeText(product.sku)}
                        >
                          Copy SKU
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-slate-700" />
                        <DropdownMenuItem className="text-slate-300 focus:bg-slate-800 focus:text-white">View details</DropdownMenuItem>
                        <DropdownMenuItem className="text-slate-300 focus:bg-slate-800 focus:text-white">Edit product</DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-400 focus:bg-rose-500/10 focus:text-rose-400">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
