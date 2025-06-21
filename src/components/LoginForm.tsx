'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { AtSignIcon, EyeIcon, EyeOffIcon, LockIcon } from 'lucide-react';
import { useId, useState } from 'react';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const passwordInputId = useId();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
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
              id="email"
              type="email"
              placeholder="Email"
              className="ps-9 text-accent"
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-muted-foreground">
              <AtSignIcon size={16} aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="grid gap-2">
          <Label className="text-muted-foreground" htmlFor={passwordInputId}>
            Password
          </Label>
          <div className="relative">
            <Input
              id={passwordInputId}
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
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
    </form>
  );
}
