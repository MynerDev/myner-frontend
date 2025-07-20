"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, ExternalLink, Menu, MapPin, Clock, Star } from "lucide-react"

interface SourcingTrackerPageProps {
  onToggleSidebar: () => void
  sidebarCollapsed: boolean
}

const mockSources = [
  {
    id: 1,
    name: "TechMart Electronics",
    location: "Mumbai, India",
    category: "Electronics",
    rating: 4.8,
    products: 1247,
    avgPrice: "₹25,000",
    reliability: "High",
    lastContact: "2 days ago",
    status: "active",
  },
  {
    id: 2,
    name: "Digital Hub Store",
    location: "Delhi, India",
    category: "Computers",
    rating: 4.6,
    products: 892,
    avgPrice: "₹45,000",
    reliability: "Medium",
    lastContact: "1 week ago",
    status: "pending",
  },
  {
    id: 3,
    name: "Audio World",
    location: "Bangalore, India",
    category: "Audio",
    rating: 4.9,
    products: 456,
    avgPrice: "₹12,000",
    reliability: "High",
    lastContact: "3 days ago",
    status: "active",
  },
  {
    id: 4,
    name: "Mobile Galaxy",
    location: "Chennai, India",
    category: "Electronics",
    rating: 4.3,
    products: 2134,
    avgPrice: "₹35,000",
    reliability: "Low",
    lastContact: "2 weeks ago",
    status: "inactive",
  },
]

export function SourcingTrackerPage({ onToggleSidebar, sidebarCollapsed }: SourcingTrackerPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredSources = mockSources.filter((source) => {
    const matchesSearch =
      source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      source.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || source.category === categoryFilter
    const matchesStatus = statusFilter === "all" || source.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "pending":
        return "secondary"
      case "inactive":
        return "outline"
      default:
        return "outline"
    }
  }

  const getReliabilityColor = (reliability: string) => {
    switch (reliability) {
      case "High":
        return "text-green-600"
      case "Medium":
        return "text-yellow-600"
      case "Low":
        return "text-red-600"
      default:
        return "text-gray-600"
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
          Sourcing Tracker
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Source
          </Button>
        </div>
      </header>

      <div className="flex-1 space-y-4 p-4">
        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search sources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Computers">Computers</SelectItem>
                  <SelectItem value="Audio">Audio</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Sources Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSources.map((source) => (
            <Card key={source.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{source.name}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      {source.location}
                    </div>
                  </div>
                  <Badge variant={getStatusColor(source.status)}>{source.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Category</span>
                  <Badge variant="outline">{source.category}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{source.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Products</span>
                  <span className="text-sm font-medium">{source.products.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg Price</span>
                  <span className="text-sm font-medium">{source.avgPrice}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Reliability</span>
                  <span className={`text-sm font-medium ${getReliabilityColor(source.reliability)}`}>
                    {source.reliability}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Contact</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">{source.lastContact}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Visit
                  </Button>
                  <Button size="sm" variant="outline">
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSources.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No sources found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Try adjusting your search criteria or add new sources to track.
            </p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {mockSources.filter((s) => s.status === "active").length}
              </div>
              <div className="text-sm text-muted-foreground">Active Sources</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {mockSources.reduce((sum, s) => sum + s.products, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Products</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {(mockSources.reduce((sum, s) => sum + s.rating, 0) / mockSources.length).toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {mockSources.filter((s) => s.reliability === "High").length}
              </div>
              <div className="text-sm text-muted-foreground">High Reliability</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
