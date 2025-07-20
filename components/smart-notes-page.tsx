"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Plus, Search, Edit, Trash2, Tag, Clock, Menu, Save, Star } from "lucide-react"

interface SmartNotesPageProps {
  onToggleSidebar: () => void
  sidebarCollapsed: boolean
}

const mockNotes = [
  {
    id: 1,
    title: "iPhone 15 Pro Max Deal Analysis",
    content:
      "Found excellent deal on iPhone 15 Pro Max at ₹99,900. Original price ₹1,34,900. Profit margin of 35% possible. Seller: Apple Store Mumbai. Contact: Rajesh Kumar (+91 98765 43210)",
    tags: ["iPhone", "Electronics", "High Profit"],
    category: "Product Analysis",
    createdAt: "2 hours ago",
    updatedAt: "1 hour ago",
    starred: true,
    priority: "high",
  },
  {
    id: 2,
    title: "Supplier Contact - TechMart Electronics",
    content:
      "New supplier contact established. TechMart Electronics, Mumbai. Specializes in consumer electronics. Rating: 4.8/5. Products: 1247. Average price range: ₹25,000. Reliable for bulk orders.",
    tags: ["Supplier", "Electronics", "Mumbai"],
    category: "Contacts",
    createdAt: "1 day ago",
    updatedAt: "1 day ago",
    starred: false,
    priority: "medium",
  },
  {
    id: 3,
    title: "Market Trend - Gaming Accessories",
    content:
      "Gaming accessories showing strong demand. Mechanical keyboards, gaming mice, headsets trending. Price range ₹2,000-₹8,000. Best sources: Digital Hub Store, Gaming World. Profit margins 15-25%.",
    tags: ["Gaming", "Trend", "Accessories"],
    category: "Market Research",
    createdAt: "3 days ago",
    updatedAt: "2 days ago",
    starred: true,
    priority: "medium",
  },
  {
    id: 4,
    title: "Shipping Cost Optimization",
    content:
      "Negotiated better shipping rates with BlueDart. New rates: ₹50 for <1kg, ₹80 for 1-2kg, ₹120 for 2-5kg. 20% reduction from previous rates. Valid for 6 months. Contact: Amit Sharma.",
    tags: ["Shipping", "Cost Optimization", "Logistics"],
    category: "Operations",
    createdAt: "1 week ago",
    updatedAt: "1 week ago",
    starred: false,
    priority: "low",
  },
]

export function SmartNotesPage({ onToggleSidebar, sidebarCollapsed }: SmartNotesPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [newNote, setNewNote] = useState({ title: "", content: "", tags: "" })
  const [showNewNote, setShowNewNote] = useState(false)

  const filteredNotes = mockNotes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = !selectedCategory || note.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(mockNotes.map((note) => note.category))]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getPriorityBadge = (priority: string) => {
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
          Smart Notes
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <Button onClick={() => setShowNewNote(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Note
          </Button>
        </div>
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
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(selectedCategory === category ? "" : category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Note Form */}
        {showNewNote && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Note
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Note title..."
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
              <Textarea
                placeholder="Write your note content..."
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                className="min-h-32"
              />
              <Input
                placeholder="Tags (comma separated)..."
                value={newNote.tags}
                onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
              />
              <div className="flex gap-2">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Note
                </Button>
                <Button variant="outline" onClick={() => setShowNewNote(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notes Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredNotes.map((note) => (
            <Card key={note.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {note.starred && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                      {note.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {note.category}
                      </Badge>
                      <Badge variant={getPriorityBadge(note.priority)} className="text-xs">
                        {note.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-4">{note.content}</p>

                <div className="flex flex-wrap gap-1">
                  {note.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <Tag className="h-2 w-2 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Created {note.createdAt}</span>
                  </div>
                  {note.updatedAt !== note.createdAt && <span>Updated {note.updatedAt}</span>}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Edit className="h-3 w-3 mr-2" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Star className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No notes found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Create your first note or adjust your search criteria.
            </p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{mockNotes.length}</div>
              <div className="text-sm text-muted-foreground">Total Notes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{mockNotes.filter((n) => n.starred).length}</div>
              <div className="text-sm text-muted-foreground">Starred</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {mockNotes.filter((n) => n.priority === "high").length}
              </div>
              <div className="text-sm text-muted-foreground">High Priority</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
