'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useOrders, usePrefetchOrders } from '@/hooks/userOrder';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  RefreshCw,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export interface OrderedProduct {
  _id: string;
  quantity: number;
  productName: string;
  imageUrl: string;
  productSKU: string;
  PurchasePrice: string;
  sellPrice: string;
  tax: string;
  shipping: string;
}

export interface Order {
  _id: string;
  storeId: string;
  shipNodeType: 'SellerFulfilled' | 'Other';
  customerOrderId: string;
  status: 'Acknowledged' | 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  orderDate: string;
  customerName: string;
  customerAddress: string;
  products: OrderedProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApiResponse {
  success: boolean;
  orders: Order[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export function OrdersTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const { data, isLoading, error, refetch, isFetching } = useOrders({
    page,
    limit,
    search,
    status,
  });

  const { prefetchNextPage } = usePrefetchOrders();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleLimitChange = (value: string) => {
    const newLimit = Number(value);
    setLimit(newLimit);
    setPage(1); // Reset to page 1 when changing limit
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Prefetch next page for better UX
    if (data && newPage < data.pages) {
      prefetchNextPage(newPage, limit, search, status);
    }
  };

  const goToFirstPage = () => handlePageChange(1);
  const goToLastPage = () => data && handlePageChange(data.pages);
  const goToPreviousPage = () => handlePageChange(Math.max(1, page - 1));
  const goToNextPage = () =>
    data && handlePageChange(Math.min(data.pages, page + 1));

  if (error) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border bg-card shadow-sm p-8 text-center">
          <p className="text-destructive mb-4">Error: {error.message}</p>
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                {[
                  'Order Info',
                  'Status',
                  'Customer',
                  'Shipping',
                  'Products',
                  'Total',
                ].map((h, i) => (
                  <TableHead
                    key={i}
                    className="font-semibold text-foreground/80 bg-muted/30 py-4"
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i} className="border-b border-border/50">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-16 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* Loading pagination skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    );
  }

  if (!data || !data.success) {
    return (
      <div className="rounded-lg border bg-card shadow-sm p-8 text-center">
        <p className="text-muted-foreground">
          Failed to load orders. Please try again.
        </p>
        <Button onClick={() => refetch()} variant="outline" className="mt-4">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  if (data.orders.length === 0) {
    return (
      <div className="rounded-lg border bg-card shadow-sm p-8 text-center">
        <p className="text-muted-foreground">No orders found.</p>
      </div>
    );
  }

  const startIndex = (data.page - 1) * data.limit + 1;
  const endIndex = Math.min(data.page * data.limit, data.total);

  return (
    <div className="space-y-4">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold">Orders</h2>
          {isFetching && (
            <div className="flex items-center text-sm text-muted-foreground">
              <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
              Updating...
            </div>
          )}
        </div>
        <Button
          onClick={() => refetch()}
          variant="outline"
          size="sm"
          disabled={isFetching}
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isFetching ? 'animate-spin' : ''}`}
          />
          Refresh
        </Button>
      </div>

      <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
        <Table className="text-sm w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px] font-semibold text-foreground/80 bg-muted/30 py-4">
                Order Info
              </TableHead>
              <TableHead className="min-w-[120px] font-semibold text-foreground/80 bg-muted/30 py-4">
                Status
              </TableHead>
              <TableHead className="min-w-[160px] font-semibold text-foreground/80 bg-muted/30 py-4">
                Customer
              </TableHead>
              <TableHead className="min-w-[140px] font-semibold text-foreground/80 bg-muted/30 py-4">
                Shipping
              </TableHead>
              <TableHead className="min-w-[280px] font-semibold text-foreground/80 bg-muted/30 py-4">
                Products
              </TableHead>
              <TableHead className="text-right min-w-[120px] font-semibold text-foreground/80 bg-muted/30 py-4">
                Total
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.orders.map((order: Order) => (
              <TableRow
                key={order._id}
                className="hover:bg-muted/30 transition-colors border-b border-border/30 group"
              >
                {/* Order Info */}
                <TableCell>
                  <div className="flex flex-col gap-2 py-2">
                    <Badge
                      variant="secondary"
                      className="w-fit text-xs font-medium px-2 py-1 bg-blue-50 text-blue-700 border-blue-200"
                    >
                      Store: {order.storeId}
                    </Badge>
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {order.customerOrderId}
                    </span>
                    <p className="text-xs text-muted-foreground/70 font-medium">
                      {formatDate(order.orderDate)}
                    </p>
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Badge
                    className={
                      order.status === 'Delivered'
                        ? 'capitalize text-xs px-3 py-1 bg-green-100 text-green-800 border-green-200 font-medium'
                        : order.status === 'Shipped'
                        ? 'capitalize text-xs px-3 py-1 bg-blue-100 text-blue-800 border-blue-200 font-medium'
                        : order.status === 'Acknowledged'
                        ? 'capitalize text-xs px-3 py-1 bg-orange-50 text-orange-700 border-orange-200 font-medium'
                        : order.status === 'Pending'
                        ? 'capitalize text-xs px-3 py-1 bg-yellow-50 text-yellow-700 border-yellow-200 font-medium'
                        : 'capitalize text-xs px-3 py-1 bg-red-100 text-red-800 border-red-200 font-medium'
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>

                {/* Customer */}
                <TableCell>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <span className="cursor-pointer font-medium hover:underline hover:text-primary transition-colors text-foreground">
                        {order.customerName}
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-72 p-4 bg-card border shadow-lg">
                      <p className="text-sm font-semibold mb-2 text-foreground">
                        Customer Details
                      </p>
                      <p className="text-sm text-muted-foreground mb-1">
                        Name: {order.customerName}
                      </p>
                      <p className="text-sm text-muted-foreground mb-1 whitespace-pre-line mt-1">
                        Address: {order.customerAddress}
                      </p>
                    </HoverCardContent>
                  </HoverCard>
                </TableCell>

                {/* Shipping */}
                <TableCell>
                  <div className="flex flex-col gap-2 py-2">
                    <Badge
                      variant="outline"
                      className="w-fit text-xs font-medium px-2 py-1 bg-purple-50 text-purple-700 border-purple-200"
                    >
                      {order.shipNodeType}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-medium">
                      Shipping: ${order.products?.[0]?.shipping || '0.00'}
                    </span>
                  </div>
                </TableCell>

                {/* Products */}
                <TableCell className="space-y-4 min-w-[300px] py-3">
                  {order.products?.map((product) => (
                    <div
                      key={product._id}
                      className="flex gap-3 p-2 rounded-md hover:bg-muted/20 transition-colors"
                    >
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden border-2 border-border/20 shadow-sm flex-shrink-0">
                        <Image
                          src={
                            product.imageUrl ||
                            '/placeholder.svg?height=64&width=64'
                          }
                          alt={product.productName}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1 space-y-1 min-w-0">
                        <p className="font-medium line-clamp-2 text-foreground group-hover:text-primary transition-colors text-sm">
                          {product.productName}
                        </p>
                        <p className="text-xs text-muted-foreground/80 font-mono bg-muted/30 px-2 py-1 rounded w-fit">
                          SKU: {product.productSKU}
                        </p>
                        <div className="flex gap-3 flex-wrap text-xs">
                          <span className=" font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            Qty: {product.quantity}
                          </span>
                          <span className="font-medium bg-green-50 text-green-700 px-2 py-1 rounded">
                            Price: ${product.sellPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </TableCell>

                {/* Total */}
                <TableCell className="text-right">
                  <div className="flex flex-col gap-2 items-end py-2">
                    <span className="font-bold text-lg text-foreground">
                      $
                      {order.products
                        .reduce(
                          (total, product) =>
                            total +
                            (Number(product.sellPrice) || 0) +
                            (Number(product.tax) || 0),
                          0
                        )
                        .toFixed(2)}
                    </span>
                    <span className="text-xs text-muted-foreground/70 bg-muted/30 px-2 py-1 rounded">
                      Incl. tax $
                      {order.products
                        .reduce(
                          (total, product) =>
                            total + (Number(product.tax) || 0),
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select value={limit.toString()} onValueChange={handleLimitChange}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {data.page} of {data.pages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={goToFirstPage}
              disabled={data.page === 1 || isFetching}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={goToPreviousPage}
              disabled={data.page === 1 || isFetching}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={goToNextPage}
              disabled={data.page === data.pages || isFetching}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={goToLastPage}
              disabled={data.page === data.pages || isFetching}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">
            {data.total === 0
              ? 'No orders'
              : `${startIndex}-${endIndex} of ${data.total}`}
          </p>
        </div>
      </div>
    </div>
  );
}
