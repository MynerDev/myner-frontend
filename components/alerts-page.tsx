"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Bell, AlertTriangle, TrendingDown, TrendingUp, Plus, Settings, Menu, Trash2, Edit } from "lucide-react"

interface AlertsPageProps {
  onToggleSidebar: () => void
  sidebarCollapsed: boolean
}

const mockAlerts = [
  {
    id: 1,
    title: "iPhone 15 Pro Max Price Drop",
    description: "Price dropped from ₹1,34,900 to ₹99,900 (26% off)",
    type: "price_drop",
    priority: "high",
    product: "iPhone 15 Pro Max",
    threshold: "₹1,00,000",
    currentValue: "₹99,900",
    triggered: "2 hours ago",
    active: true,
    read: false,
  },
  {
    id: 2,
    title: "Low Stock Alert - MacBook Air M3",
    description: "Only 3 units left in stock at Apple Authorized",
    type: "stock_low",
    priority: "medium",
    product: "MacBook Air M3",
    threshold: "5 units",
    currentValue: "3 units",
    triggered: "4 hours ago",
    active: true,
    read: false,
  },
  {
    id: 3,
    title: "High Profit Margin Opportunity",
    description: "Samsung Galaxy S24 showing 25% profit margin",
    type: "profit_high",
    priority: "medium",
    product: "Samsung Galaxy S24",
    threshold: "20%",
    currentValue: "25%",
    triggered: "1 day ago",
    active: true,
    read: true,
  },
  {
    id: 4,
    title: "New Competitor Price",
    description: "Competitor offering AirPods Pro at ₹22,900",
    type: "competitor",
    priority: "low",
    product: "AirPods Pro (2nd Gen)",
    threshold: "₹24,000",
    currentValue: "₹22,900",
    triggered: "2 days ago",
    active: true,
    read: true,
  },
  {
    id: 5,
    title: "Supplier Rating Drop",
    description: "TechMart Electronics rating dropped to 4.2/5",
    type: "supplier_rating",
    priority: "medium",
    product: "TechMart Electronics",
    threshold: "4.5/5",
    currentValue: "4.2/5",
    triggered: "3 days ago",
    active: false,
    read: true,
  },
]

const alertTypes = [
  { value: "price_drop", label: "Price Drop", icon: TrendingDown },
  { value: "stock_low", label: "Low Stock", icon: AlertTriangle },
  { value: "profit_high", label: "High Profit", icon: TrendingUp },
  { value: "competitor", label: "Competitor", icon: Bell },
  { value: "supplier_rating", label: "Supplier Rating", icon: AlertTriangle },
]

export function AlertsPage({ onToggleSidebar, sidebarCollapsed }: AlertsPageProps) {
  const [typeFilter, setTypeFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [showRead, setShowRead] = useState(true)

  const filteredAlerts = mockAlerts.filter((alert) => {
    const matchesType = typeFilter === "all" || alert.type === typeFilter
    const matchesPriority = priorityFilter === "all" || alert.priority === priorityFilter
    const matchesRead = showRead || !alert.read

    return matchesType && matchesPriority && matchesRead
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getTypeIcon = (type: string) => {
    const alertType = alertTypes.find((t) => t.value === type)
    return alertType ? alertType.icon : Bell
  }

  const markAsRead = (alertId: number) => {
    console.log("Mark as read:", alertId)
  }

  const toggleAlert = (alertId: number) => {
    console.log("Toggle alert:", alertId)
  }

  const deleteAlert = (alertId: number) => {
    console.log("Delete alert:", alertId)
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
        <h1 className="text-lg font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">Alerts</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Alert
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </header>

      <div className="flex-1 space-y-4 p-4">
        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {alertTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Switch checked={showRead} onCheckedChange={setShowRead} id="show-read" />
                <label htmlFor="show-read" className="text-sm">
                  Show read alerts
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => {
            const Icon = getTypeIcon(alert.type)
            return (
              <Card
                key={alert.id}
                className={`hover:shadow-md transition-shadow ${!alert.read ? "border-l-4 border-l-primary" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          alert.priority === "high"
                            ? "bg-red-100 text-red-600"
                            : alert.priority === "medium"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className={`font-medium ${!alert.read ? "font-semibold" : ""}`}>{alert.title}</h3>
                          <p className="text-sm text-muted-foreground">{alert.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getPriorityColor(alert.priority)} className="text-xs">
                            {alert.priority}
                          </Badge>
                          <Badge variant={alert.active ? "default" : "outline"} className="text-xs">
                            {alert.active ? "Active" : "Inactive"}
                          </Badge>
                          {!alert.read && (
                            <Badge variant="secondary" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Product:</span>
                          <div className="font-medium">{alert.product}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Threshold:</span>
                          <div className="font-medium">{alert.threshold}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Current:</span>
                          <div className="font-medium text-primary">{alert.currentValue}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-xs text-muted-foreground">Triggered {alert.triggered}</span>
                        <div className="flex gap-2">
                          {!alert.read && (
                            <Button size="sm" variant="outline" onClick={() => markAsRead(alert.id)}>
                              Mark as Read
                            </Button>
                          )}
                          <Button size="sm" variant="outline" onClick={() => toggleAlert(alert.id)}>
                            {alert.active ? "Disable" : "Enable"}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => deleteAlert(alert.id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No alerts found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Create new alerts or adjust your filters to see notifications.
            </p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{mockAlerts.length}</div>
              <div className="text-sm text-muted-foreground">Total Alerts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{mockAlerts.filter((a) => !a.read).length}</div>
              <div className="text-sm text-muted-foreground">Unread</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{mockAlerts.filter((a) => a.active).length}</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {mockAlerts.filter((a) => a.priority === "high").length}
              </div>
              <div className="text-sm text-muted-foreground">High Priority</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
