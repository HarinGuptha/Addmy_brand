"use client"

import { useState, useEffect, useCallback } from "react"
import { Search, Clock, TrendingUp, Users, BarChart3, Command } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SearchResult {
  id: string
  title: string
  description: string
  category: 'campaigns' | 'metrics' | 'users' | 'reports'
  icon: React.ComponentType<{ className?: string }>
  href: string
}

const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    title: 'Summer Sale Campaign',
    description: 'High-performing campaign with 15.3% conversion rate',
    category: 'campaigns',
    icon: TrendingUp,
    href: '/campaigns/summer-sale'
  },
  {
    id: '2',
    title: 'Monthly Active Users',
    description: 'Track user engagement and retention metrics',
    category: 'metrics',
    icon: Users,
    href: '/analytics/users'
  },
  {
    id: '3',
    title: 'Revenue Analytics',
    description: 'Comprehensive revenue tracking and forecasting',
    category: 'reports',
    icon: BarChart3,
    href: '/analytics/revenue'
  },
  {
    id: '4',
    title: 'User Segmentation',
    description: 'Analyze user behavior and create segments',
    category: 'users',
    icon: Users,
    href: '/users/segments'
  },
]

interface GlobalSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recent-searches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Filter results based on query
  useEffect(() => {
    if (query.trim()) {
      const filtered = mockSearchResults.filter(
        result =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.description.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
      setSelectedIndex(0)
    } else {
      setResults([])
    }
  }, [query])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!open) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (results[selectedIndex]) {
          handleSelectResult(results[selectedIndex])
        }
        break
      case 'Escape':
        onOpenChange(false)
        break
    }
  }, [open, results, selectedIndex, onOpenChange])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const handleSelectResult = (result: SearchResult) => {
    // Add to recent searches
    const newRecentSearches = [result.title, ...recentSearches.filter(s => s !== result.title)].slice(0, 5)
    setRecentSearches(newRecentSearches)
    localStorage.setItem('recent-searches', JSON.stringify(newRecentSearches))
    
    // Navigate to result (you would implement actual navigation here)
    console.log('Navigate to:', result.href)
    onOpenChange(false)
    setQuery("")
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'campaigns': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'metrics': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'users': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
      case 'reports': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader className="px-6 py-4 border-b border-border/50">
          <DialogTitle className="sr-only">Global Search</DialogTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns, metrics, users..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-20 h-12 text-lg border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <Badge variant="outline" className="text-xs">
                <Command className="h-3 w-3 mr-1" />
                K
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="max-h-96 overflow-y-auto">
          {query.trim() === "" && recentSearches.length > 0 && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Recent Searches
              </h3>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start h-auto p-2 text-left"
                    onClick={() => setQuery(search)}
                  >
                    <Clock className="h-4 w-4 mr-3 text-muted-foreground" />
                    {search}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div className="p-2">
              {results.map((result, index) => {
                const Icon = result.icon
                return (
                  <Button
                    key={result.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start h-auto p-4 text-left rounded-lg mb-1",
                      index === selectedIndex && "bg-muted"
                    )}
                    onClick={() => handleSelectResult(result)}
                  >
                    <div className="flex items-start space-x-3 w-full">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium truncate">{result.title}</p>
                          <Badge className={cn("text-xs", getCategoryColor(result.category))}>
                            {result.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {result.description}
                        </p>
                      </div>
                    </div>
                  </Button>
                )
              })}
            </div>
          )}

          {query.trim() !== "" && results.length === 0 && (
            <div className="p-8 text-center">
              <Search className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No results found for "{query}"</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try searching for campaigns, metrics, or users
              </p>
            </div>
          )}
        </div>

        <div className="px-4 py-3 border-t border-border/50 bg-muted/30">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Badge variant="outline" className="mr-1">↑↓</Badge>
                Navigate
              </span>
              <span className="flex items-center">
                <Badge variant="outline" className="mr-1">↵</Badge>
                Select
              </span>
              <span className="flex items-center">
                <Badge variant="outline" className="mr-1">Esc</Badge>
                Close
              </span>
            </div>
            <span>{results.length} results</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
