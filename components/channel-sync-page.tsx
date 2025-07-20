"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Menu,
  RefreshCw,
  Users,
  Calendar,
  User,
  Shield,
  Tag,
  Save,
  Search,
  CheckCircle,
  Info,
  Download,
  Upload,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { apiGet } from "@/services/apiService"
import { saveChannels } from "@/lib/api/channels"

interface ChannelSyncPageProps {
  onToggleSidebar: () => void
  sidebarCollapsed: boolean
}

interface TelegramChannel {
  channel_id: string
  channel_name: string
  telegram_id: string
  members: number
  is_verified: boolean
  joined_at: string
  owner_username: string
  tags: string[]
  description?: string
  is_saved?: boolean
}

const dummyChannels: TelegramChannel[] = [
  {
    channel_id: "@dealsfactory",
    channel_name: "Deals Factory",
    telegram_id: "-1001234567890",
    members: 2432,
    is_verified: true,
    joined_at: "2024-11-10T15:00:00Z",
    owner_username: "@sellerhub",
    tags: ["electronics", "fast-delivery"],
    description: "Premium electronics deals with fast delivery across India",
    is_saved: false,
  },
  {
    channel_id: "@techbargains",
    channel_name: "Tech Bargains India",
    telegram_id: "-1001234567891",
    members: 15678,
    is_verified: true,
    joined_at: "2024-10-25T09:30:00Z",
    owner_username: "@techdealer",
    tags: ["technology", "wholesale", "verified"],
    description: "Wholesale technology products at unbeatable prices",
    is_saved: true,
  },
  {
    channel_id: "@fashionhub",
    channel_name: "Fashion Hub Wholesale",
    telegram_id: "-1001234567892",
    members: 8934,
    is_verified: false,
    joined_at: "2024-11-05T14:20:00Z",
    owner_username: "@fashiondeals",
    tags: ["fashion", "clothing", "bulk"],
    description: "Latest fashion trends and wholesale clothing deals",
    is_saved: false,
  },
  {
    channel_id: "@mobilezone",
    channel_name: "Mobile Zone Deals",
    telegram_id: "-1001234567893",
    members: 12456,
    is_verified: true,
    joined_at: "2024-09-15T11:45:00Z",
    owner_username: "@mobileking",
    tags: ["mobile", "accessories", "trusted"],
    description: "Mobile phones and accessories at wholesale rates",
    is_saved: false,
  },
  {
    channel_id: "@homeessentials",
    channel_name: "Home Essentials Store",
    telegram_id: "-1001234567894",
    members: 5623,
    is_verified: false,
    joined_at: "2024-11-01T16:10:00Z",
    owner_username: "@homestore",
    tags: ["home", "kitchen", "appliances"],
    description: "Home and kitchen essentials for modern living",
    is_saved: true,
  },
  {
    channel_id: "@sportsworld",
    channel_name: "Sports World Wholesale",
    telegram_id: "-1001234567895",
    members: 7891,
    is_verified: true,
    joined_at: "2024-10-12T08:25:00Z",
    owner_username: "@sportsdealer",
    tags: ["sports", "fitness", "equipment"],
    description: "Sports and fitness equipment at wholesale prices",
    is_saved: false,
  },
  {
    channel_id: "@beautystore",
    channel_name: "Beauty Store India",
    telegram_id: "-1001234567896",
    members: 9876,
    is_verified: false,
    joined_at: "2024-11-08T12:30:00Z",
    owner_username: "@beautydeals",
    tags: ["beauty", "cosmetics", "skincare"],
    description: "Premium beauty and cosmetic products",
    is_saved: false,
  },
  {
    channel_id: "@bookstore",
    channel_name: "Book Store Wholesale",
    telegram_id: "-1001234567897",
    members: 3456,
    is_verified: true,
    joined_at: "2024-10-30T10:15:00Z",
    owner_username: "@bookdealer",
    tags: ["books", "education", "wholesale"],
    description: "Educational and general books at wholesale rates",
    is_saved: false,
  },
]

