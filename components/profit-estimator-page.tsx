"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calculator, TrendingUp, DollarSign, Menu, Save, RefreshCw } from "lucide-react"

interface ProfitEstimatorPageProps {
  onToggleSidebar: () => void
  sidebarCollapsed: boolean
}

export function ProfitEstimatorPage({ onToggleSidebar, sidebarCollapsed }: ProfitEstimatorPageProps) {
  const [productPrice, setProductPrice] = useState("")
  const [shippingCost, setShippingCost] = useState("")
  const [platformFee, setPlatformFee] = useState("")
  const [marketingCost, setMarketingCost] = useState("")
  const [category, setCategory] = useState("")

  const calculateProfit = () => {
    const price = Number.parseFloat(productPrice) || 0
    const shipping = Number.parseFloat(shippingCost) || 0
    const platform = Number.parseFloat(platformFee) || 0
    const marketing = Number.parseFloat(marketingCost) || 0

    const totalCosts = shipping + platform + marketing
    const profit = price - totalCosts
    const margin = price > 0 ? (profit / price) * 100 : 0

    return { profit, margin, totalCosts }
  }

  const { profit, margin, totalCosts } = calculateProfit()

  const profitScenarios = [
    {
      name: "Conservative",
      multiplier: 0.8,
      description: "Lower market demand",
    },
    {
      name: "Realistic",
      multiplier: 1.0,
      description: "Current market conditions",
    },
    {
      name: "Optimistic",
      multiplier: 1.3,
      description: "High demand scenario",
    },
  ]

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
          Profit Estimator
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Calculation
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Product Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-price">Product Price (₹)</Label>
                <Input
                  id="product-price"
                  type="number"
                  placeholder="Enter selling price"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="computers">Computers</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shipping-cost">Shipping Cost (₹)</Label>
                <Input
                  id="shipping-cost"
                  type="number"
                  placeholder="Enter shipping cost"
                  value={shippingCost}
                  onChange={(e) => setShippingCost(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform-fee">Platform Fee (₹)</Label>
                <Input
                  id="platform-fee"
                  type="number"
                  placeholder="Enter platform fee"
                  value={platformFee}
                  onChange={(e) => setPlatformFee(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="marketing-cost">Marketing Cost (₹)</Label>
                <Input
                  id="marketing-cost"
                  type="number"
                  placeholder="Enter marketing cost"
                  value={marketingCost}
                  onChange={(e) => setMarketingCost(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {/* Profit Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Profit Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">₹{profit.toLocaleString("en-IN")}</div>
                    <div className="text-sm text-muted-foreground">Net Profit</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{margin.toFixed(1)}%</div>
                    <div className="text-sm text-muted-foreground">Profit Margin</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Selling Price</span>
                    <span className="font-medium">
                      ₹{Number.parseFloat(productPrice || "0").toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Costs</span>
                    <span className="font-medium">₹{totalCosts.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-medium">Net Profit</span>
                    <span className={`font-bold ${profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                      ₹{profit.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Badge
                    variant={
                      margin >= 20 ? "default" : margin >= 10 ? "secondary" : margin >= 0 ? "outline" : "destructive"
                    }
                    className="w-full justify-center"
                  >
                    {margin >= 20
                      ? "Excellent Margin"
                      : margin >= 10
                        ? "Good Margin"
                        : margin >= 0
                          ? "Low Margin"
                          : "Loss"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Profit Scenarios */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Profit Scenarios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profitScenarios.map((scenario, index) => {
                    const scenarioProfit = profit * scenario.multiplier
                    const scenarioMargin = margin * scenario.multiplier

                    return (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <div className="font-medium">{scenario.name}</div>
                          <div className="text-sm text-muted-foreground">{scenario.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">₹{scenarioProfit.toLocaleString("en-IN")}</div>
                          <div className="text-sm text-muted-foreground">{scenarioMargin.toFixed(1)}% margin</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Optimization Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Aim for 15-25% profit margin for sustainable business</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Negotiate better shipping rates for higher volumes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Consider bundling products to increase average order value</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Monitor competitor pricing regularly</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
