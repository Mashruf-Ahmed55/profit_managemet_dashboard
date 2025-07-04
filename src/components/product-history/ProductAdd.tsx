'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'; // adjust path as per your setup
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axiosInstance from '@/lib/axiosInstance';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface AddProductHistoryProps {
  productId: string;
  node: React.ReactNode;
  storeId: string;
}

interface FormInputs {
  supplier: string;
  card: string;
  quantity: number;
  costPrice: number;
  sellPrice: number;
  email: string;
  dateTime: string;
}

const AddProductHistory: React.FC<AddProductHistoryProps> = ({
  productId,
  node,
  storeId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>();

  const query = useQueryClient();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log('data', data);
    console.log('productID', productId);
    console.log('storeID', storeId);

    await axiosInstance
      .post(
        `/api/product-history/create-product-history/${productId}`,
        {
          storeID: storeId,
          quantity: Number(data.quantity),
          costOfPrice: Number(data.costPrice),
          sellPrice: Number(data.sellPrice),
          date: data.dateTime,
          email: data.email,
          card: data.card,
          supplier: data.supplier,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        query.invalidateQueries({ queryKey: ['productsHistory'] });
        toast.success('Product history added successfully');
      })
      .catch((err) => toast.error("Product history couldn't be added"));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{node}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Product History</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            {/* Supplier */}
            <div className="grid gap-1">
              <Label htmlFor="supplier">Supplier</Label>
              <Input
                id="supplier"
                {...register('supplier', { required: 'Supplier is required' })}
                placeholder="Supplier name"
                aria-invalid={errors.supplier ? 'true' : 'false'}
              />
              {errors.supplier && (
                <p role="alert" className="text-red-600 text-sm">
                  {errors.supplier.message}
                </p>
              )}
            </div>

            {/* Card */}
            <div className="grid gap-1">
              <Label htmlFor="card">Card</Label>
              <Input
                id="card"
                {...register('card', { required: 'Card is required' })}
                placeholder="Card info"
                aria-invalid={errors.card ? 'true' : 'false'}
              />
              {errors.card && (
                <p role="alert" className="text-red-600 text-sm">
                  {errors.card.message}
                </p>
              )}
            </div>

            {/* Quantity */}
            <div className="grid gap-1">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                {...register('quantity', {
                  required: 'Quantity is required',
                  valueAsNumber: true,
                  min: { value: 1, message: 'Minimum quantity is 1' },
                })}
                placeholder="Quantity"
                aria-invalid={errors.quantity ? 'true' : 'false'}
              />
              {errors.quantity && (
                <p role="alert" className="text-red-600 text-sm">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            {/* Cost Price */}
            <div className="grid gap-1">
              <Label htmlFor="costPrice">Cost Price</Label>
              <Input
                id="costPrice"
                type="number"
                step="0.01"
                {...register('costPrice', {
                  required: 'Cost price is required',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Cost price cannot be negative' },
                })}
                placeholder="Cost Price"
                aria-invalid={errors.costPrice ? 'true' : 'false'}
              />
              {errors.costPrice && (
                <p role="alert" className="text-red-600 text-sm">
                  {errors.costPrice.message}
                </p>
              )}
            </div>

            {/* Sell Price */}
            <div className="grid gap-1">
              <Label htmlFor="sellPrice">Sell Price</Label>
              <Input
                id="sellPrice"
                type="number"
                step="0.01"
                {...register('sellPrice', {
                  required: 'Sell price is required',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Sell price cannot be negative' },
                })}
                placeholder="Sell Price"
                aria-invalid={errors.sellPrice ? 'true' : 'false'}
              />
              {errors.sellPrice && (
                <p role="alert" className="text-red-600 text-sm">
                  {errors.sellPrice.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address',
                  },
                })}
                placeholder="Email"
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && (
                <p role="alert" className="text-red-600 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Date & Time */}
            <div className="grid gap-1">
              <Label htmlFor="dateTime">Date & Time</Label>
              <Input
                id="dateTime"
                type="datetime-local"
                {...register('dateTime', {
                  required: 'Date & Time is required',
                })}
                aria-invalid={errors.dateTime ? 'true' : 'false'}
              />
              {errors.dateTime && (
                <p role="alert" className="text-red-600 text-sm">
                  {errors.dateTime.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductHistory;
