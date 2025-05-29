'use client';

import { DashboardCharts } from '@/components/dashboard/dashboard-charts';
import { RecentOrders } from '@/components/dashboard/recent-orders';
import { StatsCards } from '@/components/dashboard/stats-cards';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getDashboardStats } from '@/lib/api/dashboard';
import { useQuery } from '@tanstack/react-query';

export default function DashboardPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight dark:text-white">
          Dashboard
        </h1>
        <p className="text-muted-foreground dark:text-gray-400">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      <StatsCards stats={stats} isLoading={isLoading} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 dark:bg-gray-900 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="dark:text-white">Revenue Overview</CardTitle>
            <CardDescription className="dark:text-gray-400">
              Your revenue performance over the last 12 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardCharts />
          </CardContent>
        </Card>

        <Card className="col-span-3 dark:bg-gray-900 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="dark:text-white">Recent Orders</CardTitle>
            <CardDescription className="dark:text-gray-400">
              Latest orders from your customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentOrders />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
