"use client"

import { useEffect, useState } from "react"
import { MetricsGrid } from "@/components/metrics-card"
import { generateMockData, updateMetrics } from "@/lib/mock-data"
import { DashboardData } from "@/types/analytics"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { AnalyticsLineChart } from "@/components/charts/line-chart"
import { AnalyticsBarChart } from "@/components/charts/bar-chart"
import { AnalyticsPieChart } from "@/components/charts/pie-chart"
import { DataTable } from "@/components/data-table"
import { MetricsCardSkeleton, ChartSkeleton, TableSkeleton } from "@/components/loading-skeleton"
import { StatusIndicator } from "@/components/status-indicator"
import { toast } from "sonner"

export function DashboardOverview() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string>("")
  const [isConnected, setIsConnected] = useState(true)

  // Initialize data
  useEffect(() => {
    const mockData = generateMockData()
    setData(mockData)
    setLastUpdated(new Date().toLocaleTimeString())
    setIsLoading(false)
  }, [])

  // Simulate real-time updates every 30 seconds
  useEffect(() => {
    if (!data) return

    const interval = setInterval(() => {
      setData(currentData => {
        if (!currentData) return currentData
        const updatedData = updateMetrics(currentData)
        setLastUpdated(new Date().toLocaleTimeString())
        toast.success("Dashboard updated with latest data", {
          duration: 2000,
        })
        return updatedData
      })
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [data])

  const handleRefresh = () => {
    if (!data) return
    setIsLoading(true)

    // Simulate loading delay for better UX
    setTimeout(() => {
      const updatedData = updateMetrics(data)
      setData(updatedData)
      setLastUpdated(new Date().toLocaleTimeString())
      setIsLoading(false)
      toast.success("Dashboard refreshed successfully!", {
        duration: 2000,
      })
    }, 500)
  }

  if (isLoading && !data) {
    return (
      <div className="space-y-6 animate-in fade-in-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome to ADmyBRAND Insights - Your analytics command center
            </p>
          </div>
        </div>

        {/* Loading skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <MetricsCardSkeleton key={i} />
          ))}
        </div>

        <div className="space-y-6">
          <ChartSkeleton />
          <div className="grid gap-6 lg:grid-cols-2">
            <ChartSkeleton />
            <ChartSkeleton />
          </div>
        </div>

        <TableSkeleton />
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to ADmyBRAND Insights - Your analytics command center
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <StatusIndicator isConnected={isConnected} lastUpdated={lastUpdated} />
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
            className="h-8 transition-all hover:scale-105"
          >
            <RefreshCw className={`h-4 w-4 mr-2 transition-transform ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>
      
      {/* Metrics Cards */}
      <MetricsGrid metrics={data.metrics} />

      {/* Charts Section */}
      <div className="space-y-6">
        {/* Line Chart - Full Width */}
        <AnalyticsLineChart
          data={data.lineChartData}
          title="Revenue & Performance Trends"
        />

        {/* Bar Chart and Pie Chart - Side by Side on larger screens */}
        <div className="grid gap-6 lg:grid-cols-2">
          <AnalyticsBarChart
            data={data.barChartData}
            title="Device Performance"
          />
          <AnalyticsPieChart
            data={data.pieChartData}
            title="Traffic Sources"
          />
        </div>
      </div>

      {/* Data Table */}
      <DataTable data={data.tableData} />
    </div>
  )
}
