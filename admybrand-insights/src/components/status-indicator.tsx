"use client"

import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff } from "lucide-react"

interface StatusIndicatorProps {
  isConnected: boolean
  lastUpdated: string
}

export function StatusIndicator({ isConnected, lastUpdated }: StatusIndicatorProps) {
  return (
    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
      <Badge 
        variant={isConnected ? "default" : "destructive"}
        className="flex items-center space-x-1 px-2 py-1"
      >
        {isConnected ? (
          <Wifi className="h-3 w-3" />
        ) : (
          <WifiOff className="h-3 w-3" />
        )}
        <span>{isConnected ? "Live" : "Offline"}</span>
      </Badge>
      <span>Last updated: {lastUpdated}</span>
    </div>
  )
}
