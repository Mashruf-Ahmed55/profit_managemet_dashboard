import type { Customer } from '@/types';

// Mock data generator for customers
const generateMockCustomers = (page: number, limit = 20): Customer[] => {
  const customers: Customer[] = [];

  for (let i = 0; i < limit; i++) {
    const id = (page - 1) * limit + i + 1;
    customers.push({
      id: `CUST-${id.toString().padStart(4, '0')}`,
      name: `Customer ${id}`,
      email: `customer${id}@example.com`,
      phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${
        Math.floor(Math.random() * 9000) + 1000
      }`,
      address: `${
        Math.floor(Math.random() * 9999) + 1
      } Main St, City, State 12345`,
      createdAt: new Date(
        Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
      ).toISOString(),
      orderCount: Math.floor(Math.random() * 20),
      totalSpent: Math.random() * 5000 + 100,
    });
  }

  return customers;
};

export const getCustomers = async ({
  page = 1,
  limit = 20,
  search = '',
  status = '',
  dateRange = '',
}: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  dateRange?: string;
}) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let customers = generateMockCustomers(page, limit);

  // Apply filters
  if (search) {
    customers = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase()) ||
        customer.id.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Additional filtering logic can be added here for status and dateRange

  return {
    customers,
    nextPage: page < 10 ? page + 1 : null,
    totalPages: 10,
    totalCustomers: 200,
  };
};
