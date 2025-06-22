'use client';

import { Home, Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

// Navigation items
const navigationItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Orders',
    url: '/orders',
    icon: ShoppingCart,
  },
  {
    title: 'Inventory',
    url: '/inventory',
    icon: Package,
  },
  {
    title: 'Purchases History',
    url: '/product-history',
    icon: Package,
  },
  {
    title: 'Stores',
    url: '/store',
    icon: Package,
  },
  {
    title: 'Users',
    url: '/users',
    icon: Users,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <SidebarHeader className="border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary dark:bg-primary">
            <TrendingUp className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold dark:text-gray-100">
              Admin Dashboard
            </span>
            <span className="truncate text-xs text-muted-foreground dark:text-gray-400">
              Veeqo Style
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className={cn(
                      'w-full justify-start gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      pathname === item.url
                        ? 'bg-gray-950 text-primary-foreground dark:bg-gray-950 dark:text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100'
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span>All systems operational</span>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
