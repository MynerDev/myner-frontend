"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, Heart, Share, Package, Clock, Phone, MessageCircle, Star } from "lucide-react"

// Updated interface to handle both product structures
interface Product {
  id: string | number
  name: string
  price: number | string
  min_quantity?: number
  channel?: string
  seller?: string
  contact?: {
    phone: string
    whatsapp: string
  }
  posted_at?: string
  lastUpdated?: string
  category: string
  image?: string
  description?: string
  originalPrice?: string
  discount?: string
  profit?: string
  margin?: string
  rating?: number
  reviews?: number
  status?: string
}

interface ProductDetailsModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function ProductDetailsModal({ product, isOpen, onClose }: ProductDetailsModalProps) {
  const formatPrice = (price: number | string) => {
    const numPrice = typeof price === "string" ? Number.parseFloat(price.replace(/[₹,]/g, "")) : price
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numPrice)
  }

  const formatTimeAgo = (dateString?: string) => {
    if (!dateString) return "Unknown"

    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const handleContact = (type: "phone" | "whatsapp") => {
    if (!product.contact) {
      // Fallback for products without contact info
      if (type === "phone") {
        window.open(`tel:+919876543210`) // Default number
      } else {
        window.open(`https://wa.me/919876543210`, "_blank") // Default WhatsApp
      }
      return
    }

    if (type === "phone") {
      window.open(`tel:${product.contact.phone}`)
    } else {
      window.open(product.contact.whatsapp, "_blank")
    }
  }

  // Get display values with fallbacks
  const displayPrice = typeof product.price === "string" ? product.price : formatPrice(product.price)
  const displayChannel = product.channel || product.seller || "Unknown Seller"
  const displayTime = product.posted_at || product.lastUpdated || new Date().toISOString()
  const hasContact = product.contact && product.contact.phone
  const displayPhone = hasContact ? product.contact.phone : "+91 98765 43210"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Product Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Header */}
          <div className="flex gap-4">
            <img
              src={product.image || "/placeholder.svg?height=120&width=120"}
              alt={product.name}
              className="w-24 h-24 rounded-lg object-cover border"
            />
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-bold">{product.name}</h2>
                <div className="flex gap-2">
                  <Badge variant="secondary">{product.category}</Badge>
                  {product.status && (
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
                  )}
                </div>
              </div>

              {/* Rating for dashboard products */}
              {product.rating && product.reviews && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating!) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
                </div>
              )}

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{displayChannel}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Updated {formatTimeAgo(displayTime)}</span>
                </div>
              </div>
              {product.description && <p className="text-sm text-muted-foreground">{product.description}</p>}
            </div>
          </div>

          <Separator />

          {/* Pricing Information */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Pricing</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Current Price</span>
                  <span className="text-2xl font-bold text-green-600">{displayPrice}</span>
                </div>

                {product.originalPrice && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Original Price</span>
                    <span className="text-lg line-through text-muted-foreground">{product.originalPrice}</span>
                  </div>
                )}

                {product.discount && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Discount</span>
                    <Badge variant="secondary">{product.discount} OFF</Badge>
                  </div>
                )}

                {product.min_quantity && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Minimum quantity</span>
                    <span className="text-lg font-medium">{product.min_quantity} units</span>
                  </div>
                )}

                {product.min_quantity && typeof product.price === "number" && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total minimum order</span>
                    <span className="text-lg font-bold text-blue-600">
                      {formatPrice(product.price * product.min_quantity)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Seller</span>
                  <span className="font-medium">{displayChannel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-medium">{displayPhone}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => handleContact("phone")}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => handleContact("whatsapp")}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Profit Analysis for dashboard products */}
          {product.profit && product.margin && (
            <>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Profit Analysis</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{product.profit}</div>
                    <div className="text-sm text-muted-foreground">Estimated Profit</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{product.margin}</div>
                    <div className="text-sm text-muted-foreground">Profit Margin</div>
                  </div>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Market Insights */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Market Insights</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">8.5/10</div>
                <div className="text-sm text-muted-foreground">Demand Score</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">7.2/10</div>
                <div className="text-sm text-muted-foreground">Competition</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">9.1/10</div>
                <div className="text-sm text-muted-foreground">Trend Score</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1">
              <ExternalLink className="h-4 w-4 mr-2" />
              {hasContact ? "View in Telegram" : "View Product"}
            </Button>
            <Button variant="outline">
              <Heart className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
