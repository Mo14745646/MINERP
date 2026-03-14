export const MOCK_USER = {
  id: "user-1",
  name: "Demo Admin",
  email: "admin@demo.com",
  role: "Admin",
};

export const MOCK_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_payload.dummy_signature";

export const MOCK_STATS = {
  revenue: "$45,231",
  revenueTrend: "+20.1%",
  users: "2,350",
  usersTrend: "+180.1%",
  products: "12,234",
  productsTrend: "+19%",
  orders: "573",
  ordersTrend: "-12%",
};

export const MOCK_PRODUCTS = [
  { id: 1, name: "Laptop Pro 14", sku: "LP14-001", price: 1200.00, stockQuantity: 15, categoryName: "Electronics" },
  { id: 2, name: "Smartphone X", sku: "SX-99", price: 899.99, stockQuantity: 5, categoryName: "Electronics" },
  { id: 3, name: "Wireless Buds", sku: "WB-02", price: 149.00, stockQuantity: 120, categoryName: "Accessories" },
  { id: 4, name: "USB-C Cable 1m", sku: "ACC-01", price: 19.99, stockQuantity: 0, categoryName: "Accessories" },
  { id: 5, name: "Mechanical Keyboard", sku: "KB-01", price: 129.50, stockQuantity: 45, categoryName: "Peripherals" },
];

export const MOCK_ORDERS = [
  { id: "ORD-7231", customer: "John Doe", date: "2024-03-12", total: 1250.00, status: "completed" },
  { id: "ORD-7232", customer: "Alice Smith", date: "2024-03-11", total: 450.50, status: "pending" },
  { id: "ORD-7233", customer: "Bob Wilson", date: "2024-03-11", total: 890.00, status: "completed" },
  { id: "ORD-7234", customer: "Charlie Brown", date: "2024-03-10", total: 120.00, status: "cancelled" },
];

export const MOCK_INVENTORY = [
  { id: 1, name: "Laptop Pro 14", sku: "LP14-001", stock: 15, min: 20, max: 100, status: "low" },
  { id: 2, name: "Smartphone X", sku: "SX-99", stock: 5, min: 10, max: 60, status: "low" },
  { id: 3, name: "Wireless Buds", sku: "WB-02", stock: 120, min: 50, max: 200, status: "healthy" },
  { id: 4, name: "USB-C Cable 1m", sku: "ACC-01", stock: 0, min: 30, max: 150, status: "out" },
];
