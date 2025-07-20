"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { PieChart, BarChart3, TrendingUp, TrendingDown, Calendar, Download, Menu, RefreshCw } from "lucide-react"

interface AnalyticsPageProps {
  onToggleSidebar: () => void
  sidebarCollapsed: boolean
}

const mockAnalytics = {
  overview: {
    totalRevenue: "₹12.4L",
    revenueChange: "+15.3%",
    totalProducts: "2,847",
    productsChange: "+8.2%",
    avgProfit: "23.8%",
    profitChange: "-2.1%",
    activeChannels: "12",
    channelsChange: "+3",
  },
  topCategories: [
    { name: "Electronics", revenue: "₹4.2L", percentage: 34, growth: "+18%" },
    { name: "Computers", revenue: "₹2.8L", percentage: 23, growth: "+12%" },
    { name: "Audio", revenue: "₹1.9L", percentage: 15, growth: "+25%" },
    { name: "Gaming", revenue: "₹1.5L", percentage: 12, growth: "+8%" },
    { name: "Accessories", revenue: "₹1.2L", percentage: 10, growth: "+15%" },
    { name: "Others", revenue: "₹0.8L", percentage: 6, growth: "+5%" },
  ],
  topProducts: [
    { name: "iPhone 15 Pro Max", revenue: "₹8.9L", units: 89, profit: "₹3.1L" },
    { name: "MacBook Air M3", revenue: "₹5.7L", units: 50, profit: "₹1.0L" },
    { name: "Samsung Galaxy S24", revenue: "₹4.2L", units: 47, profit: "₹0.5L" },
    { name: "AirPods Pro", revenue: "₹2.5L", units: 100, profit: "₹0.2L" },
    { name: "Gaming Keyboard", revenue: "₹1.8L", units: 200, profit: "₹0.3L" },
  ],
  channelPerformance: [
    { name: "Electronics Deals India", products: 247, revenue: "₹3.2L", conversion: "12.5%" },
    { name: "Tech Wholesale Mumbai", products: 89, revenue: "₹2.1L", conversion: "18.7%" },
    { name: "Gaming Accessories Hub", products: 156, revenue: "₹1.8L", conversion: "8.9%" },
    { name: "Audio Equipment Traders", products: 67, revenue: "₹1.3L", conversion: "15.2%" },
    { name: "Mobile Phone Wholesale", products: 342, revenue: "₹2.8L", conversion: "6.8%" },
  ],
}

export function AnalyticsPage({ onToggleSidebar, sidebarCollapsed }: AnalyticsPageProps) {
  const [timeRange, setTimeRange] = useState("30d")
  const [viewType, setViewType] = useState("overview")

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="h-8 w-8 hover:bg-accent/50 hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <Menu className="h-4 w-4" />
        </Button>
        <div className="h-4 w-px bg-border/40 mx-2" />
        <h1 className="text-lg font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
          Analytics
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </header>

      <div className="flex-1 space-y-6 p-6">
        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalytics.overview.totalRevenue}</div>
              <div className="flex items-center text-xs text-green-500">
                <TrendingUp className="h-3 w-3 mr-1" />
                {mockAnalytics.overview.revenueChange} from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalytics.overview.totalProducts}</div>
              <div className="flex items-center text-xs text-green-500">
                <TrendingUp className="h-3 w-3 mr-1" />
                {mockAnalytics.overview.productsChange} from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Profit Margin</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalytics.overview.avgProfit}</div>
              <div className="flex items-center text-xs text-red-500">
                <TrendingDown className="h-3 w-3 mr-1" />
                {mockAnalytics.overview.profitChange} from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Channels</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalytics.overview.activeChannels}</div>
              <div className="flex items-center text-xs text-green-500">
                <TrendingUp className="h-3 w-3 mr-1" />
                {mockAnalytics.overview.channelsChange} new this month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Revenue Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">Revenue chart visualization</p>
                  <p className="text-sm text-muted-foreground">Integration with charting library needed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockAnalytics.topCategories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{category.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{category.revenue}</span>
                      <Badge variant="outline" className="text-xs text-green-600">
                        {category.growth}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                  <div className="text-xs text-muted-foreground text-right">
                    {category.percentage}% of total revenue
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalytics.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="space-y-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.units} units sold</p>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="font-bold">{product.revenue}</div>
                    <div className="text-sm text-green-600">Profit: {product.profit}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Channel Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Channel Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalytics.channelPerformance.map((channel, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="space-y-1">
                    <h3 className="font-medium">{channel.name}</h3>
                    <p className="text-sm text-muted-foreground">{channel.products} products tracked</p>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="font-bold">{channel.revenue}</div>
                    <div className="text-sm text-blue-600">Conversion: {channel.conversion}</div>
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
