'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axiosInstance from '@/lib/axiosInstance';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { AtSignIcon, EyeIcon, EyeOffIcon, LockIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const router = useRouter();
  const passwordInputId = useId();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { setUser } = useAuthStore();

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await axiosInstance.post('/api/users/login', data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (data) => {
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
      });
      toast.success(data.message);
      router.push('/dashboard');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Login failed');
      console.log(error);
    },
  });
  const onSubmit = (data: { email: string; password: string }) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-accent">
          Login to your account
        </h1>
        <p className="text-sm text-muted-foreground text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      {/* Fields */}
      <div className="grid gap-6">
        {/* Email */}
        <div className="grid gap-2">
          <Label className="text-muted-foreground" htmlFor="email">
            Email
          </Label>
          <div className="relative">
            <Input
              {...register('email')}
              type="email"
              placeholder="Email"
              className="ps-9 text-accent"
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-muted-foreground">
              <AtSignIcon size={16} aria-hidden="true" />
            </div>
          </div>
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="grid gap-2">
          <Label className="text-muted-foreground" htmlFor={passwordInputId}>
            Password
          </Label>
          <div className="relative">
            <Input
              id={passwordInputId}
              {...register('password')}
              type={isVisible ? 'text' : 'password'}
              placeholder="Password"
              className="ps-9 pe-9 text-accent"
            />
            {/* Left icon */}
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-muted-foreground">
              <LockIcon size={16} aria-hidden="true" />
            </div>
            {/* Toggle show/hide */}
            <button
              type="button"
              onClick={toggleVisibility}
              className="absolute inset-y-0 end-0 flex items-center justify-center w-9 text-muted-foreground rounded-e-md cursor-pointer"
              aria-label={isVisible ? 'Hide password' : 'Show password'}
              aria-pressed={isVisible}
              aria-controls={passwordInputId}
            >
              {isVisible ? (
                <EyeOffIcon size={16} aria-hidden="true" />
              ) : (
                <EyeIcon size={16} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <Button disabled={mutation.isPending} type="submit" className="w-full">
          {mutation.isPending ? 'Logging in...' : 'Login'}
        </Button>
      </div>
    </form>
  );
}
