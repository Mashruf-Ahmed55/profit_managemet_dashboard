'use client';

import { StoreFilter } from '@/components/product-history/CategoryFilter';
import { ProductHistoryTable } from '@/components/product-history/ProductHistory-table';
import { SearchFilter } from '@/components/product-history/searchFilter';
import { Button } from '@/components/ui/button';
import { useStoresData } from '@/hooks/useStoreData';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

// ✅ Interface kept same as before
export interface ProductHistory {
  _id: string;
  productId: string;
  storeID: string;
  quantity: string;
  costOfPrice: string;
  sellPrice: string;
  email: string;
  card: string;
  supplier: string;
  totalPrice: string;
  date: string;
  __v: number;
  product: Product;
  store: Store;
}

export interface Product {
  _id: string;
  mart: string;
  sku: string;
  condition: string;
  availability: string;
  wpid: string;
  upc: string;
  gtin: string;
  productName: string;
  productType: string;
  onHand: number;
  available: number;
  publishedStatus: string;
  lifecycleStatus: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface Store {
  _id: string;
  storeId: string;
  storeName: string;
  storeEmail: string;
  storeClientId: string;
  storeClientSecret: string;
  storeStatus: 'active' | 'inactive' | 'suspended';
  storeImage: string;
  storeImagePublicId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// ✅ Get products by a generic `search` (used for both sku or name)
export const getProducts = async ({
  search,
}: {
  search?: string;
}): Promise<ProductHistory[]> => {
  try {
    const res = await axios.get(
      'http://localhost:4000/api/product-history/get-all-product-history',
      {
        params: { search, storeId: '' },
        withCredentials: true,
      }
    );

    if (res.data.error) {
      throw new Error(res.data.error);
    }

    return res.data.products || []; // match actual key
  } catch (error) {
    toast.error('Failed to fetch products. Please try again.');
    return [];
  }
};

export default function InventoryPage() {
  const [search, setSearch] = useState('');
  const [storeId, setStoreId] = useState('');

  const { data: stores } = useStoresData();

  const { data = [], isLoading } = useQuery({
    queryKey: ['productsHistory', search, storeId],
    queryFn: () => getProducts({ search }),
  });

  return (
    <div className="space-y-6">
      {/* 🔥 Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Purchase History
          </h1>
          <p className="text-muted-foreground">
            Manage your products and track stock levels
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="flex items-center">
        {/* 🔍 Search Filter */}
        <SearchFilter search={search} onSearchChange={setSearch} />
        <StoreFilter
          storeValue={stores}
          value={storeId}
          onChange={setStoreId}
        />
      </div>

      {/* 📦 Product History Table */}
      <ProductHistoryTable products={data} isLoading={isLoading} />
    </div>
  );
}
