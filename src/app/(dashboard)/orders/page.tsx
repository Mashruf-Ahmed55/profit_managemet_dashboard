'use client';

import { OrdersTable } from '@/components/orders/orders-table';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/lib/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Plus } from 'lucide-react';

const getOrders = async () => {
  try {
    const response = await axiosInstance.get(
      '/api/orders/get-orders'
    );
    return response.data.orders;
  } catch (error) {
    console.log(error);
  }
};

export default function OrdersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            Manage and track all your customer orders
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Order
        </Button>
      </div>

      {/* <OrdersFilters filters={filters} onFiltersChange={setFilters} /> */}
      {/* orders={orders} */}
      <OrdersTable orders={data} isLoading={isLoading} />
    </div>
  );
}
