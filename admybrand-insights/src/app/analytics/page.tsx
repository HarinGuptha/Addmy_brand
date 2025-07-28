"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Target,
  Calendar,
  Download,
  Filter
} from "lucide-react"
import { AnalyticsLineChart } from "@/components/charts/line-chart"
import { AnalyticsBarChart } from "@/components/charts/bar-chart"
import { AnalyticsPieChart } from "@/components/charts/pie-chart"
import { generateMockData } from "@/lib/mock-data"

export default function AnalyticsPage() {
  const data = generateMockData()

  const advancedMetrics = [
    {
      title: "Customer Acquisition Cost",
      value: "$42.50",
      change: -8.2,
      changeType: "decrease" as const,
      description: "Average cost to acquire a new customer"
    },
    {
      title: "Lifetime Value",
      value: "$1,247",
      change: 15.3,
      changeType: "increase" as const,
      description: "Average customer lifetime value"
    },
    {
      title: "Churn Rate",
      value: "2.4%",
      change: -12.1,
      changeType: "decrease" as const,
      description: "Monthly customer churn rate"
    },
    {
      title: "Net Promoter Score",
      value: "72",
      change: 5.8,
      changeType: "increase" as const,
      description: "Customer satisfaction score"
    }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight gradient-text">Advanced Analytics</h1>
            <p className="text-muted-foreground">
              Deep insights into your business performance and customer behavior
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 days
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Advanced Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {advancedMetrics.map((metric, index) => (
            <Card key={index} className="card-hover border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold gradient-text">{metric.value}</div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={metric.changeType === "increase" ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {metric.changeType === "increase" ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(metric.change)}%
                    </Badge>
                    <span className="text-xs text-muted-foreground">vs last month</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <AnalyticsLineChart 
                data={data.lineChartData} 
                title="Performance Overview"
              />
              <AnalyticsPieChart 
                data={data.pieChartData} 
                title="Traffic Distribution"
              />
            </div>
            <AnalyticsBarChart 
              data={data.barChartData} 
              title="Device Performance Comparison"
            />
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid gap-6">
              <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyticsLineChart 
                    data={data.lineChartData} 
                    title="Revenue Trends"
                  />
                </CardContent>
              </Card>
              
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Revenue by Source</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {data.pieChartData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: item.fill }}
                            />
                            <span className="text-sm">{item.name}</span>
                          </div>
                          <span className="font-medium">${(item.value * 1000).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Monthly Targets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Current Month</span>
                        <span className="font-medium">$847K / $1M</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-gradient-to-r from-primary to-chart-1 h-2 rounded-full" style={{ width: '84.7%' }} />
                      </div>
                      <p className="text-xs text-muted-foreground">84.7% of monthly target achieved</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid gap-6">
              <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>User Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyticsLineChart 
                    data={data.lineChartData} 
                    title="User Growth Trends"
                  />
                </CardContent>
              </Card>
              
              <div className="grid gap-6 lg:grid-cols-3">
                <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      New Users
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold gradient-text">2,847</div>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </CardContent>
                </Card>
                
                <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      Retention Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold gradient-text">87.3%</div>
                    <p className="text-xs text-muted-foreground">30-day retention</p>
                  </CardContent>
                </Card>
                
                <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <DollarSign className="h-5 w-5 mr-2" />
                      Avg. Session Value
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold gradient-text">$34.20</div>
                    <p className="text-xs text-muted-foreground">Per session</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="grid gap-6">
              <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyticsBarChart 
                    data={data.barChartData} 
                    title="Campaign Effectiveness"
                  />
                </CardContent>
              </Card>
              
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Top Performing Campaigns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['Summer Sale 2024', 'Black Friday Campaign', 'New Product Launch'].map((campaign, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                          <span className="font-medium">{campaign}</span>
                          <Badge variant="default">
                            {(Math.random() * 10 + 5).toFixed(1)}% CTR
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Campaign ROI</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AnalyticsPieChart 
                      data={data.pieChartData} 
                      title="ROI Distribution"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
