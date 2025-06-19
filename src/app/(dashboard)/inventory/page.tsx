'use client';

import { ProductsFilters } from '@/components/inventory/products-filters';
import { ProductsTable } from '@/components/inventory/products-table';
import { Button } from '@/components/ui/button';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

// ✅ Updated getProducts Function
export const getProducts = async ({
  page = 1,
  limit = 50,
  availability = '',
  search = '',
  storeId = '',
}: {
  page?: number;
  limit?: number;
  availability?: string;
  search?: string;
  storeId?: string;
}) => {
  try {
    const res = await axios.get(
      'http://localhost:4000/api/products/get-products',
      {
        params: {
          page,
          limit,
          availability,
          search,
          storeId, // ✅ match key name with filters object
        },
        withCredentials: true,
      }
    );

    if (res.data.error) {
      throw new Error(res.data.error);
    }

    return res.data.data;
  } catch (error) {
    toast.error('Failed to fetch products. Please try again.');
    return { products: [], nextPage: undefined };
  }
};

export default function InventoryPage() {
  const [filters, setFilters] = useState({
    storeId: '',
    search: '',
    availability: '',
  });

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground">
            Manage your products and track stock levels
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* 🔎 Filter Component */}
      <ProductsFilters filters={filters} onFiltersChange={setFilters} />

      {/* 📋 Product Table */}
      <ProductsTable products={products} isLoading={isLoading} />
    </div>
  );
}
