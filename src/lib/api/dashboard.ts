export const getDashboardStats = async () => {
  // Mock data - replace with actual API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    totalRevenue: 45231.89,
    revenueChange: 20.1,
    totalOrders: 2350,
    ordersChange: 15.3,
    totalCustomers: 1205,
    customersChange: 8.2,
    totalProducts: 456,
    productsChange: 5.1,
  };
};

export const getRevenueData = async () => {
  // Mock data - replace with actual API call
  await new Promise((resolve) => setTimeout(resolve, 800));

  return [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 5000 },
    { month: 'Apr', revenue: 4500 },
    { month: 'May', revenue: 6000 },
    { month: 'Jun', revenue: 5500 },
    { month: 'Jul', revenue: 7000 },
    { month: 'Aug', revenue: 6500 },
    { month: 'Sep', revenue: 8000 },
    { month: 'Oct', revenue: 7500 },
    { month: 'Nov', revenue: 9000 },
    { month: 'Dec', revenue: 8500 },
  ];
};
