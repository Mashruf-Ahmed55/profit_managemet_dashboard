export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
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

export interface Product {
  quantity: number;
  productName: string;
  imageUrl: string;
  productSKU: string;
  PurchasePrice: string;
  sellPrice: string;
  tax: string;
  shipping: string;
}

export interface Customer {
  name: string;
  address: string;
}

export interface Order {
  id: string;
  storeId: string;
  shipNodeType: string;
  customerOrderId: string;
  status:
    | 'pending'
    | 'processing'
    | 'completed'
    | 'cancelled'
    | 'Shipped'
    | 'Delivered';
  orderDate: string;
  customer: Customer;
  products: Product[];
  total: number;
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
