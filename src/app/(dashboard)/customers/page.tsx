"use client"

import { useState } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getCustomers } from "@/lib/api/customers"
import { CustomersTable } from "@/components/customers/customers-table"
import { CustomersFilters } from "@/components/customers/customers-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"

export default function CustomersPage() {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    dateRange: "",
  })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["customers", filters],
    queryFn: ({ pageParam = 1 }) => getCustomers({ page: pageParam, ...filters }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  })

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  const customers = data?.pages.flatMap((page) => page.customers) ?? []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your customer relationships and contact information</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <CustomersFilters filters={filters} onFiltersChange={setFilters} />

      <CustomersTable customers={customers} isLoading={isLoading} isFetchingNextPage={isFetchingNextPage} />

      {hasNextPage && (
        <div ref={ref} className="flex justify-center py-4">
          {isFetchingNextPage && <div className="text-sm text-muted-foreground">Loading more customers...</div>}
        </div>
      )}
    </div>
  )
}
