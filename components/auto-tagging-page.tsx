"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tag, Zap, Settings, Plus, Edit, Trash2, Menu, Save, RefreshCw } from "lucide-react"

interface AutoTaggingPageProps {
  onToggleSidebar: () => void
  sidebarCollapsed: boolean
}

const mockTagRules = [
  {
    id: 1,
    name: "High Value Electronics",
    condition: "price > ₹50,000 AND category = Electronics",
    tags: ["High Value", "Premium", "Electronics"],
    active: true,
    matchCount: 247,
  },
  {
    id: 2,
    name: "Budget Smartphones",
    condition: "price < ₹25,000 AND category = Electronics AND name contains 'phone'",
    tags: ["Budget", "Smartphone", "Affordable"],
    active: true,
    matchCount: 156,
  },
  {
    id: 3,
    name: "Gaming Products",
    condition: "name contains 'gaming' OR name contains 'game'",
    tags: ["Gaming", "Entertainment", "Tech"],
    active: true,
    matchCount: 89,
  },
  {
    id: 4,
    name: "Apple Products",
    condition: "brand = Apple OR name contains 'iPhone' OR name contains 'MacBook'",
    tags: ["Apple", "Premium", "iOS"],
    active: false,
    matchCount: 342,
  },
]

const mockRecentlyTagged = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: "₹99,900",
    tags: ["High Value", "Premium", "Electronics", "Apple", "iOS"],
    autoTags: ["High Value", "Premium", "Electronics"],
    manualTags: ["Apple", "iOS"],
  },
  {
    id: 2,
    name: "Samsung Galaxy A54",
    price: "₹22,999",
    tags: ["Budget", "Smartphone", "Affordable"],
    autoTags: ["Budget", "Smartphone", "Affordable"],
    manualTags: [],
  },
  {
    id: 3,
    name: "Gaming Mechanical Keyboard",
    price: "₹8,999",
    tags: ["Gaming", "Entertainment", "Tech", "Accessories"],
    autoTags: ["Gaming", "Entertainment", "Tech"],
    manualTags: ["Accessories"],
  },
]

export function AutoTaggingPage({ onToggleSidebar, sidebarCollapsed }: AutoTaggingPageProps) {
  const [selectedRule, setSelectedRule] = useState<number | null>(null)
  const [newRule, setNewRule] = useState({
    name: "",
    condition: "",
    tags: "",
  })
  const [showNewRule, setShowNewRule] = useState(false)

  const toggleRule = (ruleId: number) => {
    // Toggle rule active state
    console.log("Toggle rule:", ruleId)
  }

  const runTagging = () => {
    // Run auto-tagging process
    console.log("Running auto-tagging...")
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
          Auto Tagging
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <Button onClick={runTagging}>
            <Zap className="h-4 w-4 mr-2" />
            Run Tagging
          </Button>
          <Button variant="outline" onClick={() => setShowNewRule(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Rule
          </Button>
        </div>
      </header>

      <div className="flex-1 space-y-4 p-4">
        {/* New Rule Form */}
        {showNewRule && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create Tagging Rule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Rule Name</label>
                <Input
                  placeholder="e.g., High Value Electronics"
                  value={newRule.name}
                  onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Condition</label>
                <Input
                  placeholder="e.g., price > ₹50,000 AND category = Electronics"
                  value={newRule.condition}
                  onChange={(e) => setNewRule({ ...newRule, condition: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Tags (comma separated)</label>
                <Input
                  placeholder="e.g., High Value, Premium, Electronics"
                  value={newRule.tags}
                  onChange={(e) => setNewRule({ ...newRule, tags: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Rule
                </Button>
                <Button variant="outline" onClick={() => setShowNewRule(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tagging Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Tagging Rules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTagRules.map((rule) => (
                <div key={rule.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{rule.name}</h3>
                      <Badge variant={rule.active ? "default" : "outline"}>{rule.active ? "Active" : "Inactive"}</Badge>
                      <Badge variant="secondary" className="text-xs">
                        {rule.matchCount} matches
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
                      {rule.condition}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {rule.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Tag className="h-2 w-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant={rule.active ? "outline" : "default"} onClick={() => toggleRule(rule.id)}>
                      {rule.active ? "Disable" : "Enable"}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recently Tagged Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Recently Tagged Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentlyTagged.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{product.name}</h3>
                      <span className="text-sm font-bold text-green-600">{product.price}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs text-muted-foreground">Auto Tags:</span>
                        {product.autoTags.map((tag, index) => (
                          <Badge key={index} variant="default" className="text-xs">
                            <Zap className="h-2 w-2 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      {product.manualTags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          <span className="text-xs text-muted-foreground">Manual Tags:</span>
                          {product.manualTags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              <Tag className="h-2 w-2 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Edit className="h-3 w-3 mr-2" />
                    Edit Tags
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{mockTagRules.filter((r) => r.active).length}</div>
              <div className="text-sm text-muted-foreground">Active Rules</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {mockTagRules.reduce((sum, r) => sum + r.matchCount, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Products Tagged</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{mockRecentlyTagged.length}</div>
              <div className="text-sm text-muted-foreground">Recent Tags</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {new Set(mockTagRules.flatMap((r) => r.tags)).size}
              </div>
              <div className="text-sm text-muted-foreground">Unique Tags</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
