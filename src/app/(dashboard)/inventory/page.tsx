"use client"

import { useState } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getProducts } from "@/lib/api/products"
import { ProductsTable } from "@/components/inventory/products-table"
import { ProductsFilters } from "@/components/inventory/products-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"

export default function InventoryPage() {
  const [filters, setFilters] = useState({
    category: "",
    search: "",
    stockStatus: "",
  })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["products", filters],
    queryFn: ({ pageParam = 1 }) => getProducts({ page: pageParam, ...filters }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  })

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  const products = data?.pages.flatMap((page) => page.products) ?? []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground">Manage your products and track stock levels</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <ProductsFilters filters={filters} onFiltersChange={setFilters} />

      <ProductsTable products={products} isLoading={isLoading} isFetchingNextPage={isFetchingNextPage} />

      {hasNextPage && (
        <div ref={ref} className="flex justify-center py-4">
          {isFetchingNextPage && <div className="text-sm text-muted-foreground">Loading more products...</div>}
        </div>
      )}
    </div>
  )
}
