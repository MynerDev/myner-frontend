"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Activity, TrendingUp, TrendingDown, Plus, Search, Filter, Menu, RefreshCw, Eye } from "lucide-react"

interface RecentActivityPageProps {
  onToggleSidebar: () => void
  sidebarCollapsed: boolean
}

const mockActivities = [
  {
    id: 1,
    type: "product_added",
    title: "New product added",
    description: "iPhone 15 Pro Max added to tracking",
    details: "Price: ₹99,900 | Profit: ₹35,000 | Margin: 35%",
    timestamp: "2 minutes ago",
    status: "success",
    category: "Products",
  },
  {
    id: 2,
    type: "price_alert",
    title: "Price drop alert",
    description: "MacBook Air M3 price dropped by 15%",
    details: "From ₹1,34,900 to ₹1,14,900 | Potential profit increased",
    timestamp: "15 minutes ago",
    status: "warning",
    category: "Alerts",
  },
  {
    id: 3,
    type: "contact_extracted",
    title: "New contact extracted",
    description: "Rajesh Kumar from TechMart Electronics",
    details: "Phone: +91 98765 43210 | Email: rajesh@techmart.com",
    timestamp: "1 hour ago",
    status: "info",
    category: "Contacts",
  },
  {
    id: 4,
    type: "profit_calculated",
    title: "Profit estimation completed",
    description: "Samsung Galaxy S24 profit analysis",
    details: "Estimated profit: ₹10,000 | Margin: 11% | Status: Good",
    timestamp: "2 hours ago",
    status: "success",
    category: "Analysis",
  },
  {
    id: 5,
    type: "source_added",
    title: "New source added",
    description: "Audio World supplier added to tracking",
    details: "Location: Bangalore | Rating: 4.9/5 | Products: 456",
    timestamp: "3 hours ago",
    status: "success",
    category: "Sources",
  },
  {
    id: 6,
    type: "note_created",
    title: "Smart note created",
    description: "Market trend analysis for gaming accessories",
    details: "Tags: Gaming, Trend, Accessories | Priority: Medium",
    timestamp: "4 hours ago",
    status: "info",
    category: "Notes",
  },
  {
    id: 7,
    type: "auto_tag_applied",
    title: "Auto-tagging completed",
    description: "247 products tagged with 'High Value' rule",
    details: "Rule: price > ₹50,000 AND category = Electronics",
    timestamp: "6 hours ago",
    status: "success",
    category: "Automation",
  },
  {
    id: 8,
    type: "search_saved",
    title: "Search query saved",
    description: "Bluetooth speakers search saved for monitoring",
    details: "Query: bluetooth speaker | Price range: ₹4,000-₹16,000",
    timestamp: "1 day ago",
    status: "info",
    category: "Searches",
  },
]

export function RecentActivityPage({ onToggleSidebar, sidebarCollapsed }: RecentActivityPageProps) {
  const [filterCategory, setFilterCategory] = useState("All Categories")
  const [filterStatus, setFilterStatus] = useState("All Status")

  const filteredActivities = mockActivities.filter((activity) => {
    const matchesCategory = filterCategory === "All Categories" || activity.category === filterCategory
    const matchesStatus = filterStatus === "All Status" || activity.status === filterStatus
    return matchesCategory && matchesStatus
  })

  const categories = [...new Set(mockActivities.map((a) => a.category))]
  const statuses = [...new Set(mockActivities.map((a) => a.status))]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "default"
      case "warning":
        return "secondary"
      case "info":
        return "outline"
      case "error":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "product_added":
        return Plus
      case "price_alert":
        return TrendingDown
      case "contact_extracted":
        return Search
      case "profit_calculated":
        return TrendingUp
      case "source_added":
        return Plus
      case "note_created":
        return Plus
      case "auto_tag_applied":
        return Activity
      case "search_saved":
        return Search
      default:
        return Activity
    }
  }

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
          Recent Activity
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </header>

      <div className="flex-1 space-y-4 p-4">
        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Categories">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Status">All Status</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Activity Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredActivities.map((activity) => {
                const Icon = getActivityIcon(activity.type)
                return (
                  <div
                    key={activity.id}
                    className="flex gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{activity.title}</h3>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusColor(activity.status)} className="text-xs">
                            {activity.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {activity.category}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">{activity.details}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{activity.timestamp}</span>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-3 w-3 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {filteredActivities.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <Activity className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No activities found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Try adjusting your filters or check back later for new activities.
            </p>
          </div>
        )}

        {/* Activity Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{mockActivities.length}</div>
              <div className="text-sm text-muted-foreground">Total Activities</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {mockActivities.filter((a) => a.status === "success").length}
              </div>
              <div className="text-sm text-muted-foreground">Successful</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {mockActivities.filter((a) => a.status === "warning").length}
              </div>
              <div className="text-sm text-muted-foreground">Warnings</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
