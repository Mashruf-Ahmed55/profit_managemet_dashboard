'use client';
import { ProductHistory } from '@/app/(dashboard)/product-history/page';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import FormateDate from '@/lib/formateDate';
import { BiEdit } from 'react-icons/bi';
import { ProductEditModal } from '../product-edit-modal';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface ProductsTableProps {
  products: ProductHistory[];
  isLoading: boolean;
}

export function ProductHistoryTable({
  products,
  isLoading,
}: ProductsTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {[
                'Product',
                'Supplier',
                'SKU',
                'Card',
                'Quantity',
                'Cost Price',
                'Sell Price',
                'On Hand / Available',
                'Date',
              ].map((title, index) => (
                <TableHead key={index}>{title}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 9 }).map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-white overflow-x-auto">
      <Table className="text-sm">
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="w-[180px]">Product</TableHead>
            <TableHead className="w-[140px]">Supplier</TableHead>
            <TableHead className="w-[100px]">SKU</TableHead>
            <TableHead className="w-[140px]">Card</TableHead>
            <TableHead className="w-[100px]">Qty</TableHead>
            <TableHead className="w-[120px]">Cost Price</TableHead>
            <TableHead className="w-[120px]">Sell Price</TableHead>
            <TableHead className="w-[150px]">OnHand / Avail</TableHead>
            <TableHead className="w-[130px]">Date & Time</TableHead>
            <TableHead className="w-[50px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: ProductHistory) => {
            const { formattedDate, time } = FormateDate(product.date);
            return (
              <TableRow key={product._id}>
                {/* 🛍️ Product Name + Store */}
                <TableCell className="w-[180px] max-w-[180px] truncate">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="truncate cursor-pointer">
                          <p className="text-xs text-muted-foreground mb-1 truncate">
                            {product.store?.storeName}
                          </p>
                          <p className="truncate font-medium">
                            {product.product?.productName}
                          </p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs whitespace-pre-wrap break-words text-sm font-medium">
                          {product.product?.productName}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>

                {/* Supplier */}
                <TableCell className="w-[140px]">
                  <Badge variant="outline" className="truncate max-w-[90px]">
                    {product.supplier || 'Add Supplier'}
                  </Badge>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="ml-2">
                        <BiEdit size={16} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[220px] p-3">
                      <Label className="text-xs text-gray-500 mb-1">
                        Update Supplier
                      </Label>
                      <Input className="h-8 text-sm" />
                    </PopoverContent>
                  </Popover>
                </TableCell>

                {/* SKU */}
                <TableCell className="font-mono text-sm w-[100px] truncate">
                  {product.product?.sku || 'N/A'}
                </TableCell>

                {/* Card */}
                <TableCell className="w-[140px]">
                  <Badge variant="outline" className="truncate max-w-[90px]">
                    {product.card || 'Add Card'}
                  </Badge>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="ml-2">
                        <BiEdit size={16} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[220px] p-3">
                      <Label className="text-xs text-gray-500 mb-1">
                        Update Card
                      </Label>
                      <Input className="h-8 text-sm" />
                    </PopoverContent>
                  </Popover>
                </TableCell>

                {/* Quantity */}
                <TableCell className="w-[100px]">
                  <span>{Number(product.quantity) || 'N/A'}</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="ml-2">
                        <BiEdit size={16} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[220px] p-3">
                      <Label className="text-xs text-gray-500 mb-1">
                        Update Quantity
                      </Label>
                      <Input type="number" className="h-8 text-sm" />
                    </PopoverContent>
                  </Popover>
                </TableCell>

                {/* Cost Price */}
                {/* <TableCell className="w-[120px]">
                <span>{Math.ceil(Number(product.costOfPrice)) || 'N/A'}$</span>
              </TableCell> */}
                <TableCell className="w-[100px]">
                  <span>
                    {Math.ceil(Number(product.costOfPrice)) || 'N/A'}$
                  </span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="ml-2">
                        <BiEdit size={16} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[220px] p-3">
                      <Label className="text-xs text-gray-500 mb-1">
                        Update Cost Price
                      </Label>
                      <Input type="number" className="h-8 text-sm" />
                    </PopoverContent>
                  </Popover>
                </TableCell>

                {/* Sell Price */}
                <TableCell className="w-[120px]">
                  <span>{Math.ceil(Number(product.sellPrice)) || 'N/A'}$</span>
                </TableCell>

                {/* On Hand / Available */}
                <TableCell className="w-[150px]">
                  <div className="flex flex-col text-xs text-gray-500">
                    <p>
                      On Hand:{' '}
                      <span className="text-black font-semibold">
                        {product.product?.onHand ?? 0}
                      </span>
                    </p>
                    <p>
                      Available:{' '}
                      <span className="text-black font-semibold">
                        {product.product?.available ?? 0}
                      </span>
                    </p>
                  </div>
                </TableCell>

                {/* Date */}
                <TableCell className="w-[130px] flex items-center">
                  <div>
                    <span className="font-semibold text-xs text-gray-500">
                      {formattedDate}
                    </span>
                    <p className="text-xs text-gray-500">{time}</p>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="ml-2">
                        <BiEdit size={16} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[220px] p-3">
                      <Label className="text-xs text-gray-500 mb-1">
                        Update Date
                      </Label>
                      <Input type="date" className="h-8 text-sm" />
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell className="w-[50px]">
                  <ProductEditModal />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
