"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Menu,
  Search,
  Filter,
  Phone,
  MessageCircle,
  Eye,
  X,
  ChevronDown,
  Clock,
  MessageSquare,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ProductDetailsModal } from "@/components/product-details-modal"
import { toast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { apiGet } from "@/services/apiService"

interface SearchPageProps {
  onToggleSidebar: () => void
  sidebarCollapsed: boolean
}

interface Product {
  id: string
  name: string
  price: number
  min_quantity: number
  channel: string
  contact: {
    phone: string
    whatsapp: string
  }
  posted_at: string
  category: string
  image?: string
  description?: string
}

interface SearchFilters {
  priceMin: string
  priceMax: string
  minQuantity: string
  categories: string[]
  channels: string[]
}

// Dummy data for fallback
const dummyProducts: Product[] = [
  {
    id: "p001",
    name: "Premium Cotton T-Shirts (Bulk Pack)",
    price: 299,
    min_quantity: 50,
    channel: "MegaClothDeals",
    contact: {
      phone: "9876543210",
      whatsapp: "https://wa.me/919876543210",
    },
    posted_at: "2025-07-03T10:00:00Z",
    category: "Clothing",
    image: "/placeholder.svg?height=200&width=200",
    description:
      "High-quality cotton t-shirts available in multiple colors and sizes. Perfect for retail business with excellent profit margins.",
  },
  {
    id: "p002",
    name: "Wireless Bluetooth Earbuds - Wholesale",
    price: 899,
    min_quantity: 25,
    channel: "TechWholesale",
    contact: {
      phone: "9876543211",
      whatsapp: "https://wa.me/919876543211",
    },
    posted_at: "2025-07-03T09:30:00Z",
    category: "Electronics",
    image: "/placeholder.svg?height=200&width=200",
    description:
      "Latest wireless earbuds with noise cancellation and 24-hour battery life. High demand product with 40% profit margin.",
  },
  {
    id: "p003",
    name: "Designer Handbags Collection (Mixed)",
    price: 1299,
    min_quantity: 12,
    channel: "FashionHub",
    contact: {
      phone: "9876543212",
      whatsapp: "https://wa.me/919876543212",
    },
    posted_at: "2025-07-03T08:45:00Z",
    category: "Fashion",
    image: "/placeholder.svg?height=200&width=200",
    description:
      "Trendy designer handbags in various styles and colors. High-quality materials with premium finishing.",
  },
  {
    id: "p004",
    name: "Sports Shoes - Running Collection (Assorted)",
    price: 1899,
    min_quantity: 20,
    channel: "SportsGear",
    contact: {
      phone: "9876543213",
      whatsapp: "https://wa.me/919876543213",
    },
    posted_at: "2025-07-03T07:20:00Z",
    category: "Sports",
    image: "/placeholder.svg?height=200&width=200",
    description:
      "Professional running shoes with advanced cushioning technology. Popular brand replicas with excellent build quality.",
  },
  {
    id: "p005",
    name: "Kitchen Appliances Set (3-in-1)",
    price: 3499,
    min_quantity: 8,
    channel: "HomeEssentials",
    contact: {
      phone: "9876543214",
      whatsapp: "https://wa.me/919876543214",
    },
    posted_at: "2025-07-03T06:15:00Z",
    category: "Home & Kitchen",
    image: "/placeholder.svg?height=200&width=200",
    description:
      "Complete kitchen appliances set including mixer, blender, and food processor. High-demand home appliances.",
  },
  {
    id: "p006",
    name: "Mobile Phone Accessories Bundle (50 pcs)",
    price: 199,
    min_quantity: 100,
    channel: "MobileWorld",
    contact: {
      phone: "9876543215",
      whatsapp: "https://wa.me/919876543215",
    },
    posted_at: "2025-07-02T18:30:00Z",
    category: "Electronics",
    image: "/placeholder.svg?height=200&width=200",
    description:
      "Complete mobile accessories bundle with cases, chargers, and screen protectors. Fast-moving inventory items.",
  },
  {
    id: "p007",
    name: "Women's Ethnic Wear Collection",
    price: 799,
    min_quantity: 30,
    channel: "EthnicFashion",
    contact: {
      phone: "9876543216",
      whatsapp: "https://wa.me/919876543216",
    },
    posted_at: "2025-07-02T16:45:00Z",
    category: "Fashion",
    image: "/placeholder.svg?height=200&width=200",
    description:
      "Beautiful ethnic wear collection including kurtis, sarees, and lehengas. Festival season high-demand products.",
  },
  {
    id: "p008",
    name: "LED Smart Bulbs (Pack of 10)",
    price: 2499,
    min_quantity: 15,
    channel: "SmartHome",
    contact: {
      phone: "9876543217",
      whatsapp: "https://wa.me/919876543217",
    },
    posted_at: "2025-07-02T14:20:00Z",
    category: "Electronics",
    image: "/placeholder.svg?height=200&width=200",
    description:
      "WiFi-enabled smart LED bulbs with app control and voice assistant compatibility. Growing smart home market.",
  },
]

const categories = ["Clothing", "Electronics", "Fashion", "Sports", "Home & Kitchen", "Beauty", "Books", "Toys"]
const channels = ["MegaClothDeals", "TechWholesale", "FashionHub", "SportsGear", "HomeEssentials", "MobileWorld"]

export function SearchPage({ onToggleSidebar, sidebarCollapsed }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showProductModal, setShowProductModal] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const [filters, setFilters] = useState<SearchFilters>({
    priceMin: "",
    priceMax: "",
    minQuantity: "",
    categories: [],
    channels: [],
  })

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const searchProducts = async (query: string) => {
    if (!query.trim()) {
      setProducts([])
      setFilteredProducts([])
      setHasSearched(false)
      return
    }

    setLoading(true)
    setHasSearched(true)

    try {
      // Try to call the API
      const response: any = await apiGet(`http://localhost:8000/api/products/search?query=${encodeURIComponent(query)}`);

      console.log("✅ API JSON response:", response);

      if (response.status == 'success') {
        const data = response.data;
        console.log("API response:", data)
        setProducts(data)
        setFilteredProducts(data)
      } else {
        throw new Error("API call failed")
      }
    } catch (error) {
      // Fallback to dummy data
      console.log("API failed, using dummy data. \n Error: ", error)
      const filtered = dummyProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.channel.toLowerCase().includes(query.toLowerCase()),
      )
      setProducts(filtered)
      setFilteredProducts(filtered)

      toast({
        title: "Using offline data",
        description: "API unavailable, showing sample results",
        variant: "default",
      })
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...products]

    // Price range filter
    if (filters.priceMin) {
      filtered = filtered.filter((p) => p.price >= Number.parseInt(filters.priceMin))
    }
    if (filters.priceMax) {
      filtered = filtered.filter((p) => p.price <= Number.parseInt(filters.priceMax))
    }

    // Minimum quantity filter
    if (filters.minQuantity) {
      filtered = filtered.filter((p) => p.min_quantity >= Number.parseInt(filters.minQuantity))
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) => filters.categories.includes(p.category))
    }

    // Channel filter
    if (filters.channels.length > 0) {
      filtered = filtered.filter((p) => filters.channels.includes(p.channel))
    }

    setFilteredProducts(filtered)
  }

  const handleSearch = () => {
    searchProducts(searchQuery)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleFilterChange = (filterType: keyof SearchFilters, value: string | string[]) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked ? [...filters.categories, category] : filters.categories.filter((c) => c !== category)
    handleFilterChange("categories", newCategories)
  }

  const handleChannelChange = (channel: string, checked: boolean) => {
    const newChannels = checked ? [...filters.channels, channel] : filters.channels.filter((c) => c !== channel)
    handleFilterChange("channels", newChannels)
  }

  const clearFilters = () => {
    setFilters({
      priceMin: "",
      priceMax: "",
      minQuantity: "",
      categories: [],
      channels: [],
    })
  }

  const openProductModal = (product: Product) => {
    setSelectedProduct(product)
    setShowProductModal(true)
  }

  const handleContact = (contact: Product["contact"], type: "phone" | "whatsapp") => {
    if (type === "phone") {
      window.open(`tel:${contact.phone}`)
    } else {
      window.open(contact.whatsapp, "_blank")
    }
  }

  // Apply filters whenever filters change
  useEffect(() => {
    applyFilters()
  }, [filters, products])

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border/40 bg-card/50">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onToggleSidebar}>
            <Menu className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold">Product Search</h1>
            <p className="text-sm text-muted-foreground">Discover products from Telegram channels</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {(filters.categories.length > 0 ||
            filters.channels.length > 0 ||
            filters.priceMin ||
            filters.priceMax ||
            filters.minQuantity) && (
              <Badge variant="secondary" className="ml-1">
                {filters.categories.length +
                  filters.channels.length +
                  (filters.priceMin ? 1 : 0) +
                  (filters.priceMax ? 1 : 0) +
                  (filters.minQuantity ? 1 : 0)}
              </Badge>
            )}
        </Button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="w-80 border-r border-border/40 bg-card/30 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Filters</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Price Range (₹)</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Min"
                    type="number"
                    value={filters.priceMin}
                    onChange={(e) => handleFilterChange("priceMin", e.target.value)}
                  />
                  <Input
                    placeholder="Max"
                    type="number"
                    value={filters.priceMax}
                    onChange={(e) => handleFilterChange("priceMax", e.target.value)}
                  />
                </div>
              </div>

              {/* Minimum Quantity */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Minimum Quantity</Label>
                <Input
                  placeholder="e.g., 10"
                  type="number"
                  value={filters.minQuantity}
                  onChange={(e) => handleFilterChange("minQuantity", e.target.value)}
                />
              </div>

              {/* Categories */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium mb-3">
                  Categories
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={filters.categories.includes(category)}
                        onCheckedChange={(checked: any) => handleCategoryChange(category, checked as boolean)}
                      />
                      <Label htmlFor={`category-${category}`} className="text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Channels */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium mb-3">
                  Channels
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2">
                  {channels.map((channel) => (
                    <div key={channel} className="flex items-center space-x-2">
                      <Checkbox
                        id={`channel-${channel}`}
                        checked={filters.channels.includes(channel)}
                        onCheckedChange={(checked: any) => handleChannelChange(channel, checked as boolean)}
                      />
                      <Label htmlFor={`channel-${channel}`} className="text-sm">
                        {channel}
                      </Label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search Bar */}
          <div className="p-6 border-b border-border/40">
            <div className="flex gap-3 max-w-2xl">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for products (e.g., shoes, bags, electronics)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleSearch} disabled={loading}>
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Searching products...</p>
                    <p className="text-sm text-muted-foreground">Scanning channels for the best wholesale deals</p>
                  </div>
                </div>
              </div>
            ) : hasSearched && filteredProducts.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center space-y-4">
                  <Search className="h-16 w-16 text-muted-foreground mx-auto" />
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">No products found</h3>
                    <p className="text-muted-foreground max-w-md">
                      We couldn't find any wholesale products matching your search. Try different keywords or adjust
                      your filters.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("")
                        clearFilters()
                        setHasSearched(false)
                      }}
                    >
                      Clear Search
                    </Button>
                    <Button variant="outline">Browse Categories</Button>
                  </div>
                </div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                {/* Sort and View Options */}
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-muted-foreground">
                    Found {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                  <div className="flex items-center gap-3">
                    <Select defaultValue="newest">
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="quantity">Min Quantity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-border/40 bg-card/50 backdrop-blur-sm"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between mb-3">
                          <Badge variant="outline" className="text-xs font-medium">
                            {product.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{formatTimeAgo(product.posted_at)}</span>
                          </div>
                        </div>

                        <CardTitle className="text-base line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                          {product.name}
                        </CardTitle>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            <span className="font-medium">{product.channel}</span>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Pricing Section */}
                        <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Unit Price</span>
                            <span className="text-xl font-bold text-green-400">{formatPrice(product.price)}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Min. Quantity</span>
                            <span className="text-sm font-semibold">{product.min_quantity} units</span>
                          </div>

                          <Separator className="my-2" />

                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Total Min. Order</span>
                            <span className="text-lg font-bold text-blue-400">
                              {formatPrice(product.price * product.min_quantity)}
                            </span>
                          </div>
                        </div>

                        {/* Contact Section */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-transparent hover:bg-green-500/10 hover:border-green-500/50 hover:text-green-400 transition-all duration-200"
                            onClick={() => handleContact(product.contact, "phone")}
                          >
                            <Phone className="h-3 w-3 mr-2" />
                            Call
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-transparent hover:bg-blue-500/10 hover:border-blue-500/50 hover:text-blue-400 transition-all duration-200"
                            onClick={() => handleContact(product.contact, "whatsapp")}
                          >
                            <MessageCircle className="h-3 w-3 mr-2" />
                            WhatsApp
                          </Button>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            variant="default"
                            size="sm"
                            className="flex-1"
                            onClick={() => openProductModal(product)}
                          >
                            <Eye className="h-3 w-3 mr-2" />
                            View Details
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent hover:bg-yellow-500/10 hover:border-yellow-500/50 hover:text-yellow-400"
                          >
                            <Heart className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : !hasSearched ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto">
                    <Search className="h-10 w-10 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Discover Wholesale Products</h3>
                    <p className="text-muted-foreground max-w-md">
                      Search for products across multiple Telegram channels to find the best wholesale deals and profit
                      opportunities.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {["Electronics", "Fashion", "Home & Kitchen", "Sports"].map((category) => (
                      <Button
                        key={category}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSearchQuery(category.toLowerCase())
                          handleSearch()
                        }}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
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
