"use client"

import { useState } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getOrders } from "@/lib/api/orders"
import { OrdersTable } from "@/components/orders/orders-table"
import { OrdersFilters } from "@/components/orders/orders-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"

export default function OrdersPage() {
  const [filters, setFilters] = useState({
    status: "",
    search: "",
    dateRange: "",
  })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["orders", filters],
    queryFn: ({ pageParam = 1 }) => getOrders({ page: pageParam, ...filters }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  })

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  const orders = data?.pages.flatMap((page) => page.orders) ?? []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage and track all your customer orders</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Order
        </Button>
      </div>

      <OrdersFilters filters={filters} onFiltersChange={setFilters} />

      <OrdersTable orders={orders} isLoading={isLoading} isFetchingNextPage={isFetchingNextPage} />

      {hasNextPage && (
        <div ref={ref} className="flex justify-center py-4">
          {isFetchingNextPage && <div className="text-sm text-muted-foreground">Loading more orders...</div>}
        </div>
      )}
    </div>
  )
}
