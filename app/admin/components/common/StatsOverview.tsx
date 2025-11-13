"use client";

import { motion } from "motion/react";
import { Package, Users, FileText, ShoppingCart } from "lucide-react";

import { Skeleton } from "@/components/ui/Skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  isLoading?: boolean;
}

export function StatCard({
  title,
  value,
  icon,
  change,
  isLoading = false,
}: StatCardProps) {
  if (isLoading) {
    return (
      <Card className="bg-white shadow-md rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            {title}
          </CardTitle>
          <Skeleton className="w-6 h-6 rounded-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-24 rounded" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-md rounded-xl hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-800">{value}</div>
        {change && <p className="text-xs text-green-500 mt-1">{change}</p>}
      </CardContent>
    </Card>
  );
}

export function StatsOverview() {
  // Здесь в реальном приложении будут данные из API
  const stats = [
    {
      id: "products",
      title: "Всего продуктов",
      value: "142",
      icon: <Package className="w-6 h-6 text-blue-500" />,
      change: "+12% за месяц",
    },
    {
      id: "categories",
      title: "Категорий",
      value: "8",
      icon: <Package className="w-6 h-6 text-green-500" />,
      change: "+2 за месяц",
    },
    {
      id: "users",
      title: "Активных пользователей",
      value: "24",
      icon: <Users className="w-6 h-6 text-purple-500" />,
      change: "+3 за неделю",
    },
    {
      id: "orders",
      title: "Заявок",
      value: "18",
      icon: <ShoppingCart className="w-6 h-6 text-orange-500" />,
      change: "+5 за день",
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Статистика</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                change={stat.change}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
