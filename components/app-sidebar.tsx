"use client"
import {
  BarChart3,
  Calculator,
  Search,
  Users,
  FileText,
  Tag,
  Clock,
  Heart,
  Bell,
  Bookmark,
  MessageSquare,
  PieChart,
  Settings,
  Home,
  RefreshCcw,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AppSidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
  collapsed: boolean
  onToggle: () => void
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "search", label: "Product Search", icon: Search },
  { id: "channel-manager", label: "Channel Manager", icon: MessageSquare },
  { id: "channel-sync", label: "Channel Sync", icon: RefreshCcw },
  { id: "business-overview", label: "Business Overview", icon: BarChart3 },
  { id: "profit-estimator", label: "Profit Estimator", icon: Calculator },
  { id: "sourcing-tracker", label: "Sourcing Tracker", icon: Search },
  { id: "contact-extractor", label: "Contact Extractor", icon: Users },
  { id: "smart-notes", label: "Smart Notes", icon: FileText },
  { id: "auto-tagging", label: "Auto Tagging", icon: Tag },
  { id: "recent-activity", label: "Recent Activity", icon: Clock },
  { id: "favorites", label: "Favorites", icon: Heart },
  { id: "alerts", label: "Alerts", icon: Bell },
  { id: "saved-searches", label: "Saved Searches", icon: Bookmark },
  { id: "analytics", label: "Analytics", icon: PieChart },
  { id: "admin", label: "Admin Panel", icon: Settings },
]

export function AppSidebar({ currentPage, onPageChange, collapsed, onToggle }: AppSidebarProps) {
  return (
    <TooltipProvider>
      <div
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-[#121212] border-r border-border/40 transition-all duration-300 ease-in-out"
        )}
        
        style={{width: collapsed ? "4vw" : "15vw", height: "100vh" }}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border/40">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-white">Product Scout</span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto">
              <Search className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id

            const buttonContent = (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200",
                  collapsed ? "px-0 justify-center" : "px-3",
                  isActive && "bg-white/10 text-white border-r-2 border-blue-500",
                )}
                onClick={() => onPageChange(item.id)}
              >
                <Icon className={cn("h-4 w-4", collapsed ? "" : "mr-3")} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Button>
            )

            if (collapsed) {
              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
                  <TooltipContent side="right" className="ml-2">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return buttonContent
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border/40">
          {!collapsed && <div className="text-xs text-gray-400 text-center">Telegram Product Scout v2.0</div>}
        </div>
      </div>
    </TooltipProvider>
  )
}
