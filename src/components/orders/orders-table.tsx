'use client';

import { Badge } from '@/components/ui/badge';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
export interface OrderedProduct {
  quantity: number;
  productName: string;
  imageUrl: string;
  productSKU: string;
  PurchasePrice: string; // can be number if parsed: number;
  sellPrice: string;
  tax: string;
  shipping: string;
}

export interface Order {
  storeId: string;
  shipNodeType: 'SellerFulfilled' | 'Other'; // expand as needed
  customerOrderId: string;
  status: 'Acknowledged' | 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled'; // expand as needed
  orderDate: string; // ISO Date string (e.g., from new Date().toISOString())
  customerName: string;
  customerAddress: string;
  products: OrderedProduct[];
} // Ensure Order interface exists somewhere

interface OrdersTableProps {
  orders: Order[];
  isLoading: boolean;
}

export function OrdersTable({ orders, isLoading }: OrdersTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-xl border bg-white shadow overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {[
                'Order',
                'Customer',
                'Status',
                'Ship From',
                'Order Date',
                'Products',
              ].map((h, i) => (
                <TableHead key={i}>{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 6 }).map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white shadow overflow-x-auto">
      <Table className="text-sm">
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[180px]">Order Info</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Shipping</TableHead>
            <TableHead>Products</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, idx) => (
            <TableRow key={idx} className="hover:bg-muted/50">
              {/* Order Info */}
              <TableCell>
                <div className="flex flex-col gap-1.5">
                  <Badge variant="outline" className="w-fit text-xs">
                    Store: {order.storeId || 'N/A'}
                  </Badge>
                  <span className="font-semibold">
                    {order.customerOrderId || 'Unknown Order'}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    {/* {FormateDate(order.orderDate)} */}
                    {order.orderDate}
                  </p>
                </div>
              </TableCell>

              {/* Status */}
              <TableCell>
                <Badge
                  variant={
                    order.status === 'Delivered'
                      ? 'default'
                      : order.status === 'Shipped'
                      ? 'secondary'
                      : order.status === 'Acknowledged'
                      ? 'outline'
                      : 'destructive'
                  }
                  className="capitalize text-xs px-2"
                >
                  {order.status}
                </Badge>
              </TableCell>

              {/* Customer */}
              <TableCell>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <span className="cursor-pointer font-medium hover:underline">
                      {order.customerName || 'Unknown Customer'}
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-64 p-4">
                    <p className="text-sm font-semibold mb-1">
                      Customer Details
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Name: {order.customerName}
                    </p>
                    <p className="text-xs text-muted-foreground whitespace-pre-line mt-1">
                      Address: {order.customerAddress}
                    </p>
                  </HoverCardContent>
                </HoverCard>
              </TableCell>

              {/* Shipping */}
              <TableCell>
                <div className="flex flex-col gap-1">
                  <Badge variant="secondary" className="w-fit text-xs">
                    {order.shipNodeType}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Shipping: ${order.products?.[0]?.shipping || '0.00'}
                  </span>
                </div>
              </TableCell>

              {/* Products */}
              <TableCell className="space-y-3 min-w-[250px]">
                {order.products?.map((product: any, index: number) => (
                  <div key={index} className="flex gap-3">
                    <div className="relative h-14 w-14 rounded-md overflow-hidden border">
                      <Image
                        src={product.imageUrl}
                        alt={product.productName}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <p className="font-medium line-clamp-2">
                        {product.productName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        SKU: {product.productSKU}
                      </p>
                      <div className="flex gap-2 flex-wrap text-xs text-muted-foreground">
                        <span>Qty: {product.quantity}</span>
                        <span>Price: ${product.PurchasePrice}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </TableCell>

              {/* Total */}
              <TableCell className="text-right">
                <div className="flex flex-col gap-1 items-end">
                  <span className="font-semibold">
                    $
                    {(
                      (Number(order.products?.[0]?.sellPrice) || 0) +
                      (Number(order.products?.[0]?.tax) || 0)
                    ).toFixed(2)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Incl. tax ${order.products?.[0]?.tax || '0.00'}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
