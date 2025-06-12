'use client';

import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import FormateDate from '@/lib/formateDate';
import Image from 'next/image';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';

interface OrdersTableProps {
  // orders: Order[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
}

const demoOrders = [
  {
    id: 'ord_1001',
    storeId: '10002764712',
    shipNodeType: 'WFSFulfilled',
    customerOrderId: '200013420367299',
    status: 'Delivered',
    orderDate: '2025-06-01T23:15:36.802+00:00',
    total: 34.29,
    createdAt: '2025-05-31T10:00:00.000Z',
    customer: {
      name: 'Matthew Beecher',
      address: '4341 Felton Pl\nMadison, WI 53705\nUSA',
    },
    products: [
      {
        quantity: 1,
        productName:
          'XSHOT Skins Pro Series Longshot Blaster with Shoulder Stock',
        imageUrl:
          'https://i5.walmartimages.com/asr/4df970ec-1a2a-4e3f-8bbe-e2add4e4c202',
        productSKU: '193052050052',
        PurchasePrice: '25.00',
        sellPrice: '32.50',
        tax: '1.79',
        shipping: '0.00',
      },
    ],
  },
  {
    id: 'ord_1002',
    storeId: '10002764713',
    shipNodeType: 'StoreFulfilled',
    customerOrderId: '200013420367300',
    status: 'Shipped',
    orderDate: '2025-06-02T14:22:10.123+00:00',
    total: 58.97,
    createdAt: '2025-06-01T09:30:00.000Z',
    customer: {
      name: 'Sarah Johnson',
      address: '1284 Maple Ave\nChicago, IL 60607\nUSA',
    },
    products: [
      {
        quantity: 2,
        productName: 'Wireless Bluetooth Earbuds',
        imageUrl: 'https://example.com/earbuds.jpg',
        productSKU: '885712349056',
        PurchasePrice: '45.00',
        sellPrice: '49.99',
        tax: '3.50',
        shipping: '5.48',
      },
    ],
  },
  {
    id: 'ord_1003',
    storeId: '10002764714',
    shipNodeType: 'ThirdPartyFulfilled',
    customerOrderId: '200013420367301',
    status: 'processing',
    orderDate: '2025-06-03T09:45:22.456+00:00',
    total: 112.75,
    createdAt: '2025-06-02T15:45:00.000Z',
    customer: {
      name: 'David Kim',
      address: '550 Oak St\nSan Francisco, CA 94102\nUSA',
    },
    products: [
      {
        quantity: 1,
        productName: 'Smart Watch Pro',
        imageUrl: 'https://example.com/smartwatch.jpg',
        productSKU: '773451982345',
        PurchasePrice: '89.99',
        sellPrice: '99.99',
        tax: '7.00',
        shipping: '5.76',
      },
      {
        quantity: 3,
        productName: 'Screen Protector Pack',
        imageUrl: 'https://example.com/screenprotector.jpg',
        productSKU: '442356781234',
        PurchasePrice: '5.00',
        sellPrice: '7.99',
        tax: '1.68',
        shipping: '0.00',
      },
    ],
  },
  {
    id: 'ord_1004',
    storeId: '10002764715',
    shipNodeType: 'WFSFulfilled',
    customerOrderId: '200013420367302',
    status: 'pending',
    orderDate: '2025-06-04T11:30:45.789+00:00',
    total: 24.99,
    createdAt: '2025-06-03T12:15:00.000Z',
    updatedAt: '2025-06-03T14:20:00.000Z',
    customer: {
      name: 'Emily Wilson',
      address: '789 Pine Rd\nBoston, MA 02108\nUSA',
    },
    products: [
      {
        quantity: 1,
        productName: 'USB-C Charging Cable',
        imageUrl: 'https://example.com/usbcable.jpg',
        productSKU: '556678912345',
        PurchasePrice: '12.50',
        sellPrice: '19.99',
        tax: '1.20',
        shipping: '3.80',
      },
    ],
  },
  {
    id: 'ord_1005',
    storeId: '10002764716',
    shipNodeType: 'StoreFulfilled',
    customerOrderId: '200013420367303',
    status: 'cancelled',
    orderDate: '2025-06-01T08:15:33.159+00:00',
    total: 75.5,
    createdAt: '2025-05-31T18:30:00.000Z',
    updatedAt: '2025-06-01T09:45:00.000Z',
    customer: {
      name: 'Robert Chen',
      address: '321 Elm Blvd\nAustin, TX 78701\nUSA',
    },
    products: [
      {
        quantity: 1,
        productName: 'Wireless Keyboard',
        imageUrl: 'https://example.com/keyboard.jpg',
        productSKU: '667789123456',
        PurchasePrice: '45.00',
        sellPrice: '59.99',
        tax: '3.60',
        shipping: '11.91',
      },
    ],
  },
];

