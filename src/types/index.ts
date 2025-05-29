export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: string;
  orderCount?: number; // Add this line
  totalSpent?: number; // Add this line
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
  sku: string;
  createdAt: string;
}

export interface Order {
  id: string;
  customer: Customer;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  items: number;
  createdAt: string;
  updatedAt?: string;
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface DashboardStats {
  totalRevenue: number;
  revenueChange: number;
  totalOrders: number;
  ordersChange: number;
  totalCustomers: number;
  customersChange: number;
  totalProducts: number;
  productsChange: number;
}
