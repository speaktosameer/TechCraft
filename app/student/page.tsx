"use client"

import type React from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useData } from "@/contexts/DataContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Award, TrendingUp, Play, CheckCircle, Calendar, Target } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const StudentDashboard: React.FC = () => {
  const { user } = useAuth()
  const { courses, enrollments, getStudentEnrollments } = useData()

  const studentEnrollments = user ? getStudentEnrollments(user.id) : []
  const enrolledCourses = studentEnrollments
    .map((enrollment) => {
      const course = courses.find((c) => c.id === enrollment.courseId)
      return { ...enrollment, course }
    })
    .filter((item) => item.course)

  const completedCourses = enrolledCourses.filter((e) => e.status === "completed")
  const activeCourses = enrolledCourses.filter((e) => e.status === "active")
  const totalProgress =
    enrolledCourses.length > 0 ? enrolledCourses.reduce((sum, e) => sum + e.progress, 0) / enrolledCourses.length : 0

  const stats = [
    {
      title: "Enrolled Courses",
      value: enrolledCourses.length,
      icon: BookOpen,
      color: "bg-blue-500",
      description: "Total courses enrolled",
    },
    {
      title: "Completed Courses",
      value: completedCourses.length,
      icon: Award,
      color: "bg-green-500",
      description: "Successfully completed",
    },
    {
      title: "Learning Hours",
      value: `${enrolledCourses.length * 40}h`, // Estimated
      icon: Clock,
      color: "bg-purple-500",
      description: "Total learning time",
    },
    {
      title: "Average Progress",
      value: `${Math.round(totalProgress)}%`,
      icon: TrendingUp,
      color: "bg-yellow-500",
      description: "Across all courses",
    },
  ]

  const recentActivity = [
    {
      type: "lesson_completed",
      title: "Completed React Fundamentals",
      course: "Full Stack Web Development",
      time: "2 hours ago",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      type: "course_started",
      title: "Started new module",
      course: "UI/UX Design Masterclass",
      time: "1 day ago",
      icon: Play,
      color: "text-blue-600",
    },
    {
      type: "assignment_submitted",
      title: "Submitted final project",
      course: "Mobile App Development",
      time: "3 days ago",
      icon: Target,
      color: "text-purple-600",
    },
  ]

  const upcomingDeadlines = [
    {
      title: "React Project Submission",
      course: "Full Stack Web Development",
      dueDate: "2024-02-15",
      priority: "high",
    },
    {
      title: "Design Portfolio Review",
      course: "UI/UX Design Masterclass",
      dueDate: "2024-02-20",
      priority: "medium",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name?.split(" ")[0]}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Continue your learning journey and track your progress.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/courses">
            <Button>
              <BookOpen className="w-4 h-4 mr-2" />
              Browse Courses
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="bg-white dark:bg-gray-800 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.description}</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Continue Learning */}
        <div className="lg:col-span-2">
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Continue Learning</CardTitle>
              <Link href="/student/courses">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {activeCourses.length > 0 ? (
                <div className="space-y-4">
                  {activeCourses.slice(0, 3).map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={enrollment.course?.image || "/placeholder.svg"}
                          alt={enrollment.course?.title || "Course"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {enrollment.course?.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{enrollment.course?.instructor}</p>
                        <div className="mt-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Progress</span>
                            <span className="text-xs font-medium text-gray-900 dark:text-white">
                              {enrollment.progress}%
                            </span>
                          </div>
                          <Progress value={enrollment.progress} className="h-2" />
                        </div>
                      </div>
                      <Link href={`/courses/${enrollment.courseId}`}>
                        <Button size="sm">
                          <Play className="w-4 h-4 mr-2" />
                          Continue
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No active courses</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Start learning by enrolling in a course</p>
                  <Link href="/courses">
                    <Button>Browse Courses</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center`}
                      >
                        <Icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{activity.course}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Deadlines */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingDeadlines.length > 0 ? (
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                  >
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{deadline.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{deadline.course}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={deadline.priority === "high" ? "destructive" : "secondary"}>
                        {new Date(deadline.dueDate).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No upcoming deadlines</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedCourses.length > 0 && (
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <Award className="w-8 h-8 text-green-600 dark:text-green-400" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Course Completion</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Completed {completedCourses.length} course{completedCourses.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              )}

              {enrolledCourses.length >= 3 && (
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Learning Enthusiast</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Enrolled in {enrolledCourses.length} courses
                    </p>
                  </div>
                </div>
              )}

              {enrolledCourses.length === 0 && (
                <div className="text-center py-8">
                  <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">Complete courses to earn achievements</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default StudentDashboard
