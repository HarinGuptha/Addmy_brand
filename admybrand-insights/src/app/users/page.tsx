"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Activity,
  TrendingUp,
  Shield,
  Crown,
  User
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const mockUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "",
    role: "Admin",
    status: "Active",
    lastActive: "2 hours ago",
    location: "New York, USA",
    joinDate: "Jan 2024",
    totalSpent: "$2,847",
    orders: 12
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    avatar: "",
    role: "Manager",
    status: "Active",
    lastActive: "5 minutes ago",
    location: "San Francisco, USA",
    joinDate: "Mar 2024",
    totalSpent: "$1,234",
    orders: 8
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    avatar: "",
    role: "User",
    status: "Inactive",
    lastActive: "2 days ago",
    location: "Los Angeles, USA",
    joinDate: "Feb 2024",
    totalSpent: "$567",
    orders: 3
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@example.com",
    avatar: "",
    role: "User",
    status: "Active",
    lastActive: "1 hour ago",
    location: "Seattle, USA",
    joinDate: "Apr 2024",
    totalSpent: "$3,456",
    orders: 15
  }
]

const userStats = [
  {
    title: "Total Users",
    value: "24,847",
    change: 12.5,
    icon: Users
  },
  {
    title: "Active Users",
    value: "18,234",
    change: 8.2,
    icon: Activity
  },
  {
    title: "New This Month",
    value: "2,847",
    change: 15.3,
    icon: UserPlus
  },
  {
    title: "User Growth",
    value: "23.4%",
    change: 5.7,
    icon: TrendingUp
  }
]

export default function UsersPage() {
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Admin': return Crown
      case 'Manager': return Shield
      default: return User
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
      case 'Manager': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight gradient-text">User Management</h1>
            <p className="text-muted-foreground">
              Manage users, roles, and track user activity across your platform
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button className="bg-gradient-to-r from-primary to-chart-1">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {userStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="card-hover border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="default" className="text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change}%
                    </Badge>
                    <span className="text-xs text-muted-foreground">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* User Management Tabs */}
        <Tabs defaultValue="all-users" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all-users">All Users</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="admins">Admins</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>

          <TabsContent value="all-users" className="space-y-4">
            <div className="grid gap-4">
              {mockUsers.map((user) => {
                const RoleIcon = getRoleIcon(user.role)
                return (
                  <Card key={user.id} className="card-hover border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-chart-1/20">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold">{user.name}</h3>
                              <Badge className={getRoleBadgeColor(user.role)}>
                                <RoleIcon className="h-3 w-3 mr-1" />
                                {user.role}
                              </Badge>
                              <Badge className={getStatusBadgeColor(user.status)}>
                                {user.status}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <Mail className="h-3 w-3 mr-1" />
                                {user.email}
                              </span>
                              <span className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {user.location}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                Joined {user.joinDate}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <div className="font-semibold">{user.totalSpent}</div>
                            <div className="text-sm text-muted-foreground">{user.orders} orders</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">Last active</div>
                            <div className="text-sm text-muted-foreground">{user.lastActive}</div>
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit User</DropdownMenuItem>
                              <DropdownMenuItem>Send Message</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Active Users</h3>
              <p className="text-muted-foreground">Showing users who have been active in the last 7 days</p>
            </div>
          </TabsContent>

          <TabsContent value="inactive" className="space-y-4">
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Inactive Users</h3>
              <p className="text-muted-foreground">Users who haven't been active recently</p>
            </div>
          </TabsContent>

          <TabsContent value="admins" className="space-y-4">
            <div className="text-center py-8">
              <Crown className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Admin Users</h3>
              <p className="text-muted-foreground">Users with administrative privileges</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
