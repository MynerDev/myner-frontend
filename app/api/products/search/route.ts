import { type NextRequest, NextResponse } from "next/server"

// Mock API endpoint for product search
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock data - in real implementation, this would query your database
  const mockProducts = [
    {
      id: "api001",
      name: "Premium Leather Wallet Collection",
      price: 799,
      min_quantity: 15,
      channel: "LeatherCrafts",
      contact: {
        phone: "9876543220",
        whatsapp: "https://wa.me/919876543220",
      },
      posted_at: "2025-07-03T11:30:00Z",
      category: "Fashion",
      description: "Handcrafted leather wallets with RFID protection",
    },
    {
      id: "api002",
      name: "Smart Watch Series Pro",
      price: 2999,
      min_quantity: 8,
      channel: "TechGadgets",
      contact: {
        phone: "9876543221",
        whatsapp: "https://wa.me/919876543221",
      },
      posted_at: "2025-07-03T10:45:00Z",
      category: "Electronics",
      description: "Latest smartwatch with health monitoring and GPS",
    },
  ]

  // Filter products based on query
  const filteredProducts = query
    ? mockProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      )
    : mockProducts

  return NextResponse.json(filteredProducts)
}
