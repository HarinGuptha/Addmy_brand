"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { BarChartData } from '@/types/analytics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AnalyticsBarChartProps {
  data: BarChartData[]
  title?: string
  className?: string
}

export function AnalyticsBarChart({ 
  data, 
  title = "Device Performance",
  className 
}: AnalyticsBarChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                className="stroke-muted" 
              />
              <XAxis 
                dataKey="name" 
                className="text-xs fill-muted-foreground"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-xs fill-muted-foreground"
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                labelStyle={{
                  color: 'hsl(var(--foreground))',
                  fontWeight: 'bold'
                }}
              />
              <Legend />
              <Bar
                dataKey="desktop"
                fill="hsl(var(--chart-1))"
                name="Desktop"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="mobile"
                fill="hsl(var(--chart-2))"
                name="Mobile"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="tablet"
                fill="hsl(var(--chart-3))"
                name="Tablet"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
