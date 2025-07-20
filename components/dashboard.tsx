"use client"

import { useState } from "react"
import { Menu, TrendingUp, Users, Package, DollarSign, Search, Filter, Eye, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ProductDetailsModal } from "@/components/product-details-modal"

interface DashboardProps {
  onToggleSidebar: () => void
  sidebarCollapsed: boolean
}

interface Product {
  id: number
  name: string
  price: string
  originalPrice: string
  discount: string
  category: string
  seller: string
  rating: number
  reviews: number
  image: string
  profit: string
  margin: string
  status: string
  lastUpdated: string
  contact: {
    phone: string
    whatsapp: string
  }
  description?: string
}

const trendingProducts: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Earbuds",
    price: "₹1,299",
    originalPrice: "₹2,499",
    discount: "48%",
    category: "Electronics",
    seller: "TechDeals",
    rating: 4.5,
    reviews: 1234,
    image: "/placeholder.svg?height=200&width=200",
    profit: "₹800",
    margin: "38%",
    status: "trending",
    lastUpdated: "2 hours ago",
    contact: {
      phone: "9876543210",
      whatsapp: "https://wa.me/919876543210",
    },
    description: "High-quality wireless earbuds with noise cancellation and long battery life.",
  },
  {
    id: 2,
    name: "Designer Cotton T-Shirts",
    price: "₹299",
    originalPrice: "₹799",
    discount: "63%",
    category: "Fashion",
    seller: "StyleHub",
    rating: 4.2,
    reviews: 856,
    image: "/placeholder.svg?height=200&width=200",
    profit: "₹150",
    margin: "33%",
    status: "hot",
    lastUpdated: "4 hours ago",
    contact: {
      phone: "9876543211",
      whatsapp: "https://wa.me/919876543211",
    },
    description: "Premium cotton t-shirts available in multiple colors and sizes.",
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    price: "₹2,199",
    originalPrice: "₹4,999",
    discount: "56%",
    category: "Electronics",
    seller: "FitTech",
    rating: 4.7,
    reviews: 2341,
    image: "/placeholder.svg?height=200&width=200",
    profit: "₹1,200",
    margin: "35%",
    status: "new",
    lastUpdated: "1 hour ago",
    contact: {
      phone: "9876543212",
      whatsapp: "https://wa.me/919876543212",
    },
    description: "Advanced fitness tracking with heart rate monitoring and GPS.",
  },
  {
    id: 4,
    name: "Leather Handbags Collection",
    price: "₹899",
    originalPrice: "₹1,999",
    discount: "55%",
    category: "Fashion",
    seller: "LuxeBags",
    rating: 4.3,
    reviews: 567,
    image: "/placeholder.svg?height=200&width=200",
    profit: "₹400",
    margin: "31%",
    status: "trending",
    lastUpdated: "3 hours ago",
    contact: {
      phone: "9876543213",
      whatsapp: "https://wa.me/919876543213",
    },
    description: "Genuine leather handbags in various styles and colors.",
  },
]

export function Dashboard({ onToggleSidebar, sidebarCollapsed }: DashboardProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showProductModal, setShowProductModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const openProductModal = (product: Product) => {
    setSelectedProduct(product)
    setShowProductModal(true)
  }

  const stats = [
    {
      title: "Total Products Tracked",
      value: "12,847",
      change: "+12.5%",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Active Channels",
      value: "156",
      change: "+3.2%",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Potential Profit",
      value: "₹2,45,680",
      change: "+18.7%",
      icon: DollarSign,
      color: "text-purple-600",
    },
    {
      title: "Trending Products",
      value: "89",
      change: "+25.1%",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border/40 bg-card/50">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onToggleSidebar}>
            <Menu className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back! Here's your business overview</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Quick search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trending Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Trending Products
            </CardTitle>
            <CardDescription>Hot products with high profit potential from your tracked channels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {trendingProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge
                        variant={
                          product.status === "trending"
                            ? "default"
                            : product.status === "hot"
                              ? "destructive"
                              : product.status === "new"
                                ? "secondary"
                                : "outline"
                        }
                      >
                        {product.status}
                      </Badge>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {product.category} • {product.seller}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-green-600">{product.price}</div>
                        <div className="text-xs text-muted-foreground line-through">{product.originalPrice}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {product.discount} OFF
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Profit: {product.profit}</span>
                      <span className="text-green-600 font-medium">{product.margin}</span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                      onClick={() => openProductModal(product)}
                    >
                      <Eye className="h-3 w-3 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-base">Quick Search</CardTitle>
              <CardDescription>Find products across all channels</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Search Products
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-base">Profit Calculator</CardTitle>
              <CardDescription>Calculate potential profits</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-transparent" variant="outline">
                <DollarSign className="h-4 w-4 mr-2" />
                Calculate Profit
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-base">Channel Manager</CardTitle>
              <CardDescription>Manage your tracked channels</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-transparent" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Manage Channels
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          isOpen={showProductModal}
          onClose={() => {
            setShowProductModal(false)
            setSelectedProduct(null)
          }}
        />
      )}
    </div>
  )
}
