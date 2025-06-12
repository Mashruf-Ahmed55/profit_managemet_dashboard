import type { Order } from '@/types';

// Mock data generator
const generateMockOrders = (page: number, limit = 20): Order[] => {
  const orders: Order[] = [];
  const statuses = ['pending', 'processing', 'completed', 'cancelled'];

  for (let i = 0; i < limit; i++) {
    const id = (page - 1) * limit + i + 1;
    orders.push({
      id: id.toString().padStart(4, '0'),
      // @ts-ignore
      customer: {
        name: `Customer ${id}`,
      },
      status: statuses[Math.floor(Math.random() * statuses.length)] as any,
      total: Math.random() * 1000 + 50,
      items: Math.floor(Math.random() * 5) + 1,
      createdAt: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
    });
  }

  return orders;
};

export const getOrders = async ({
  page = 1,
  limit = 20,
  status = '',
  search = '',
}: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let orders = generateMockOrders(page, limit);

  // Apply filters
  if (status) {
    orders = orders.filter((order) => order.status === status);
  }

  if (search) {
    orders = orders.filter(
      (order) =>
        order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
        order.id.includes(search)
    );
  }

  return {
    orders,
    nextPage: page < 10 ? page + 1 : null, // Simulate 10 pages max
    totalPages: 10,
    totalOrders: 200,
  };
};

export const getRecentOrders = async (limit = 5) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return generateMockOrders(1, limit).map((order) => ({
    ...order,
    createdAt: new Date(
      Date.now() - Math.random() * 24 * 60 * 60 * 1000
    ).toISOString(),
  }));
};
