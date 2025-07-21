"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  MessageSquare,
  Users,
  Plus,
  Settings,
  Menu,
  Pause,
  Play,
  Trash2,
  RefreshCw,
  Eye,
  Clock,
  Phone,
  MessageCircle,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { apiGet } from "@/services/apiService"

interface ChannelManagerProps {
  onToggleSidebar: () => void
  sidebarCollapsed: boolean
}

interface Channel {
  id: number
  name: string
  platform: string
  type: string
  members: number
  category: string
  status: "active" | "paused" | "inactive"
  lastActivity: string
  productsFound: number
  avgPrice: string
  topProduct: string
  joinDate: string
  inviteLink?: string
  tag?: string
  syncFrequency?: string
}

interface ProductMessage {
  id: string
  name: string
  price: number
  min_quantity: number
  contact: {
    phone: string
    whatsapp: string
  }
  posted_at: string
  channel: string
}

const initialChannels: Channel[] = [
  {
    id: 1,
    name: "Electronics Deals India",
    platform: "telegram",
    type: "public",
    members: 45672,
    category: "Electronics",
    status: "active",
    lastActivity: "2 minutes ago",
    productsFound: 247,
    avgPrice: "₹25,000",
    topProduct: "iPhone 15 Pro Max",
    joinDate: "2 months ago",
    inviteLink: "https://t.me/electronicsdeals",
    tag: "trusted",
    syncFrequency: "5min",
  },
  {
    id: 2,
    name: "Tech Wholesale Mumbai",
    platform: "whatsapp",
    type: "private",
    members: 156,
    category: "Electronics",
    status: "active",
    lastActivity: "15 minutes ago",
    productsFound: 89,
    avgPrice: "₹45,000",
    topProduct: "MacBook Air M3",
    joinDate: "3 weeks ago",
    inviteLink: "https://chat.whatsapp.com/xyz",
    tag: "frequent",
    syncFrequency: "10min",
  },
  {
    id: 3,
    name: "Gaming Accessories Hub",
    platform: "telegram",
    type: "public",
    members: 12834,
    category: "Gaming",
    status: "paused",
    lastActivity: "1 hour ago",
    productsFound: 156,
    avgPrice: "₹8,000",
    topProduct: "Gaming Mechanical Keyboard",
    joinDate: "1 month ago",
    inviteLink: "https://t.me/gamingaccessories",
    syncFrequency: "15min",
  },
  {
    id: 4,
    name: "Audio Equipment Traders",
    platform: "telegram",
    type: "private",
    members: 892,
    category: "Audio",
    status: "active",
    lastActivity: "30 minutes ago",
    productsFound: 67,
    avgPrice: "₹12,000",
    topProduct: "Bluetooth Speakers",
    joinDate: "6 weeks ago",
    inviteLink: "https://t.me/audioequipment",
    tag: "trusted",
    syncFrequency: "5min",
  },
  {
    id: 5,
    name: "Mobile Phone Wholesale",
    platform: "whatsapp",
    type: "group",
    members: 234,
    category: "Electronics",
    status: "inactive",
    lastActivity: "2 days ago",
    productsFound: 342,
    avgPrice: "₹35,000",
    topProduct: "Samsung Galaxy S24",
    joinDate: "2 months ago",
    inviteLink: "https://chat.whatsapp.com/abc",
    syncFrequency: "30min",
  },
]

const dummyMessages: ProductMessage[] = [
  {
    id: "msg1",
    name: "Portable Bluetooth Speaker",
    price: 399,
    min_quantity: 10,
    contact: {
      phone: "9876543210",
      whatsapp: "https://wa.me/919876543210",
    },
    posted_at: "Just now",
    channel: "Electronics Deals India",
  },
  {
    id: "msg2",
    name: "Wireless Gaming Mouse",
    price: 899,
    min_quantity: 15,
    contact: {
      phone: "9876543211",
      whatsapp: "https://wa.me/919876543211",
    },
    posted_at: "2 minutes ago",
    channel: "Gaming Accessories Hub",
  },
  {
    id: "msg3",
    name: "USB-C Fast Charger",
    price: 299,
    min_quantity: 25,
    contact: {
      phone: "9876543212",
      whatsapp: "https://wa.me/919876543212",
    },
    posted_at: "5 minutes ago",
    channel: "Tech Wholesale Mumbai",
  },
]