export function OrdersTable({
  // orders,
  isLoading,
  isFetchingNextPage,
}: OrdersTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-xl border bg-white shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ship From</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Products</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-16 w-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px] text-muted-foreground">
              Order Info
            </TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground">Customer</TableHead>
            <TableHead className="text-muted-foreground">Shipping</TableHead>
            <TableHead className="text-muted-foreground">Products</TableHead>
            <TableHead className="text-right text-muted-foreground">
              Total
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {demoOrders.map((order) => (
            <TableRow key={order.id} className="hover:bg-muted/50">
              {/* Order Info */}
              <TableCell>
                <div className="flex flex-col gap-1.5">
                  <Badge className="w-fit rounded text-xs" variant="outline">
                    Store: {order.storeId || '10002764712'}
                  </Badge>
                  <span className="font-semibold text-sm">
                    {order.customerOrderId || '200013117027255'}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    {FormateDate(
                      order.orderDate || '2025-05-26T01:11:27.404+00:00'
                    )}
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
                      : order.status === 'processing'
                      ? 'outline'
                      : 'destructive'
                  }
                  className="capitalize px-2 text-xs"
                >
                  {order.status || 'Delivered'}
                </Badge>
              </TableCell>

              {/* Customer */}
              <TableCell>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <span className="cursor-pointer font-medium text-sm hover:underline">
                      {order.customer.name || 'Jaime Potter'}
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-64 p-4 border shadow-lg">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">
                        Customer Details
                      </h4>
                      <div className="text-sm">
                        <p className="font-medium">Name:</p>
                        <p className="text-muted-foreground">
                          {order.customer.name || 'Jaime Potter'}
                        </p>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">Address:</p>
                        <p className="text-muted-foreground whitespace-pre-line">
                          {order.customer.address ||
                            `267 Old Center Street\nMiddleboro, MA 02346\nUSA`}
                        </p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </TableCell>

              {/* Shipping */}
              <TableCell>
                <div className="flex flex-col gap-1">
                  <Badge variant="secondary" className="w-fit text-xs">
                    {order.shipNodeType || 'WFSFulfilled'}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Shipping: ${order.products?.[0]?.shipping || '6.99'}
                  </span>
                </div>
              </TableCell>

              {/* Products */}
              <TableCell className="space-y-3">
                {order.products?.map((product, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="relative h-14 w-14 overflow-hidden rounded-md border">
                      <Image
                        src={
                          product.imageUrl ||
                          'https://i5.walmartimages.com/asr/4df970ec-1a2a-4e3f-8bbe-e2add4e4c202.4c297834e11d91671098f2788abac9b1.jpeg'
                        }
                        alt={product.productName}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <p className="font-medium text-sm line-clamp-2">
                        {product.productName ||
                          'XSHOT Skins Pro Series Longshot Blaster'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        SKU: {product.productSKU || '193052050052'}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>Qty: {product.quantity || 1}</span>
                        <span>Price: ${product.PurchasePrice || '25.00'}</span>
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
                    {(Number(order.products?.[0]?.sellPrice) || 0) +
                      (Number(order.products?.[0]?.tax) || 0)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Incl. tax ${order.products?.[0]?.tax || '2.19'}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}

          {isFetchingNextPage && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  <span className="text-sm text-muted-foreground">
                    Loading more orders...
                  </span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
