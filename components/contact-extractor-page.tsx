"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Users, Phone, Mail, MapPin, Building, Menu, Download, Copy, Search, Filter } from "lucide-react"

interface ContactExtractorPageProps {
  onToggleSidebar: () => void
  sidebarCollapsed: boolean
}

const mockContacts = [
  {
    id: 1,
    name: "Rajesh Kumar",
    company: "TechMart Electronics",
    role: "Sales Manager",
    phone: "+91 98765 43210",
    email: "rajesh@techmart.com",
    location: "Mumbai, India",
    source: "Telegram Channel",
    verified: true,
    lastContact: "2 days ago",
  },
  {
    id: 2,
    name: "Priya Sharma",
    company: "Digital Hub Store",
    role: "Business Owner",
    phone: "+91 87654 32109",
    email: "priya@digitalhub.com",
    location: "Delhi, India",
    source: "WhatsApp Group",
    verified: false,
    lastContact: "1 week ago",
  },
  {
    id: 3,
    name: "Amit Patel",
    company: "Audio World",
    role: "Procurement Head",
    phone: "+91 76543 21098",
    email: "amit@audioworld.com",
    location: "Bangalore, India",
    source: "Telegram Channel",
    verified: true,
    lastContact: "3 days ago",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    company: "Mobile Galaxy",
    role: "Marketing Director",
    phone: "+91 65432 10987",
    email: "sneha@mobilegalaxy.com",
    location: "Chennai, India",
    source: "LinkedIn",
    verified: true,
    lastContact: "5 days ago",
  },
]

export function ContactExtractorPage({ onToggleSidebar, sidebarCollapsed }: ContactExtractorPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [extractText, setExtractText] = useState("")

  const filteredContacts = mockContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const extractContacts = () => {
    // Simulate contact extraction
    console.log("Extracting contacts from:", extractText)
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
          Contact Extractor
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </header>

      <div className="flex-1 space-y-4 p-4">
        {/* Extract Tool */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Extract Contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Textarea
                placeholder="Paste text from Telegram channels, WhatsApp groups, or any source to extract contact information..."
                value={extractText}
                onChange={(e) => setExtractText(e.target.value)}
                className="min-h-32"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={extractContacts} className="flex-1">
                Extract Contacts
              </Button>
              <Button variant="outline">Clear</Button>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contacts List */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {contact.name}
                      {contact.verified && (
                        <Badge variant="default" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{contact.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{contact.company}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-mono">{contact.phone}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(contact.phone)}
                    className="h-6 w-6 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{contact.email}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(contact.email)}
                    className="h-6 w-6 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{contact.location}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <Badge variant="outline" className="text-xs">
                    {contact.source}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{contact.lastContact}</span>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    Contact
                  </Button>
                  <Button size="sm" variant="outline">
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No contacts found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Extract contacts from text or adjust your search criteria.
            </p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{mockContacts.length}</div>
              <div className="text-sm text-muted-foreground">Total Contacts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{mockContacts.filter((c) => c.verified).length}</div>
              <div className="text-sm text-muted-foreground">Verified</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {new Set(mockContacts.map((c) => c.company)).size}
              </div>
              <div className="text-sm text-muted-foreground">Companies</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {new Set(mockContacts.map((c) => c.source)).size}
              </div>
              <div className="text-sm text-muted-foreground">Sources</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