export function ChannelSyncPage({ onToggleSidebar, sidebarCollapsed }: ChannelSyncPageProps) {
  const [channels, setChannels] = useState<TelegramChannel[]>([])
  const [selectedChannels, setSelectedChannels] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [verificationFilter, setVerificationFilter] = useState("all")
  const [sortBy, setSortBy] = useState("members")
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatMemberCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  const fetchTelegramChannels = async () => {
    setLoading(true)

    try {
      // In real implementation, this would be:
      // const response = await fetch('/api/telegram/my-channels')

      const response: any = await apiGet(`http://localhost:8000/api/channels/list`);
      console.log("✅ API JSON response:", response);

      if (response.status == 'success') {
        const data = response.data;
        console.log("API response:", data)
        setChannels(data)
      } else {
        setChannels(dummyChannels)
        throw new Error("API call failed")
      }

      toast({
        title: "Channels Fetched Successfully",
        description: `Found ${dummyChannels.length} Telegram channels you've joined`,
      })
    } catch (error) {
      toast({
        title: "Error Fetching Channels",
        description: "Failed to fetch your Telegram channels. Please try again.",
        variant: "destructive",
      })

      console.error("Error fetching channels:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleChannelSelect = (channelId: string, checked: boolean) => {
    const newSelected = new Set(selectedChannels)
    if (checked) {
      newSelected.add(channelId)
    } else {
      newSelected.delete(channelId)
    }
    setSelectedChannels(newSelected)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allChannelIds = filteredChannels.map((c) => c.channel_id)
      setSelectedChannels(new Set(allChannelIds))
    } else {
      setSelectedChannels(new Set())
    }
  }

  const saveSelectedChannels = async () => {
    if (selectedChannels.size === 0) {
      toast({
        title: "No Channels Selected",
        description: "Please select at least one channel to save",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    try {
      const channelsToSave = channels.filter((c) => selectedChannels.has(c.channel_id));

      await saveChannels(channelsToSave); // 🚀 Real API call

      // Mark as saved in local state
      setChannels(
        channels.map((channel) =>
          selectedChannels.has(channel.channel_id)
            ? { ...channel, is_saved: true }
            : channel
        )
      );

      toast({
        title: "Channels Saved Successfully",
        description: `${channelsToSave.length} channel(s) have been saved to Channel Manager`,
      });

      setSelectedChannels(new Set());
    } catch (error) {
      toast({
        title: "Error Saving Channels",
        description: "Failed to save selected channels. Please try again.",
        variant: "destructive",
      });
      console.error("Save error:", error);
    } finally {
      setSaving(false);
    }
  };

  const saveIndividualChannel = async (channel: TelegramChannel) => {
    try {

      console.log("Saving individual channel:", channel);

      await saveChannels([channel]); // ✅ Send one channel in array

      setChannels(
        channels.map((c) =>
          c.channel_id === channel.channel_id ? { ...c, is_saved: true } : c
        )
      );

      toast({
        title: "Channel Saved",
        description: `${channel.channel_name} has been saved to Channel Manager`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save channel. Please try again.",
        variant: "destructive",
      });
      console.error("Save error:", error);
    }
  };

  // Filter and sort channels
  const filteredChannels = channels
    .filter((channel) => {
      const matchesSearch =
        channel.channel_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        channel.channel_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        channel.owner_username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        channel.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesVerification =
        verificationFilter === "all" ||
        (verificationFilter === "verified" && channel.is_verified) ||
        (verificationFilter === "unverified" && !channel.is_verified)

      return matchesSearch && matchesVerification
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "members":
          return b.members - a.members
        case "name":
          return a.channel_name.localeCompare(b.channel_name)
        case "joined":
          return new Date(b.joined_at).getTime() - new Date(a.joined_at).getTime()
        default:
          return 0
      }
    })

  const savedChannelsCount = channels.filter((c) => c.is_saved).length
  const selectedCount = selectedChannels.size

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
          Channel Sync
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <Info className="h-4 w-4 mr-2" />
                  How it works
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p className="text-sm">
                  Fetch channels you've joined on Telegram, then save them to Channel Manager for product tracking and
                  monitoring.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Fetch Channels Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Fetch Telegram Channels
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Retrieve all Telegram channels you've joined or subscribed to
                </p>
                <p className="text-xs text-muted-foreground">
                  This will scan your Telegram account for available channels
                </p>
              </div>
              <Button onClick={fetchTelegramChannels} disabled={loading} className="min-w-[200px]">
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Fetching Channels...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Fetch My Telegram Channels
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        {channels.length > 0 && (
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{channels.length}</div>
                <div className="text-sm text-muted-foreground">Total Channels</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{savedChannelsCount}</div>
                <div className="text-sm text-muted-foreground">Already Saved</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{selectedCount}</div>
                <div className="text-sm text-muted-foreground">Selected</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{channels.filter((c) => c.is_verified).length}</div>
                <div className="text-sm text-muted-foreground">Verified</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters and Controls */}
        {channels.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Filters and Controls</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search channels..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select value={verificationFilter} onValueChange={setVerificationFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Channels</SelectItem>
                      <SelectItem value="verified">Verified Only</SelectItem>
                      <SelectItem value="unverified">Unverified Only</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="members">By Members</SelectItem>
                      <SelectItem value="name">By Name</SelectItem>
                      <SelectItem value="joined">By Join Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewMode(viewMode === "table" ? "cards" : "table")}
                  >
                    {viewMode === "table" ? "Card View" : "Table View"}
                  </Button>

                  {selectedCount > 0 && (
                    <Button onClick={saveSelectedChannels} disabled={saving} className="min-w-[120px]">
                      {saving ? (
                        <>
                          <Upload className="h-4 w-4 mr-2 animate-pulse" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Selected ({selectedCount})
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Channels Display */}
        {channels.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Your Telegram Channels</CardTitle>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedCount === filteredChannels.length && filteredChannels.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                  <span className="text-sm text-muted-foreground">Select All</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === "table" ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">Select</TableHead>
                        <TableHead>Channel</TableHead>
                        <TableHead>Members</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredChannels.map((channel) => (
                        <TableRow key={channel.channel_id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedChannels.has(channel.channel_id)}
                              onCheckedChange={(checked) => handleChannelSelect(channel.channel_id, checked as boolean)}
                              disabled={channel.is_saved}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{channel.channel_name}</span>
                                {channel.is_verified && <Shield className="h-4 w-4 text-blue-500" />}
                                {channel.is_saved && (
                                  <Badge variant="secondary" className="text-xs">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Saved
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground">{channel.channel_id}</div>
                              {channel.description && (
                                <div className="text-xs text-muted-foreground max-w-xs truncate">
                                  {channel.description}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{formatMemberCount(channel.members)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{channel.owner_username}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{formatDate(channel.joined_at)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {channel.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {channel.tags.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{channel.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {channel.is_verified && (
                                <Badge variant="default" className="text-xs">
                                  Verified
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {!channel.is_saved ? (
                              <Button size="sm" variant="outline" onClick={() => saveIndividualChannel(channel)}>
                                <Save className="h-3 w-3 mr-1" />
                                Save
                              </Button>
                            ) : (
                              <Badge variant="secondary" className="text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Saved
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredChannels.map((channel) => (
                    <Card key={channel.channel_id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={selectedChannels.has(channel.channel_id)}
                              onCheckedChange={(checked) => handleChannelSelect(channel.channel_id, checked as boolean)}
                              disabled={channel.is_saved}
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <CardTitle className="text-base">{channel.channel_name}</CardTitle>
                                {channel.is_verified && <Shield className="h-4 w-4 text-blue-500" />}
                              </div>
                              <p className="text-sm text-muted-foreground">{channel.channel_id}</p>
                            </div>
                          </div>
                          {channel.is_saved && (
                            <Badge variant="secondary" className="text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Saved
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {channel.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">{channel.description}</p>
                        )}

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <span>{formatMemberCount(channel.members)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span>{formatDate(channel.joined_at)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-sm">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <span>{channel.owner_username}</span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {channel.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              <Tag className="h-2 w-2 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <Separator />

                        <div className="flex justify-between items-center">
                          {channel.is_verified && (
                            <Badge variant="default" className="text-xs">
                              Verified
                            </Badge>
                          )}

                          {!channel.is_saved ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => saveIndividualChannel(channel)}
                              className="ml-auto"
                            >
                              <Save className="h-3 w-3 mr-1" />
                              Save
                            </Button>
                          ) : (
                            <Badge variant="secondary" className="text-xs ml-auto">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Saved
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {channels.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Channels Fetched Yet</h3>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              Click the "Fetch My Telegram Channels" button above to retrieve all channels you've joined on Telegram.
            </p>
            <Button onClick={fetchTelegramChannels} disabled={loading}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Get Started
            </Button>
          </div>
        )}

        {/* No Results */}
        {channels.length > 0 && filteredChannels.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No channels found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Try adjusting your search query or filters to find the channels you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
