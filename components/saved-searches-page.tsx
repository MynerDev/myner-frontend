"use client"

import { useState } from "react"
import { Menu, Search, Bookmark, Clock, Trash2, Play, Edit, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

interface SavedSearchesPageProps {
  onToggleSidebar: () => void
  sidebarCollapsed: boolean
}

interface SavedSearch {
  id: string
  name: string
  query: string
  description?: string
  filters: {
    priceMin?: number
    priceMax?: number
    category?: string
    channel?: string
  }
  createdAt: string
  lastRun: string
  resultCount: number
  isActive: boolean
}

const savedSearches: SavedSearch[] = [
  {
    id: "1",
    name: "Electronics Under ₹2000",
    query: "electronics",
    description: "Affordable electronics for resale",
    filters: {
      priceMax: 2000,
      category: "Electronics",
    },
    createdAt: "2025-07-01T10:00:00Z",
    lastRun: "2025-07-03T08:30:00Z",
    resultCount: 45,
    isActive: true,
  },
  {
    id: "2",
    name: "Fashion Wholesale",
    query: "clothing fashion",
    description: "Bulk fashion items for retail",
    filters: {
      priceMin: 100,
      priceMax: 1000,
      category: "Fashion",
    },
    createdAt: "2025-06-28T15:20:00Z",
    lastRun: "2025-07-02T14:15:00Z",
    resultCount: 78,
    isActive: true,
  },
  {
    id: "3",
    name: "Home Appliances",
    query: "kitchen appliances",
    description: "Kitchen and home appliances",
    filters: {
      category: "Home & Kitchen",
      channel: "HomeEssentials",
    },
    createdAt: "2025-06-25T09:45:00Z",
    lastRun: "2025-07-01T16:20:00Z",
    resultCount: 23,
    isActive: false,
  },
  {
    id: "4",
    name: "Sports Equipment",
    query: "sports fitness",
    description: "Sports and fitness equipment",
    filters: {
      priceMin: 500,
      category: "Sports",
    },
    createdAt: "2025-06-20T11:30:00Z",
    lastRun: "2025-06-30T12:45:00Z",
    resultCount: 34,
    isActive: true,
  },
]

export function SavedSearchesPage({ onToggleSidebar, sidebarCollapsed }: SavedSearchesPageProps) {
  const [searches, setSearches] = useState<SavedSearch[]>(savedSearches)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newSearch, setNewSearch] = useState({
    name: "",
    query: "",
    description: "",
    priceMin: "",
    priceMax: "",
    category: "",
    channel: "",
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

  const handleRunSearch = (search: SavedSearch) => {
    toast({
      title: "Search executed",
      description: `Running search: ${search.name}`,
    })
    // In real implementation, this would trigger the search
  }

  const handleDeleteSearch = (searchId: string) => {
    setSearches(searches.filter((s) => s.id !== searchId))
    toast({
      title: "Search deleted",
      description: "Saved search has been removed",
    })
  }

  const handleToggleActive = (searchId: string) => {
    setSearches(searches.map((s) => (s.id === searchId ? { ...s, isActive: !s.isActive } : s)))
  }

  const handleCreateSearch = () => {
    if (!newSearch.name || !newSearch.query) {
      toast({
        title: "Error",
        description: "Name and query are required",
        variant: "destructive",
      })
      return
    }

    const search: SavedSearch = {
      id: Date.now().toString(),
      name: newSearch.name,
      query: newSearch.query,
      description: newSearch.description,
      filters: {
        priceMin: newSearch.priceMin ? Number.parseInt(newSearch.priceMin) : undefined,
        priceMax: newSearch.priceMax ? Number.parseInt(newSearch.priceMax) : undefined,
        category: newSearch.category || undefined,
        channel: newSearch.channel || undefined,
      },
      createdAt: new Date().toISOString(),
      lastRun: new Date().toISOString(),
      resultCount: 0,
      isActive: true,
    }

    setSearches([search, ...searches])
    setShowCreateDialog(false)
    setNewSearch({
      name: "",
      query: "",
      description: "",
      priceMin: "",
      priceMax: "",
      category: "",
      channel: "",
    })

    toast({
      title: "Search saved",
      description: "Your search has been saved successfully",
    })
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border/40 bg-card/50">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onToggleSidebar}>
            <Menu className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold">Saved Searches</h1>
            <p className="text-sm text-muted-foreground">Manage your saved search queries and filters</p>
          </div>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Search
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Saved Search</DialogTitle>
              <DialogDescription>Save a search query with filters for quick access later</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Search Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Electronics Under ₹2000"
                  value={newSearch.name}
                  onChange={(e) => setNewSearch({ ...newSearch, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="query">Search Query</Label>
                <Input
                  id="query"
                  placeholder="e.g., electronics, fashion"
                  value={newSearch.query}
                  onChange={(e) => setNewSearch({ ...newSearch, query: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of this search"
                  value={newSearch.description}
                  onChange={(e) => setNewSearch({ ...newSearch, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="priceMin">Min Price (₹)</Label>
                  <Input
                    id="priceMin"
                    type="number"
                    placeholder="100"
                    value={newSearch.priceMin}
                    onChange={(e) => setNewSearch({ ...newSearch, priceMin: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="priceMax">Max Price (₹)</Label>
                  <Input
                    id="priceMax"
                    type="number"
                    placeholder="2000"
                    value={newSearch.priceMax}
                    onChange={(e) => setNewSearch({ ...newSearch, priceMax: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="Electronics"
                    value={newSearch.category}
                    onChange={(e) => setNewSearch({ ...newSearch, category: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="channel">Channel</Label>
                  <Input
                    id="channel"
                    placeholder="TechDeals"
                    value={newSearch.channel}
                    onChange={(e) => setNewSearch({ ...newSearch, channel: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleCreateSearch} className="flex-1">
                  Save Search
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {searches.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No saved searches</h3>
              <p className="text-muted-foreground mb-4">Create your first saved search to get started</p>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Search
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {searches.length} saved search{searches.length !== 1 ? "es" : ""}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{searches.filter((s) => s.isActive).length} active</Badge>
              </div>
            </div>

            <div className="grid gap-4">
              {searches.map((search) => (
                <Card key={search.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{search.name}</CardTitle>
                          <Badge variant={search.isActive ? "default" : "secondary"}>
                            {search.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center gap-2">
                          <Search className="h-3 w-3" />
                          <span className="font-mono text-xs bg-muted px-2 py-1 rounded">{search.query}</span>
                        </CardDescription>
                        {search.description && (
                          <p className="text-sm text-muted-foreground mt-2">{search.description}</p>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Filters */}
                    {Object.keys(search.filters).length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Filters:</h4>
                        <div className="flex flex-wrap gap-2">
                          {search.filters.priceMin && <Badge variant="outline">Min: ₹{search.filters.priceMin}</Badge>}
                          {search.filters.priceMax && <Badge variant="outline">Max: ₹{search.filters.priceMax}</Badge>}
                          {search.filters.category && (
                            <Badge variant="outline">Category: {search.filters.category}</Badge>
                          )}
                          {search.filters.channel && <Badge variant="outline">Channel: {search.filters.channel}</Badge>}
                        </div>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Created {formatTimeAgo(search.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>Last run {formatTimeAgo(search.lastRun)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{search.resultCount} results</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="default" size="sm" onClick={() => handleRunSearch(search)}>
                        <Play className="h-3 w-3 mr-1" />
                        Run Search
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleToggleActive(search.id)}>
                        {search.isActive ? "Deactivate" : "Activate"}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteSearch(search.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
