'use client';

import type React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {
  Calendar,
  CreditCard,
  DollarSign,
  Edit2,
  Hash,
  Mail,
  Package,
  Save,
  X,
} from 'lucide-react';
import { useState } from 'react';

// Types
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

interface ProductsTableProps {
  products: ProductHistory[];
  isLoading: boolean;
}

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return { formattedDate, time };
};

// Edit Popover Component
interface EditPopoverProps {
  value: string | number;
  onSave: (value: string) => void;
  type?: 'text' | 'number' | 'email' | 'date';
  label: string;
  icon: React.ReactNode;
}

function EditPopover({
  value,
  onSave,
  type = 'text',
  label,
  icon,
}: EditPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editValue, setEditValue] = useState(String(value || ''));

  const handleSave = () => {
    onSave(editValue);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setEditValue(String(value || ''));
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Edit2 className="h-3 w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="start">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            {icon}
            <Label className="text-sm font-medium">{label}</Label>
          </div>
          <Input
            type={type}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="h-9"
            placeholder={`Enter ${label.toLowerCase()}`}
          />
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="h-8"
            >
              <X className="h-3 w-3 mr-1" />
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} className="h-8">
              <Save className="h-3 w-3 mr-1" />
              Save
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

const updateSingleField = async (id: string, field: string, value: string) => {
  try {
    const res = await axios.patch(
      `http://localhost:4000/api/product-history/${id}/update`,
      {
        field,
        value,
      }
    );
    console.log(res.data.message); // optional
  } catch (err) {
    if (
      err &&
      typeof err === 'object' &&
      'response' in err &&
      err.response &&
      typeof err.response === 'object' &&
      'data' in err.response
    ) {
      console.error('Update failed:', err.response.data);
    } else if (err instanceof Error) {
      console.error('Update failed:', err.message);
    } else {
      console.error('Update failed:', err);
    }
  }
};

export function ProductHistoryTable({
  products,
  isLoading,
}: ProductsTableProps) {
  const [editingData, setEditingData] = useState<Record<string, any>>({});
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      id,
      field,
      value,
    }: {
      id: string;
      field: string;
      value: string;
    }) => updateSingleField(id, field, value),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['productsHistory'] });
    },
    onError: (error) => {
      console.error('Error updating field:', error);
    },
  });

  const handleFieldUpdate = (
    productId: string,
    field: string,
    value: string
  ) => {
    setEditingData((prev) => ({
      ...prev,
      [`${productId}-${field}`]: value,
    }));

    mutation.mutate({
      id: productId,
      field,
      value,
    });
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  {[
                    'Product',
                    'Supplier',
                    'SKU',
                    'Card',
                    'Quantity',
                    'Cost Price',
                    'Sell Price',
                    'Email',
                    'Date & Time',
                  ].map((title, index) => (
                    <TableHead key={index} className="font-semibold">
                      {title}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 9 }).map((_, j) => (
                      <TableCell key={j} className="py-4">
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-sm">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold min-w-[200px]">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Product
                  </div>
                </TableHead>
                <TableHead className="font-semibold min-w-[140px]">
                  Supplier
                </TableHead>
                <TableHead className="font-semibold min-w-[100px]">
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    SKU
                  </div>
                </TableHead>
                <TableHead className="font-semibold min-w-[120px]">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Card
                  </div>
                </TableHead>
                <TableHead className="font-semibold min-w-[100px]">
                  Quantity
                </TableHead>
                <TableHead className="font-semibold min-w-[120px]">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Cost Price
                  </div>
                </TableHead>
                <TableHead className="font-semibold min-w-[120px]">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Sell Price
                  </div>
                </TableHead>
                <TableHead className="font-semibold min-w-[200px]">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </div>
                </TableHead>
                <TableHead className="font-semibold min-w-[140px]">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date & Time
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product: ProductHistory) => {
                const { formattedDate, time } = formatDate(product.date);
                return (
                  <TableRow
                    key={product._id}
                    className="group hover:bg-muted/30 transition-colors"
                  >
                    {/* Product */}
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        {product.store?.storeName && (
                          <Badge variant="secondary" className="text-xs">
                            {product.store.storeName}
                          </Badge>
                        )}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <p className="font-medium text-sm truncate max-w-[180px] cursor-help">
                                {product.product?.productName ||
                                  'Unnamed Product'}
                              </p>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs">
                              <p className="text-sm">
                                {product.product?.productName ||
                                  'Unnamed Product'}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>

                    {/* Supplier */}
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2 group/supplier">
                        <Badge
                          variant={product.supplier ? 'outline' : 'secondary'}
                          className="truncate max-w-[100px] text-sm font-medium"
                        >
                          {product.supplier || 'No Supplier'}
                        </Badge>
                        <EditPopover
                          value={product.supplier}
                          onSave={(value) =>
                            handleFieldUpdate(product._id, 'supplier', value)
                          }
                          label="Supplier"
                          icon={<Package className="h-4 w-4" />}
                        />
                      </div>
                    </TableCell>

                    {/* SKU */}
                    <TableCell className="py-4">
                      <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                        {product.product?.sku || 'N/A'}
                      </code>
                    </TableCell>

                    {/* Card */}
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2 group/card">
                        <Badge
                          variant={product.card ? 'outline' : 'secondary'}
                          className="truncate max-w-[80px]"
                        >
                          {product.card || 'No Card'}
                        </Badge>
                        <EditPopover
                          value={product.card}
                          onSave={(value) =>
                            handleFieldUpdate(product._id, 'card', value)
                          }
                          label="Card"
                          icon={<CreditCard className="h-4 w-4" />}
                        />
                      </div>
                    </TableCell>

                    {/* Quantity */}
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2 group/quantity">
                        <span className="font-medium">
                          {Number(product.quantity) || 0}
                        </span>
                        <EditPopover
                          value={product.quantity}
                          onSave={(value) =>
                            handleFieldUpdate(product._id, 'quantity', value)
                          }
                          type="number"
                          label="Quantity"
                          icon={<Hash className="h-4 w-4" />}
                        />
                      </div>
                    </TableCell>

                    {/* Cost Price */}
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2 group/cost">
                        <span className="font-medium text-green-600">
                          ${Math.ceil(Number(product.costOfPrice)) || 0}
                        </span>
                        <EditPopover
                          value={product.costOfPrice}
                          onSave={(value) =>
                            handleFieldUpdate(product._id, 'costOfPrice', value)
                          }
                          type="number"
                          label="Cost Price"
                          icon={<DollarSign className="h-4 w-4" />}
                        />
                      </div>
                    </TableCell>

                    {/* Sell Price */}
                    <TableCell className="py-4">
                      <span className="font-medium text-blue-600">
                        ${Math.ceil(Number(product.sellPrice)) || 0}
                      </span>
                    </TableCell>

                    {/* Email */}
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2 group/email">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="text-sm text-muted-foreground truncate max-w-[150px] cursor-help">
                                {product.email || 'No Email'}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p className="text-sm">
                                {product.email || 'No Email'}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <EditPopover
                          value={product.email}
                          onSave={(value) =>
                            handleFieldUpdate(product._id, 'email', value)
                          }
                          type="email"
                          label="Email"
                          icon={<Mail className="h-4 w-4" />}
                        />
                      </div>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2 group/date">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">
                            {formattedDate}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {time}
                          </div>
                        </div>
                        <EditPopover
                          value={product.date.split('T')[0]}
                          onSave={(value) =>
                            handleFieldUpdate(product._id, 'date', value)
                          }
                          type="date"
                          label="Date"
                          icon={<Calendar className="h-4 w-4" />}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
