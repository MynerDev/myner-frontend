"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Dashboard } from "@/components/dashboard"
import { SearchPage } from "@/components/search-page"
import { BusinessOverviewPage } from "@/components/business-overview-page"
import { ProfitEstimatorPage } from "@/components/profit-estimator-page"
import { SourcingTrackerPage } from "@/components/sourcing-tracker-page"
import { ContactExtractorPage } from "@/components/contact-extractor-page"
import { SmartNotesPage } from "@/components/smart-notes-page"
import { AutoTaggingPage } from "@/components/auto-tagging-page"
import { RecentActivityPage } from "@/components/recent-activity-page"
import { FavoritesPage } from "@/components/favorites-page"
import { AlertsPage } from "@/components/alerts-page"
import { SavedSearchesPage } from "@/components/saved-searches-page"
import { ChannelManager } from "@/components/channel-manager"
import { AnalyticsPage } from "@/components/analytics-page"
import { AdminPanel } from "@/components/admin-panel"
import { ChannelSyncPage } from "@/components/channel-sync-page"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const renderCurrentPage = () => {
    const pageProps = {
      onToggleSidebar: toggleSidebar,
      sidebarCollapsed,
    }

    switch (currentPage) {
      case "dashboard":
        return <Dashboard {...pageProps} />
      case "search":
        return <SearchPage {...pageProps} />
      case "business-overview":
        return <BusinessOverviewPage {...pageProps} />
      case "profit-estimator":
        return <ProfitEstimatorPage {...pageProps} />
      case "sourcing-tracker":
        return <SourcingTrackerPage {...pageProps} />
      case "contact-extractor":
        return <ContactExtractorPage {...pageProps} />
      case "smart-notes":
        return <SmartNotesPage {...pageProps} />
      case "auto-tagging":
        return <AutoTaggingPage {...pageProps} />
      case "recent-activity":
        return <RecentActivityPage {...pageProps} />
      case "favorites":
        return <FavoritesPage {...pageProps} />
      case "alerts":
        return <AlertsPage {...pageProps} />
      case "saved-searches":
        return <SavedSearchesPage {...pageProps} />
      case "channel-manager":
        return <ChannelManager {...pageProps} />
      case "channel-sync":
        return <ChannelSyncPage {...pageProps} />
      case "analytics":
        return <AnalyticsPage {...pageProps} />
      case "admin":
        return <AdminPanel {...pageProps} />
      default:
        return <Dashboard {...pageProps} />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <AppSidebar
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          collapsed={sidebarCollapsed}
          onToggle={toggleSidebar}
        />
        <main className={`flex-1 transition-all duration-300 ease-in-out`} style={{ marginLeft: sidebarCollapsed ? "4vw" : "15vw", width: sidebarCollapsed ? "95vw" : "84vw", boxSizing: "border-box" }}>
          {renderCurrentPage()}
        </main>
      </div>
    </SidebarProvider>
  )
}
