"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  DollarSign, 
  Users, 
  Target, 
  TrendingUp, 
  TrendingDown,
  LucideIcon
} from "lucide-react"
import { MetricCard } from "@/types/analytics"
import { cn } from "@/lib/utils"

const iconMap: Record<string, LucideIcon> = {
  DollarSign,
  Users,
  Target,
  TrendingUp,
}

interface MetricsCardProps {
  metric: MetricCard
  className?: string
}

export function MetricsCard({ metric, className }: MetricsCardProps) {
  const Icon = iconMap[metric.icon] || TrendingUp
  const isPositive = metric.changeType === 'increase'

  return (
    <Card className={cn(
      "relative overflow-hidden card-hover group border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm",
      "shadow-lg hover:shadow-2xl transition-all duration-500",
      "before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/10 before:via-transparent before:to-chart-1/10",
      "before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          {metric.title}
        </CardTitle>
        <div className={cn(
          "h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-chart-1/20 flex items-center justify-center",
          "group-hover:from-primary/30 group-hover:to-chart-1/30 transition-all duration-300",
          "group-hover:scale-110 group-hover:rotate-3"
        )}>
          <Icon className="h-5 w-5 text-primary group-hover:text-primary/80 transition-colors" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-3">
          <div className="text-3xl font-bold tracking-tight gradient-text group-hover:scale-105 transition-transform duration-300">
            {metric.value}
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              variant={isPositive ? "default" : "destructive"}
              className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                "shadow-sm transition-all duration-300 group-hover:shadow-md",
                isPositive
                  ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-700 dark:text-green-400 border-green-500/30"
                  : "bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-700 dark:text-red-400 border-red-500/30"
              )}
            >
              <div className="flex items-center space-x-1">
                {isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{Math.abs(metric.change)}%</span>
              </div>
            </Badge>
            <span className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors">
              vs last month
            </span>
          </div>
          <p className="text-xs text-muted-foreground group-hover:text-foreground/60 transition-colors">
            {metric.description}
          </p>
        </div>
      </CardContent>

      {/* Animated shimmer effect */}
      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 via-chart-1/5 to-chart-2/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
    </Card>
  )
}

interface MetricsGridProps {
  metrics: MetricCard[]
  className?: string
}

export function MetricsGrid({ metrics, className }: MetricsGridProps) {
  return (
    <div className={cn(
      "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
      className
    )}>
      {metrics.map((metric, index) => (
        <MetricsCard 
          key={metric.id} 
          metric={metric}
          className={cn(
            "animate-in fade-in-0 slide-in-from-bottom-4",
            `animation-delay-${index * 100}`
          )}
        />
      ))}
    </div>
  )
}
