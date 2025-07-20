"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Star, Search, ExternalLink, Trash2, Menu, TrendingUp, Package } from "lucide-react"

interface FavoritesPageProps {
  onToggleSidebar: () => void
  sidebarCollapsed: boolean
}

const mockFavorites = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: "₹99,900",
    originalPrice: "₹1,34,900",
    discount: "26%",
    category: "Electronics",
    seller: "Apple Store",
    rating: 4.8,
    reviews: 1247,
    image: "/placeholder.svg?height=80&width=80",
    profit: "₹35,000",
    margin: "35%",
    status: "trending",
    addedDate: "2 days ago",
    type: "product",
  },
  {
    id: 2,
    name: "TechMart Electronics",
    location: "Mumbai, India",
    category: "Electronics",
    rating: 4.8,
    products: 1247,
    avgPrice: "₹25,000",
    reliability: "High",
    addedDate: "1 week ago",
    type: "supplier",
  },
  {
    id: 3,
    name: "Gaming Accessories Trend",
    description: "Market analysis for gaming peripherals showing strong demand",
    tags: ["Gaming", "Trend", "Accessories"],
    priority: "High",
    addedDate: "3 days ago",
    type: "note",
  },
  {
    id: 4,
    name: "Bluetooth Speakers Search",
    query: "bluetooth speaker",
    priceRange: "₹4,000-₹16,000",
    results: 24,
    lastRun: "2 hours ago",
    addedDate: "1 week ago",
    type: "search",
  },
  {
    id: 5,
    name: "MacBook Air M3",
    price: "₹1,14,900",
    originalPrice: "₹1,34,900",
    discount: "15%",
    category: "Computers",
    seller: "Apple Authorized",
    rating: 4.9,
    reviews: 892,
    image: "/placeholder.svg?height=80&width=80",
    profit: "₹20,000",
    margin: "17%",
    status: "hot",
    addedDate: "5 days ago",
    type: "product",
  },
  {
    id: 6,
    name: "Audio World",
    location: "Bangalore, India",
    category: "Audio",
    rating: 4.9,
    products: 456,
    avgPrice: "₹12,000",
    reliability: "High",
    addedDate: "2 weeks ago",
    type: "supplier",
  },
]

export function FavoritesPage({ onToggleSidebar, sidebarCollapsed }: FavoritesPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredFavorites = mockFavorites.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || item.type === typeFilter
    const matchesCategory =
      categoryFilter === "all" ||
      (item.type === "product" && "category" in item && item.category === categoryFilter) ||
      (item.type === "supplier" && "category" in item && item.category === categoryFilter)

    return matchesSearch && matchesType && matchesCategory
  })

  const types = ["all", ...new Set(mockFavorites.map((item) => item.type))]
  const categories = [
    "all",
    ...new Set(mockFavorites.filter((item) => "category" in item).map((item) => (item as any).category)),
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "product":
        return Package
      case "supplier":
        return TrendingUp
      case "note":
        return Star
      case "search":
        return Search
      default:
        return Heart
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "product":
        return "default"
      case "supplier":
        return "secondary"
      case "note":
        return "outline"
      case "search":
        return "destructive"
      default:
        return "outline"
    }
  }

  const removeFavorite = (id: number) => {
    console.log("Remove favorite:", id)
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
          Favorites
        </h1>
      </header>

      <div className="flex-1 space-y-4 p-4">
        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search favorites..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Favorites Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredFavorites.map((item) => {
            const Icon = getTypeIcon(item.type)
            return (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={getTypeColor(item.type)} className="text-xs">
                          {item.type}
                        </Badge>
                        {item.type === "product" && "status" in item && (
                          <Badge variant="outline" className="text-xs">
                            {(item as any).status}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFavorite(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Product Details */}
                  {item.type === "product" && "price" in item && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-600">{item.price}</span>
                        <span className="text-sm text-muted-foreground line-through">
                          {(item as any).originalPrice}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Profit</span>
                        <span className="text-sm font-medium text-blue-600">
                          {(item as any).profit} ({(item as any).margin})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Seller</span>
                        <span className="text-sm">{(item as any).seller}</span>
                      </div>
                    </>
                  )}

                  {/* Supplier Details */}
                  {item.type === "supplier" && "location" in item && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Location</span>
                        <span className="text-sm">{(item as any).location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Products</span>
                        <span className="text-sm font-medium">{(item as any).products}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Rating</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{(item as any).rating}</span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Note Details */}
                  {item.type === "note" && "description" in item && (
                    <>
                      <p className="text-sm text-muted-foreground">{(item as any).description}</p>
                      {"tags" in item && (
                        <div className="flex flex-wrap gap-1">
                          {((item as any).tags as string[]).map((tag: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  {/* Search Details */}
                  {item.type === "search" && "query" in item && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Query</span>
                        <span className="text-sm font-mono">{(item as any).query}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Results</span>
                        <span className="text-sm font-medium">{(item as any).results}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Last Run</span>
                        <span className="text-sm">{(item as any).lastRun}</span>
                      </div>
                    </>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-xs text-muted-foreground">Added {item.addedDate}</span>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-3 w-3 mr-2" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredFavorites.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <Heart className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No favorites found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Add items to your favorites or adjust your search criteria.
            </p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{mockFavorites.length}</div>
              <div className="text-sm text-muted-foreground">Total Favorites</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {mockFavorites.filter((f) => f.type === "product").length}
              </div>
              <div className="text-sm text-muted-foreground">Products</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {mockFavorites.filter((f) => f.type === "supplier").length}
              </div>
              <div className="text-sm text-muted-foreground">Suppliers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{types.length - 1}</div>
              <div className="text-sm text-muted-foreground">Types</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
