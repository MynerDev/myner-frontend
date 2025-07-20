"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Users, Database, Shield, Menu, Save, RefreshCw, Download, Upload } from "lucide-react"

interface AdminPanelProps {
  onToggleSidebar: () => void
  sidebarCollapsed: boolean
}

const mockUsers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2 hours ago",
  },
  { id: 2, name: "Priya Sharma", email: "priya@example.com", role: "User", status: "Active", lastLogin: "1 day ago" },
  { id: 3, name: "Amit Patel", email: "amit@example.com", role: "User", status: "Inactive", lastLogin: "1 week ago" },
  {
    id: 4,
    name: "Sneha Reddy",
    email: "sneha@example.com",
    role: "Moderator",
    status: "Active",
    lastLogin: "3 hours ago",
  },
]

const mockSystemStats = {
  totalUsers: 1247,
  activeUsers: 892,
  totalProducts: 45672,
  totalChannels: 156,
  storageUsed: "2.4 GB",
  storageLimit: "10 GB",
  apiCalls: "125,847",
  uptime: "99.9%",
}

export function AdminPanel({ onToggleSidebar, sidebarCollapsed }: AdminPanelProps) {
  const [settings, setSettings] = useState({
    autoSync: true,
    notifications: true,
    dataRetention: "90",
    maxChannels: "50",
    apiRateLimit: "1000",
  })

  const updateSetting = (key: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
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
          Admin Panel
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import Data
          </Button>
        </div>
      </header>

      <div className="flex-1 p-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockSystemStats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">{mockSystemStats.activeUsers} active users</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockSystemStats.totalProducts.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Across {mockSystemStats.totalChannels} channels</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Storage Used</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockSystemStats.storageUsed}</div>
                  <p className="text-xs text-muted-foreground">of {mockSystemStats.storageLimit} limit</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">System Uptime</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockSystemStats.uptime}</div>
                  <p className="text-xs text-muted-foreground">{mockSystemStats.apiCalls} API calls today</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database Connection</span>
                    <Badge variant="default">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Services</span>
                    <Badge variant="default">Running</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Background Jobs</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cache System</span>
                    <Badge variant="secondary">Warning</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="space-y-1">
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">Last login: {user.lastLogin}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={user.role === "Admin" ? "default" : "outline"}>{user.role}</Badge>
                        <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Auto Sync</label>
                    <p className="text-xs text-muted-foreground">Automatically sync data from channels</p>
                  </div>
                  <Switch
                    checked={settings.autoSync}
                    onCheckedChange={(checked) => updateSetting("autoSync", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Push Notifications</label>
                    <p className="text-xs text-muted-foreground">Send notifications for important events</p>
                  </div>
                  <Switch
                    checked={settings.notifications}
                    onCheckedChange={(checked) => updateSetting("notifications", checked)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Data Retention (days)</label>
                  <Input
                    type="number"
                    value={settings.dataRetention}
                    onChange={(e) => updateSetting("dataRetention", e.target.value)}
                    className="w-32"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Channels per User</label>
                  <Input
                    type="number"
                    value={settings.maxChannels}
                    onChange={(e) => updateSetting("maxChannels", e.target.value)}
                    className="w-32"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">API Rate Limit (per hour)</label>
                  <Input
                    type="number"
                    value={settings.apiRateLimit}
                    onChange={(e) => updateSetting("apiRateLimit", e.target.value)}
                    className="w-32"
                  />
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Database Operations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full bg-transparent">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Cache
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Database className="h-4 w-4 mr-2" />
                    Optimize Database
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Backup Database
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Maintenance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full bg-transparent">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Restart Services
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Shield className="h-4 w-4 mr-2" />
                    Security Scan
                  </Button>
                  <Button variant="destructive" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    System Reset
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>System Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 font-mono text-sm bg-muted p-4 rounded-lg max-h-64 overflow-y-auto">
                  <div>[2024-01-15 10:30:15] INFO: System startup completed</div>
                  <div>[2024-01-15 10:30:16] INFO: Database connection established</div>
                  <div>[2024-01-15 10:30:17] INFO: API services started</div>
                  <div>[2024-01-15 10:30:18] INFO: Background jobs initialized</div>
                  <div>[2024-01-15 10:35:22] WARN: Cache memory usage at 85%</div>
                  <div>[2024-01-15 10:40:33] INFO: User authentication successful</div>
                  <div>[2024-01-15 10:45:44] INFO: Data sync completed for 12 channels</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
