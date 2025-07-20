"use client"

import { useState } from "react"
import { Menu, TrendingUp, DollarSign, Package, Users, BarChart3, PieChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface BusinessOverviewPageProps {
  onToggleSidebar: () => void
  sidebarCollapsed: boolean
}

export function BusinessOverviewPage({ onToggleSidebar, sidebarCollapsed }: BusinessOverviewPageProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const overviewStats = [
    {
      title: "Total Revenue",
      value: formatCurrency(1245680),
      change: "+18.2%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Products Sold",
      value: "3,247",
      change: "+12.5%",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Active Customers",
      value: "892",
      change: "+8.7%",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Profit Margin",
      value: "34.2%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  const monthlyTargets = [
    { name: "Revenue Target", current: 1245680, target: 1500000, percentage: 83 },
    { name: "Sales Target", current: 3247, target: 4000, percentage: 81 },
    { name: "Customer Target", current: 892, target: 1000, percentage: 89 },
    { name: "Profit Target", current: 425000, target: 500000, percentage: 85 },
  ]

  const topCategories = [
    { name: "Electronics", revenue: formatCurrency(456780), percentage: 37, growth: "+15%" },
    { name: "Fashion", revenue: formatCurrency(342150), percentage: 27, growth: "+22%" },
    { name: "Home & Kitchen", revenue: formatCurrency(234560), percentage: 19, growth: "+8%" },
    { name: "Sports", revenue: formatCurrency(156890), percentage: 13, growth: "+31%" },
    { name: "Others", revenue: formatCurrency(55300), percentage: 4, growth: "+5%" },
  ]

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Rajesh Kumar",
      amount: formatCurrency(12450),
      status: "Completed",
      date: "2 hours ago",
    },
    {
      id: "ORD-002",
      customer: "Priya Sharma",
      amount: formatCurrency(8900),
      status: "Processing",
      date: "4 hours ago",
    },
    { id: "ORD-003", customer: "Amit Patel", amount: formatCurrency(15600), status: "Shipped", date: "6 hours ago" },
    { id: "ORD-004", customer: "Sneha Gupta", amount: formatCurrency(7800), status: "Completed", date: "8 hours ago" },
    { id: "ORD-005", customer: "Vikram Singh", amount: formatCurrency(22100), status: "Processing", date: "1 day ago" },
  ]

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border/40 bg-card/50">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onToggleSidebar}>
            <Menu className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold">Business Overview</h1>
            <p className="text-sm text-muted-foreground">Track your business performance and metrics</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="quarter">Quarter</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last {selectedPeriod}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Targets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Monthly Targets
              </CardTitle>
              <CardDescription>Progress towards your monthly business goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {monthlyTargets.map((target, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{target.name}</span>
                    <span className="text-muted-foreground">{target.percentage}%</span>
                  </div>
                  <Progress value={target.percentage} className="h-2" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {typeof target.current === "number" && target.current > 10000
                        ? formatCurrency(target.current)
                        : target.current.toLocaleString()}
                    </span>
                    <span>
                      Target:{" "}
                      {typeof target.target === "number" && target.target > 10000
                        ? formatCurrency(target.target)
                        : target.target.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Top Categories
              </CardTitle>
              <CardDescription>Revenue breakdown by product categories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full bg-primary"
                      style={{
                        backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
                      }}
                    />
                    <div>
                      <div className="font-medium text-sm">{category.name}</div>
                      <div className="text-xs text-muted-foreground">{category.percentage}% of total</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">{category.revenue}</div>
                    <div className="text-xs text-green-600">{category.growth}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Recent Orders
            </CardTitle>
            <CardDescription>Latest customer orders and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium text-sm">{order.id}</div>
                      <div className="text-xs text-muted-foreground">{order.customer}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium text-sm">{order.amount}</div>
                      <div className="text-xs text-muted-foreground">{order.date}</div>
                    </div>
                    <Badge
                      variant={
                        order.status === "Completed"
                          ? "default"
                          : order.status === "Processing"
                            ? "secondary"
                            : order.status === "Shipped"
                              ? "outline"
                              : "destructive"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
