'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { RootState } from '@/store';
import { Bell, Search, Settings, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import ToggleTheme from './toggle-theme';

export function Header() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <header className="flex h-17 items-center gap-4 border-b border-gray-200 bg-white px-6 dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-10">
      <SidebarTrigger className="md:hidden" />

      {/* Search */}
      <div className="flex-1 w-full">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <Input
            placeholder="Search orders, products, customers..."
            className="pl-10 bg-gray-50 border-gray-200 focus:bg-white dark:bg-gray-900 dark:border-gray-700 dark:focus:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <ToggleTheme />
        {/* Notifications */}
        <Button
          variant="outline"
          size="icon"
          className="relative rounded-full hover:bg-transparent dark:hover:bg-gray-800 dark:border-gray-700"
        >
          <Bell className="h-4 w-4 dark:text-gray-300" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs dark:bg-primary dark:text-primary-foreground">
            3
          </Badge>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 hover:bg-transparent dark:hover:bg-gray-800"
            >
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center dark:bg-primary">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium dark:text-gray-100">
                  {user?.name || 'John Doe'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email || 'john@example.com'}
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 dark:bg-gray-800 dark:border-gray-700"
          >
            <DropdownMenuLabel className="dark:text-gray-200">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="dark:bg-gray-700" />
            <DropdownMenuItem className="dark:hover:bg-gray-700 dark:text-gray-200">
              <User className="mr-2 h-4 w-4 dark:text-gray-300" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="dark:hover:bg-gray-700 dark:text-gray-200">
              <Settings className="mr-2 h-4 w-4 dark:text-gray-300" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="dark:bg-gray-700" />
            <DropdownMenuItem className="text-red-600 dark:text-red-400 dark:hover:bg-gray-700">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
