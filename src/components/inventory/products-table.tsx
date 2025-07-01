'use client';

import type React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Product, usePrefetchProducts, useProducts } from '@/hooks/useProduct';
import { Store, useStoresData } from '@/hooks/useStoreData';
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  LucideEye,
  RefreshCw,
  Search,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function ProductsTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [search, setSearch] = useState('');
  const [availability, setAvailability] = useState('All Stock');
  const [storeId, setStoreId] = useState('All Marts');
  const { data: stores } = useStoresData();

  const { data, isLoading, error, refetch, isFetching } = useProducts({
    page,
    limit,
    search,
    availability,
    storeId,
  });

  const { prefetchNextPage } = usePrefetchProducts();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleLimitChange = (value: string) => {
    const newLimit = Number(value);
    setLimit(newLimit);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (data && newPage < data.pagination.pages) {
      prefetchNextPage(newPage, limit, search, availability, storeId);
    }
  };

  const goToFirstPage = () => handlePageChange(1);
  const goToLastPage = () => data && handlePageChange(data.pagination.pages);
  const goToPreviousPage = () => handlePageChange(Math.max(1, page - 1));
  const goToNextPage = () =>
    data && handlePageChange(Math.min(data.pagination.pages, page + 1));

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1); // Reset to first page when searching
  };

  const handleAvailabilityChange = (value: string) => {
    setAvailability(value);
    setPage(1);
  };

  const handleMartChange = (value: string) => {
    setStoreId(value);
    setPage(1);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search already handled by onChange, just prevent default
  };

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
        {/* Filters skeleton */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
        </div>

        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                {[
                  'Product',
                  'Category',
                  'SKU',
                  'Identifiers',
                  'Stock',
                  'Inventory',
                  'Condition',
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
                  {Array.from({ length: 7 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-16 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination skeleton */}
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
          Failed to load products. Please try again.
        </p>
        <Button onClick={() => refetch()} variant="outline" className="mt-4">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  if (data.data.length === 0) {
    return (
      <div className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <form onSubmit={handleSearchSubmit} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>
          <Select value={availability} onValueChange={handleAvailabilityChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Stock" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Stock">All Stock</SelectItem>
              <SelectItem value="In_stock">In Stock</SelectItem>
              <SelectItem value="Out_of_stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
          <Select value={storeId} onValueChange={handleMartChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Marts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Marts</SelectItem>
              {stores?.map((store: Store) => (
                <SelectItem key={store.storeId + 2} value={store.storeId}>
                  {store.storeName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border bg-card shadow-sm p-8 text-center">
          <p className="text-muted-foreground">
            No products found matching your criteria.
          </p>
        </div>
      </div>
    );
  }

  const startIndex = (data.pagination.page - 1) * data.pagination.limit + 1;
  const endIndex = Math.min(
    data.pagination.page * data.pagination.limit,
    data.pagination.total
  );

  return (
    <div className="space-y-4">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold">Products</h2>
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

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearchSubmit} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </form>
        <Select value={availability} onValueChange={handleAvailabilityChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Stock" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Stock">All Stock</SelectItem>
            <SelectItem value="In_stock">In Stock</SelectItem>
            <SelectItem value="Out_of_stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
        <Select value={storeId} onValueChange={handleMartChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Marts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Marts</SelectItem>
            {stores?.map((store: Store) => (
              <SelectItem key={store.storeId + 2} value={store.storeId}>
                {store.storeName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
        <Table className="text-sm w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[280px] font-semibold text-foreground/80 bg-muted/30 py-4">
                Product
              </TableHead>
              <TableHead className="min-w-[140px] font-semibold text-foreground/80 bg-muted/30 py-4">
                Category
              </TableHead>
              <TableHead className="min-w-[120px] font-semibold text-foreground/80 bg-muted/30 py-4">
                SKU
              </TableHead>
              <TableHead className="min-w-[160px] font-semibold text-foreground/80 bg-muted/30 py-4">
                Identifiers
              </TableHead>
              <TableHead className="min-w-[120px] font-semibold text-foreground/80 bg-muted/30 py-4">
                Stock
              </TableHead>
              <TableHead className="min-w-[140px] font-semibold text-foreground/80 bg-muted/30 py-4">
                Inventory
              </TableHead>
              <TableHead className="min-w-[100px] font-semibold text-foreground/80 bg-muted/30 py-4">
                Condition
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((product: Product) => {
              const stock = product.onHand ?? 0;
              const isLowStock = stock < 10 && stock > 0;
              const isOutOfStock = stock === 0;

              const availabilityLabel = product.availability
                ?.replace(/_/g, ' ')
                ?.replace(/\b\w/g, (l) => l.toUpperCase());

              return (
                <TableRow
                  key={product._id}
                  className="hover:bg-muted/30 transition-colors border-b border-border/30 group"
                >
                  {/* Product */}
                  <TableCell className="max-w-[280px]">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="cursor-pointer py-2">
                            <Badge
                              variant="secondary"
                              className="mb-2 text-xs font-medium px-2 py-1 bg-blue-50 text-blue-700 border-blue-200"
                            >
                              {product.mart}
                            </Badge>
                            <p className="truncate font-medium text-foreground group-hover:text-primary transition-colors">
                              {product.productName}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Updated: {formatDate(product.updatedAt)}
                            </p>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="whitespace-pre-wrap break-words text-sm font-medium">
                            {product.productName}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>

                  {/* Category */}
                  <TableCell>
                    <Badge variant="outline" className="font-medium">
                      {product.productType}
                    </Badge>
                  </TableCell>

                  {/* SKU */}
                  <TableCell className="font-mono text-sm font-medium">
                    {product.sku}
                  </TableCell>

                  {/* Identifiers */}
                  <TableCell>
                    <div className="flex gap-y-1.5 flex-col items-start">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">WPID:</span>{' '}
                        {product.wpid}
                      </p>
                      {product.upc && (
                        <p className="text-xs text-muted-foreground">
                          <span className="font-medium">UPC:</span>{' '}
                          {product.upc}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">GTIN:</span>{' '}
                        {product.gtin}
                      </p>
                    </div>
                  </TableCell>

                  {/* Stock */}
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={
                          product.availability === 'Out_of_stock'
                            ? 'text-xs px-3 py-1 bg-red-100 text-red-800 border-red-200 font-medium'
                            : 'text-xs px-3 py-1 bg-green-100 text-green-800 border-green-200 font-medium'
                        }
                      >
                        {availabilityLabel || 'Unknown'}
                      </Badge>
                      {isLowStock && (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                  </TableCell>

                  {/* Inventory */}
                  <TableCell>
                    <div className="flex items-center gap-y-1 flex-col">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">On Hand:</span>{' '}
                        <span className="text-foreground font-bold">
                          {product.onHand}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Available:</span>{' '}
                        <span className="text-foreground font-bold">
                          {product.available}
                        </span>
                      </p>
                    </div>
                  </TableCell>

                  {/* Condition */}
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <Badge
                        className={
                          isOutOfStock
                            ? 'text-xs px-2 py-1 bg-red-100 text-red-800 border-red-200 font-medium'
                            : isLowStock
                            ? 'text-xs px-2 py-1 bg-yellow-50 text-yellow-700 border-yellow-200 font-medium'
                            : 'text-xs px-2 py-1 bg-green-100 text-green-800 border-green-200 font-medium'
                        }
                      >
                        {product.condition || 'N/A'}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          product.publishedStatus === 'PUBLISHED'
                            ? 'text-xs bg-green-50 text-green-700 border-green-200'
                            : product.publishedStatus === 'UNPUBLISHED'
                            ? 'text-xs bg-gray-50 text-gray-700 border-gray-200'
                            : 'text-xs bg-red-50 text-red-700 border-red-200'
                        }
                      >
                        {product.publishedStatus}
                      </Badge>
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <Link
                      href={`/product-history/product-history-list/${product._id}`}
                    >
                      <Button size={'icon'} variant={'outline'}>
                        <LucideEye />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
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
              {[10, 25, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {data.pagination.page} of {data.pagination.pages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={goToFirstPage}
              disabled={data.pagination.page === 1 || isFetching}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={goToPreviousPage}
              disabled={data.pagination.page === 1 || isFetching}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={goToNextPage}
              disabled={
                data.pagination.page === data.pagination.pages || isFetching
              }
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={goToLastPage}
              disabled={
                data.pagination.page === data.pagination.pages || isFetching
              }
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">
            {data.pagination.total === 0
              ? 'No products'
              : `${startIndex}-${endIndex} of ${data.pagination.total}`}
          </p>
        </div>
      </div>
    </div>
  );
}
