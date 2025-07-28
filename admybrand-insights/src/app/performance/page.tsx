"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Zap, 
  Clock, 
  Globe, 
  Smartphone,
  Monitor,
  Tablet,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Server,
  Database,
  Wifi
} from "lucide-react"
import { AnalyticsLineChart } from "@/components/charts/line-chart"
import { AnalyticsBarChart } from "@/components/charts/bar-chart"
import { generateMockData } from "@/lib/mock-data"

export default function PerformancePage() {
  const data = generateMockData()

  const performanceMetrics = [
    {
      title: "Page Load Time",
      value: "1.2s",
      target: "< 2s",
      score: 85,
      status: "good",
      change: -12.3,
      icon: Clock
    },
    {
      title: "Core Web Vitals",
      value: "92/100",
      target: "> 90",
      score: 92,
      status: "excellent",
      change: 8.5,
      icon: Zap
    },
    {
      title: "Uptime",
      value: "99.9%",
      target: "> 99.5%",
      score: 99.9,
      status: "excellent",
      change: 0.1,
      icon: Server
    },
    {
      title: "API Response",
      value: "245ms",
      target: "< 500ms",
      score: 78,
      status: "good",
      change: -5.2,
      icon: Database
    }
  ]

  const devicePerformance = [
    { device: "Desktop", score: 95, loadTime: "1.1s", users: "45%" },
    { device: "Mobile", score: 78, loadTime: "1.8s", users: "42%" },
    { device: "Tablet", score: 88, loadTime: "1.4s", users: "13%" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600'
      case 'good': return 'text-blue-600'
      case 'needs-improvement': return 'text-yellow-600'
      case 'poor': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return CheckCircle
      case 'good': return CheckCircle
      case 'needs-improvement': return AlertTriangle
      case 'poor': return XCircle
      default: return Activity
    }
  }

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'Desktop': return Monitor
      case 'Mobile': return Smartphone
      case 'Tablet': return Tablet
      default: return Globe
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight gradient-text">Performance Monitor</h1>
            <p className="text-muted-foreground">
              Real-time performance metrics and optimization insights
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-green-600 border-green-600">
              <Wifi className="h-3 w-3 mr-1" />
              All Systems Operational
            </Badge>
            <Button variant="outline" size="sm">
              Run Performance Test
            </Button>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {performanceMetrics.map((metric, index) => {
            const Icon = metric.icon
            const StatusIcon = getStatusIcon(metric.status)
            return (
              <Card key={index} className="card-hover border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </CardTitle>
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold gradient-text">{metric.value}</div>
                      <StatusIcon className={`h-5 w-5 ${getStatusColor(metric.status)}`} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Target: {metric.target}</span>
                        <span className="font-medium">{metric.score}%</span>
                      </div>
                      <Progress value={metric.score} className="h-2" />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={metric.change > 0 ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {metric.change > 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(metric.change)}%
                      </Badge>
                      <span className="text-xs text-muted-foreground">vs last week</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Performance Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="web-vitals">Web Vitals</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyticsLineChart
                    data={data.lineChartData}
                    title="Load Time Trends"
                  />
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Device Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {devicePerformance.map((device, index) => {
                      const DeviceIcon = getDeviceIcon(device.device)
                      return (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              <DeviceIcon className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{device.device}</div>
                              <div className="text-sm text-muted-foreground">{device.users} of users</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{device.score}/100</div>
                            <div className="text-sm text-muted-foreground">{device.loadTime}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <AnalyticsBarChart
              data={data.barChartData}
              title="Performance by Region"
            />
          </TabsContent>

          <TabsContent value="web-vitals" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Largest Contentful Paint</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold gradient-text">1.2s</div>
                    <Progress value={85} className="h-3" />
                    <p className="text-sm text-muted-foreground">
                      Good - Under 2.5s threshold
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">First Input Delay</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold gradient-text">45ms</div>
                    <Progress value={95} className="h-3" />
                    <p className="text-sm text-muted-foreground">
                      Excellent - Under 100ms threshold
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Cumulative Layout Shift</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold gradient-text">0.08</div>
                    <Progress value={92} className="h-3" />
                    <p className="text-sm text-muted-foreground">
                      Good - Under 0.1 threshold
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            <div className="grid gap-6">
              <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Device Performance Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyticsBarChart
                    data={data.barChartData}
                    title="Performance Scores by Device"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="network" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Network Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">4G Connection</span>
                      <span className="font-medium">2.1s load time</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">3G Connection</span>
                      <span className="font-medium">4.8s load time</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">WiFi Connection</span>
                      <span className="font-medium">0.9s load time</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Resource Loading</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">JavaScript</span>
                      <span className="font-medium">245ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">CSS</span>
                      <span className="font-medium">89ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Images</span>
                      <span className="font-medium">567ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Fonts</span>
                      <span className="font-medium">123ms</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