export function ChannelManager({ onToggleSidebar, sidebarCollapsed }: ChannelManagerProps) {
  const [channels, setChannels] = useState<Channel[]>(initialChannels)
  const [platformFilter, setPlatformFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [showAddChannelModal, setShowAddChannelModal] = useState(false)
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null)
  const [showSettingsSheet, setShowSettingsSheet] = useState(false)
  const [showMessagesSheet, setShowMessagesSheet] = useState(false)
  const [recentMessages, setRecentMessages] = useState<ProductMessage[]>([])
  const [syncingChannels, setSyncingChannels] = useState<Set<number>>(new Set())

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        // In real implementation, this would be:
        // const response = await fetch('/api/telegram/my-channels')

        const response: any = await apiGet(`/api/channels/saved/list`);
        console.log("✅ API JSON response:", response);

        if (response.status == 'success') {
          const data = response.data;
          console.log("API response:", data)
          setChannels(data)
        } else {
          setChannels(initialChannels)
          throw new Error("API call failed")
        }

        toast({
          title: "Channels Fetched Successfully",
          description: `Found ${initialChannels.length} Telegram channels you've joined`,
        })
      } catch (error) {
        toast({
          title: "Error Fetching Channels",
          description: "Failed to fetch your Telegram channels. Please try again.",
          variant: "destructive",
        })

        console.error("Error fetching channels:", error)
      } finally {
        // setLoading(false)
      }
    }

    fetchChannels();
  }, [])

  // Add Channel Form State
  const [newChannel, setNewChannel] = useState({
    name: "",
    inviteLink: "",
    category: "",
    tag: "",
    platform: "telegram",
    type: "public",
  })

  const filteredChannels = channels.filter((channel) => {
    const matchesPlatform = platformFilter === "all" || channel.platform === platformFilter
    const matchesStatus = statusFilter === "all" || channel.status === statusFilter
    const matchesCategory = categoryFilter === "all" || channel.category === categoryFilter

    return matchesPlatform && matchesStatus && matchesCategory
  })

  const platforms = ["all", ...new Set(channels.map((c) => c.platform))]
  const statuses = ["all", ...new Set(channels.map((c) => c.status))]
  const categories = ["all", ...new Set(channels.map((c) => c.category))]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "paused":
        return "secondary"
      case "inactive":
        return "outline"
      default:
        return "outline"
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "telegram":
        return "📱"
      case "whatsapp":
        return "💬"
      default:
        return "📢"
    }
  }

  const getTagColor = (tag?: string) => {
    switch (tag) {
      case "trusted":
        return "bg-green-500/10 text-green-400 border-green-500/20"
      case "frequent":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  // Add Channel Function
  const handleAddChannel = () => {
    if (!newChannel.name || !newChannel.inviteLink) {
      toast({
        title: "Error",
        description: "Channel name and invite link are required",
        variant: "destructive",
      })
      return
    }

    const channel: Channel = {
      id: Date.now(),
      name: newChannel.name,
      platform: newChannel.platform,
      type: newChannel.type,
      members: Math.floor(Math.random() * 10000) + 100,
      category: newChannel.category || "General",
      status: "active",
      lastActivity: "Just added",
      productsFound: 0,
      avgPrice: "₹0",
      topProduct: "None yet",
      joinDate: "Just now",
      inviteLink: newChannel.inviteLink,
      tag: newChannel.tag || undefined,
      syncFrequency: "15min",
    }

    setChannels([channel, ...channels])
    setNewChannel({
      name: "",
      inviteLink: "",
      category: "",
      tag: "",
      platform: "telegram",
      type: "public",
    })
    setShowAddChannelModal(false)

    toast({
      title: "Channel Added",
      description: `${channel.name} has been added successfully`,
    })
  }

  // Toggle Channel Status (Play/Pause)
  const toggleChannelStatus = (channelId: number) => {
    setChannels(
      channels.map((channel) => {
        if (channel.id === channelId) {
          const newStatus = channel.status === "active" ? "paused" : "active"
          toast({
            title: `Channel ${newStatus === "active" ? "Activated" : "Paused"}`,
            description: `${channel.name} is now ${newStatus}`,
          })
          return { ...channel, status: newStatus }
        }
        return channel
      }),
    )
  }

  // Delete Channel
  const deleteChannel = (channelId: number) => {
    const channel = channels.find((c) => c.id === channelId)
    setChannels(channels.filter((c) => c.id !== channelId))
    toast({
      title: "Channel Deleted",
      description: `${channel?.name} has been removed`,
      variant: "destructive",
    })
  }

  // Manual Sync Function
  const handleManualSync = async (channel: Channel) => {
    setSyncingChannels((prev) => new Set(prev).add(channel.id))

    try {
      const response: any = await apiGet(`/api/channels/${channel.id}/messages/sync`)
      console.log("✅ Sync API response:", response)

      if (response.status === "success") {
        const messages = response.data || []

        setChannels(
          channels.map((c) =>
            c.id === channel.id
              ? {
                  ...c,
                  lastActivity: "Just now",
                  productsFound: c.productsFound + messages.length,
                }
              : c,
          ),
        )

        toast({
          title: "Sync Complete",
          description: `Found ${messages.length} new products from ${channel.name}`,
        })

        setRecentMessages(
          messages.map((msg: any, idx: number) => ({
            ...msg,
            id: `${msg.id || idx}_${channel.id}_${Date.now()}`,
            channel: channel.name,
            posted_at: "Just now",
          })),
        )
        setSelectedChannel(channel)
        setShowMessagesSheet(true)
      } else {
        toast({
          title: "Sync Failed",
          description: `Failed to sync messages for ${channel.name}`,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Sync Error",
        description: `Error syncing messages for ${channel.name}`,
        variant: "destructive",
      })
      console.error("Error syncing channel messages:", error)
    } finally {
      setSyncingChannels((prev) => {
        const newSet = new Set(prev)
        newSet.delete(channel.id)
        return newSet
      })
    }
  }

  // View Channel Messages
  const viewChannelMessages = (channel: Channel) => {
    // Generate mock recent messages for this channel
    const mockMessages = dummyMessages.map((msg, index) => ({
      ...msg,
      id: `${msg.id}_${channel.id}_${index}`,
      channel: channel.name,
      posted_at: index === 0 ? "2 minutes ago" : index === 1 ? "1 hour ago" : "3 hours ago",
    }))

    setRecentMessages(mockMessages)
    setSelectedChannel(channel)
    setShowMessagesSheet(true)
  }

  // Update Channel Settings
  const updateChannelSettings = (updatedChannel: Channel) => {
    setChannels(channels.map((c) => (c.id === updatedChannel.id ? updatedChannel : c)))
    setShowSettingsSheet(false)
    toast({
      title: "Settings Updated",
      description: `${updatedChannel.name} settings have been saved`,
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
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
          Channel Manager
        </h1>
        <div className="ml-auto flex items-center gap-2">
          {/* Add Channel Modal */}
          <Dialog open={showAddChannelModal} onOpenChange={setShowAddChannelModal}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Channel
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Channel</DialogTitle>
                <DialogDescription>
                  Connect a new Telegram channel or WhatsApp group to track products
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="channel-name">Channel Name *</Label>
                  <Input
                    id="channel-name"
                    placeholder="e.g., Electronics Deals India"
                    value={newChannel.name}
                    onChange={(e) => setNewChannel({ ...newChannel, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="invite-link">Invite Link *</Label>
                  <Input
                    id="invite-link"
                    placeholder="https://t.me/channelname or WhatsApp invite link"
                    value={newChannel.inviteLink}
                    onChange={(e) => setNewChannel({ ...newChannel, inviteLink: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="platform">Platform</Label>
                    <Select
                      value={newChannel.platform}
                      onValueChange={(value) => setNewChannel({ ...newChannel, platform: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="telegram">Telegram</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select
                      value={newChannel.type}
                      onValueChange={(value) => setNewChannel({ ...newChannel, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="group">Group</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="e.g., Electronics, Fashion, etc."
                    value={newChannel.category}
                    onChange={(e) => setNewChannel({ ...newChannel, category: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="tag">Tag (Optional)</Label>
                  <Select
                    value={newChannel.tag}
                    onValueChange={(value) => setNewChannel({ ...newChannel, tag: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a tag" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trusted">Trusted</SelectItem>
                      <SelectItem value="frequent">Frequent Seller</SelectItem>
                      <SelectItem value="new">New Channel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowAddChannelModal(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleAddChannel} className="flex-1">
                    Add Channel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Global Settings
          </Button>
        </div>
      </header>

      <div className="flex-1 space-y-4 p-4">
        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Platforms" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <SelectItem key={platform} value={platform}>
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
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

        {/* Channels Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredChannels.map((channel) => (
            <Card
              key={channel.id}
              className={`hover:shadow-md transition-all duration-200 ${
                channel.status === "paused" ? "opacity-60 bg-muted/20" : ""
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="text-lg">{getPlatformIcon(channel.platform)}</span>
                      {channel.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {channel.platform}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {channel.type}
                      </Badge>
                      <Badge variant={getStatusColor(channel.status)} className="text-xs">
                        {channel.status}
                      </Badge>
                      {channel.tag && (
                        <Badge className={`text-xs border ${getTagColor(channel.tag)}`}>{channel.tag}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Members</span>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm font-medium">{channel.members.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Category</span>
                  <Badge variant="outline" className="text-xs">
                    {channel.category}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Products Found</span>
                  <span className="text-sm font-medium text-green-600">{channel.productsFound}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg Price</span>
                  <span className="text-sm font-medium">{channel.avgPrice}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Activity</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">{channel.lastActivity}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => viewChannelMessages(channel)}
                  >
                    <Eye className="h-3 w-3 mr-2" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleChannelStatus(channel.id)}
                    className={channel.status === "active" ? "hover:bg-yellow-500/10" : "hover:bg-green-500/10"}
                  >
                    {channel.status === "active" ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                  </Button>

                  {/* Settings Sheet */}
                  <Sheet open={showSettingsSheet} onOpenChange={setShowSettingsSheet}>
                    <SheetTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedChannel(channel)}
                        className="hover:bg-blue-500/10"
                      >
                        <Settings className="h-3 w-3" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Channel Settings</SheetTitle>
                        <SheetDescription>Configure settings for {selectedChannel?.name}</SheetDescription>
                      </SheetHeader>
                      {selectedChannel && (
                        <div className="space-y-6 mt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-sm font-medium">Active Status</Label>
                              <p className="text-xs text-muted-foreground">Enable or disable channel syncing</p>
                            </div>
                            <Switch
                              checked={selectedChannel.status === "active"}
                              onCheckedChange={(checked) =>
                                setSelectedChannel({
                                  ...selectedChannel,
                                  status: checked ? "active" : "paused",
                                })
                              }
                            />
                          </div>

                          <div>
                            <Label className="text-sm font-medium">Sync Frequency</Label>
                            <Select
                              value={selectedChannel.syncFrequency}
                              onValueChange={(value) =>
                                setSelectedChannel({ ...selectedChannel, syncFrequency: value })
                              }
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="5min">Every 5 minutes</SelectItem>
                                <SelectItem value="10min">Every 10 minutes</SelectItem>
                                <SelectItem value="15min">Every 15 minutes</SelectItem>
                                <SelectItem value="30min">Every 30 minutes</SelectItem>
                                <SelectItem value="1hour">Every hour</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label className="text-sm font-medium">Channel Tag</Label>
                            <Select
                              value={selectedChannel.tag || ""}
                              onValueChange={(value) => setSelectedChannel({ ...selectedChannel, tag: value })}
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Select a tag" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="trusted">Trusted</SelectItem>
                                <SelectItem value="frequent">Frequent Seller</SelectItem>
                                <SelectItem value="new">New Channel</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <Separator />

                          <div className="space-y-3">
                            <Button className="w-full" onClick={() => updateChannelSettings(selectedChannel)}>
                              Save Settings
                            </Button>
                            <Button
                              variant="destructive"
                              className="w-full"
                              onClick={() => {
                                deleteChannel(selectedChannel.id)
                                setShowSettingsSheet(false)
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Channel
                            </Button>
                          </div>
                        </div>
                      )}
                    </SheetContent>
                  </Sheet>
                </div>

                {/* Manual Sync Button */}
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => handleManualSync(channel)}
                  disabled={syncingChannels.has(channel.id)}
                >
                  {syncingChannels.has(channel.id) ? (
                    <>
                      <RefreshCw className="h-3 w-3 mr-2 animate-spin" />
                      Syncing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-3 w-3 mr-2" />
                      Sync Now
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Messages Sheet */}
        <Sheet open={showMessagesSheet} onOpenChange={setShowMessagesSheet}>
          <SheetContent className="w-[600px] sm:max-w-[600px]">
            <SheetHeader>
              <SheetTitle>Recent Messages</SheetTitle>
              <SheetDescription>Latest product messages from {selectedChannel?.name}</SheetDescription>
            </SheetHeader>
            <div className="space-y-4 mt-6">
              {recentMessages.length > 0 ? (
                recentMessages.map((message) => (
                  <Card key={message.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium text-sm">{message.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {message.posted_at}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Price:</span>
                            <div className="font-medium text-green-600">{formatPrice(message.price)}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Min Qty:</span>
                            <div className="font-medium">{message.min_quantity} units</div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={() => window.open(`tel:${message.contact.phone}`)}
                          >
                            <Phone className="h-3 w-3 mr-2" />
                            Call
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={() => window.open(message.contact.whatsapp, "_blank")}
                          >
                            <MessageCircle className="h-3 w-3 mr-2" />
                            WhatsApp
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No recent messages found</p>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {filteredChannels.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No channels found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Add new channels or adjust your filters to see your tracked channels.
            </p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{channels.length}</div>
              <div className="text-sm text-muted-foreground">Total Channels</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {channels.filter((c) => c.status === "active").length}
              </div>
              <div className="text-sm text-muted-foreground">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {channels.reduce((sum, c) => sum + c.members, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Members</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {channels.reduce((sum, c) => sum + c.productsFound, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Products Found</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
