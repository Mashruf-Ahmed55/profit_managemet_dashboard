'use client';

import axiosInstance from '@/lib/axiosInstance';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Define the expected API response type

interface UseOrdersParams {
  page: number;
  limit: number;
  search?: string;
  status?: string;
}

const fetchOrders = async ({
  page,
  limit,
  search,
  status,
}: UseOrdersParams) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search) params.append('search', search);
  if (status) params.append('status', status);

  const response = await axiosInstance.get(
    `/api/orders/get-orders?${params.toString()}`
  );

  return response.data;
};

export function useOrders({
  page = 1,
  limit = 20,
  search = '',
  status = '',
}: Partial<UseOrdersParams> = {}) {
  return useQuery({
    queryKey: ['orders', { page, limit, search, status }],
    queryFn: () => fetchOrders({ page, limit, search, status }),
    placeholderData: (previousData) => previousData, // Keep previous data while loading new data
  });
}

// Hook for prefetching next page
export function usePrefetchOrders() {
  const queryClient = useQueryClient();

  const prefetchNextPage = (
    currentPage: number,
    limit: number,
    search?: string,
    status?: string
  ) => {
    queryClient.prefetchQuery({
      queryKey: ['orders', { page: currentPage + 1, limit, search, status }],
      queryFn: () =>
        fetchOrders({ page: currentPage + 1, limit, search, status }),
      staleTime: 5 * 60 * 1000,
    });
  };

  return { prefetchNextPage };
}
