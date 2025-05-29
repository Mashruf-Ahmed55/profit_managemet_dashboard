import type { Product } from '@/types';

// Mock data generator for products
const generateMockProducts = (page: number, limit = 20): Product[] => {
  const products: Product[] = [];
  const categories = ['electronics', 'clothing', 'books', 'home', 'sports'];

  for (let i = 0; i < limit; i++) {
    const id = (page - 1) * limit + i + 1;
    products.push({
      id: id.toString(),
      name: `Product ${id}`,
      description: `High-quality product ${id} with excellent features and great value for money.`,
      price: Math.random() * 500 + 10,
      stock: Math.floor(Math.random() * 100),
      category: categories[Math.floor(Math.random() * categories.length)],
      sku: `SKU-${id.toString().padStart(4, '0')}`,
      image: `/placeholder.svg?height=40&width=40`,
      createdAt: new Date(
        Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
      ).toISOString(),
    });
  }

  return products;
};

export const getProducts = async ({
  page = 1,
  limit = 20,
  category = '',
  search = '',
  stockStatus = '',
}: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  stockStatus?: string;
}) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let products = generateMockProducts(page, limit);

  // Apply filters
  if (category && category !== 'all') {
    products = products.filter((product) => product.category === category);
  }

  if (search) {
    products = products.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (stockStatus && stockStatus !== 'all') {
    products = products.filter((product) => {
      switch (stockStatus) {
        case 'in-stock':
          return product.stock > 10;
        case 'low-stock':
          return product.stock > 0 && product.stock <= 10;
        case 'out-of-stock':
          return product.stock === 0;
        default:
          return true;
      }
    });
  }

  return {
    products,
    nextPage: page < 10 ? page + 1 : null,
    totalPages: 10,
    totalProducts: 200,
  };
};
