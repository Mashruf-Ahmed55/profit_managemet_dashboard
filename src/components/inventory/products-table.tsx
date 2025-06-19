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
import type { Product } from '@/types';
import { AlertTriangle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface ProductsTableProps {
  products: Product[];
  isLoading: boolean;
}

export function ProductsTable({ products, isLoading }: ProductsTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-10 rounded" />
                    <div>
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-8" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Wpid / Upc / Gtin</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className='text-left'>On Hand / Available</TableHead>
            <TableHead>Condition</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const stock = product.onHand ?? 0;
            const isLowStock = stock < 10 && stock > 0;
            const isOutOfStock = stock === 0;

            const stockBadgeVariant = isOutOfStock
              ? 'destructive'
              : isLowStock
              ? 'outline'
              : 'default';

            const availabilityLabel = product.availability
              ?.replace(/_/g, ' ')
              ?.replace(/\b\w/g, (l) => l.toUpperCase());

            return (
              <TableRow key={product.id}>
                <TableCell className="max-w-[250px]">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="truncate cursor-pointer">
                          <p className="text-xs text-muted-foreground mb-1">
                            {product.mart}
                          </p>
                          <p className="truncate font-medium">
                            {product.productName}
                          </p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs whitespace-pre-wrap break-words text-sm font-medium">
                          {product.productName}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>

                <TableCell>
                  <Badge variant="outline">{product.productType}</Badge>
                </TableCell>

                <TableCell className="font-mono text-sm">
                  {product.sku}
                </TableCell>

                <TableCell>
                  <div className="flex gap-y-1.5 flex-col items-start font-medium">
                    <p className="text-gray-600 text-xs">
                      wpid: {product.wpid}
                    </p>
                    <p className="text-gray-600 text-xs">Upc: {product.upc}</p>
                    <p className="text-gray-600 text-xs">
                      Gtin: {product.gtin}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        availabilityLabel === 'Out_of_stock'
                          ? 'destructive'
                          : 'outline'
                      }
                    >
                      {availabilityLabel || 'Unknown'}
                    </Badge>
                    {isLowStock && (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex items-center gap-y-1 flex-col">
                    <p className="text-gray-400 text-xs">
                      On Hand:{' '}
                      <span className="text-black font-extrabold">
                        {product.onHand}
                      </span>
                    </p>
                    <p className="text-gray-400 text-xs">
                      Available:{' '}
                      <span className="text-black font-extrabold">
                        {product.available}
                      </span>
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge variant={stockBadgeVariant}>
                    {product.condition || 'N/A'}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
