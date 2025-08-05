"use client"

import type React from "react"
import { useState } from "react"
import { useData } from "@/contexts/DataContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  FolderOpen,
  BookOpen,
  MessageSquare,
  Star,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

const AdminDashboard: React.FC = () => {
  const { projects, services, testimonials, team, messages, courses, enrollments } = useData()
  const [timeRange, setTimeRange] = useState("7d")

  // Calculate stats
  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      icon: FolderOpen,
      color: "bg-blue-500",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Active Courses",
      value: courses.filter((c) => c.status === "active").length,
      icon: BookOpen,
      color: "bg-green-500",
      change: "+8%",
      changeType: "positive",
    },
    {
      title: "Total Students",
      value: enrollments.length,
      icon: Users,
      color: "bg-purple-500",
      change: "+23%",
      changeType: "positive",
    },
    {
      title: "Revenue",
      value: `$${enrollments
        .reduce((sum, e) => {
          const course = courses.find((c) => c.id === e.courseId)
          return sum + (course?.price || 0)
        }, 0)
        .toLocaleString()}`,
      icon: DollarSign,
      color: "bg-yellow-500",
      change: "+15%",
      changeType: "positive",
    },
    {
      title: "New Messages",
      value: messages.filter((m) => m.status === "new").length,
      icon: MessageSquare,
      color: "bg-red-500",
      change: "+5",
      changeType: "neutral",
    },
    {
      title: "Team Members",
      value: team.length,
      icon: Users,
      color: "bg-indigo-500",
      change: "0%",
      changeType: "neutral",
    },
  ]

  const recentMessages = messages.slice(-5).reverse()
  const recentEnrollments = enrollments.slice(-5).reverse()
  const topCourses = courses
    .filter((c) => c.status === "active")
    .sort((a, b) => b.studentsEnrolled - a.studentsEnrolled)
    .slice(0, 5)

  const projectsByStatus = {
    completed: projects.filter((p) => p.status === "completed").length,
    "in-progress": projects.filter((p) => p.status === "in-progress").length,
    active: projects.filter((p) => p.status === "active").length,
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant={timeRange === "7d" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("7d")}>
            7 Days
          </Button>
          <Button variant={timeRange === "30d" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("30d")}>
            30 Days
          </Button>
          <Button variant={timeRange === "90d" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("90d")}>
            90 Days
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="bg-white dark:bg-gray-800 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <span
                        className={`text-sm font-medium ${
                          stat.changeType === "positive"
                            ? "text-green-600"
                            : stat.changeType === "negative"
                              ? "text-red-600"
                              : "text-gray-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">vs last period</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Messages */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Recent Messages</CardTitle>
            <Link href="/admin/messages">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentMessages.length > 0 ? (
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{message.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{message.name}</h4>
                        <Badge
                          variant={
                            message.status === "new" ? "default" : message.status === "read" ? "secondary" : "outline"
                          }
                        >
                          {message.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{message.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {new Date(message.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No messages yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Courses */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Top Courses</CardTitle>
            <Link href="/admin/courses">
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {topCourses.length > 0 ? (
              <div className="space-y-4">
                {topCourses.map((course, index) => (
                  <div
                    key={course.id}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">{course.title}</h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {course.studentsEnrolled} students
                        </span>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">${course.price}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{course.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No courses available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Project Status */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Project Status</CardTitle>
            <Link href="/admin/projects">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="font-medium text-gray-900 dark:text-white">Completed</span>
                </div>
                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                  {projectsByStatus.completed}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-gray-900 dark:text-white">In Progress</span>
                </div>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {projectsByStatus["in-progress"]}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  <span className="font-medium text-gray-900 dark:text-white">Active</span>
                </div>
                <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                  {projectsByStatus.active}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Enrollments */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Recent Enrollments</CardTitle>
            <Badge variant="secondary">{enrollments.length} total</Badge>
          </CardHeader>
          <CardContent>
            {recentEnrollments.length > 0 ? (
              <div className="space-y-4">
                {recentEnrollments.map((enrollment) => {
                  const course = courses.find((c) => c.id === enrollment.courseId)
                  return (
                    <div
                      key={enrollment.id}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {course?.title || "Unknown Course"}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Progress: {enrollment.progress}%
                          </span>
                          <Badge variant={enrollment.status === "completed" ? "default" : "secondary"}>
                            {enrollment.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No enrollments yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/admin/projects">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
              >
                <FolderOpen className="w-6 h-6" />
                <span className="text-sm">Add Project</span>
              </Button>
            </Link>

            <Link href="/admin/courses">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
              >
                <BookOpen className="w-6 h-6" />
                <span className="text-sm">Create Course</span>
              </Button>
            </Link>

            <Link href="/admin/team">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
              >
                <Users className="w-6 h-6" />
                <span className="text-sm">Add Team Member</span>
              </Button>
            </Link>

            <Link href="/admin/messages">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
              >
                <MessageSquare className="w-6 h-6" />
                <span className="text-sm">View Messages</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminDashboard
