"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useData } from "@/contexts/DataContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Clock, Award, TrendingUp, Target, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const StudentProgress: React.FC = () => {
  const { user } = useAuth()
  const { courses, enrollments, getStudentEnrollments } = useData()
  const [timeRange, setTimeRange] = useState("30d")

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

  const totalHours = enrolledCourses.reduce((sum, e) => sum + (e.course!.duration || 0), 0)
  const completedHours = completedCourses.reduce((sum, e) => sum + (e.course!.duration || 0), 0)

  // Mock learning streak data
  const learningStreak = 15
  const weeklyGoal = 10 // hours
  const weeklyProgress = 7.5 // hours completed this week

  // Mock activity data for the chart
  const activityData = [
    { day: "Mon", hours: 2 },
    { day: "Tue", hours: 1.5 },
    { day: "Wed", hours: 3 },
    { day: "Thu", hours: 0.5 },
    { day: "Fri", hours: 2.5 },
    { day: "Sat", hours: 1 },
    { day: "Sun", hours: 2 },
  ]

  const achievements = [
    {
      title: "First Course Completed",
      description: "Completed your first course",
      icon: Award,
      earned: completedCourses.length > 0,
      date: completedCourses.length > 0 ? completedCourses[0].completedAt : null,
    },
    {
      title: "Learning Streak",
      description: "Maintained a 7-day learning streak",
      icon: Target,
      earned: learningStreak >= 7,
      date: new Date().toISOString(),
    },
    {
      title: "Course Collector",
      description: "Enrolled in 3 or more courses",
      icon: BookOpen,
      earned: enrolledCourses.length >= 3,
      date: enrolledCourses.length >= 3 ? enrolledCourses[2].enrolledAt : null,
    },
    {
      title: "Dedicated Learner",
      description: "Completed 50+ hours of learning",
      icon: Clock,
      earned: completedHours >= 50,
      date: completedHours >= 50 ? new Date().toISOString() : null,
    },
  ]

  const earnedAchievements = achievements.filter((a) => a.earned)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Learning Progress</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track your learning journey and achievements</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7 Days</SelectItem>
            <SelectItem value="30d">30 Days</SelectItem>
            <SelectItem value="90d">90 Days</SelectItem>
            <SelectItem value="1y">1 Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overall Progress</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{Math.round(totalProgress)}%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Across all courses</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Learning Streak</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{learningStreak}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Days in a row</p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hours Completed</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{completedHours}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">of {totalHours} total hours</p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Achievements</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{earnedAchievements.length}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">of {achievements.length} earned</p>
              </div>
              <Award className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Goal */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Learning Hours</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {weeklyProgress} / {weeklyGoal} hours
                </span>
              </div>
              <Progress value={(weeklyProgress / weeklyGoal) * 100} className="h-3" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  {Math.round(((weeklyGoal - weeklyProgress) / weeklyGoal) * 100)}% remaining
                </span>
                <span className="text-green-600 dark:text-green-400 font-medium">
                  {weeklyProgress >= weeklyGoal
                    ? "Goal achieved! 🎉"
                    : `${(weeklyGoal - weeklyProgress).toFixed(1)}h to go`}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityData.map((day, index) => (
                <div key={day.day} className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-8">{day.day}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(day.hours / 3) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">{day.hours}h</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Course Progress */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Course Progress</CardTitle>
            <Link href="/student/courses">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeCourses.slice(0, 4).map((enrollment) => (
                <div key={enrollment.id} className="flex items-center space-x-4">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                    <Image
                      src={enrollment.course!.image || "/placeholder.svg?height=48&width=48"}
                      alt={enrollment.course!.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {enrollment.course!.title}
                    </h4>
                    <div className="mt-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Progress</span>
                        <span className="text-xs font-medium text-gray-900 dark:text-white">
                          {enrollment.progress}%
                        </span>
                      </div>
                      <Progress value={enrollment.progress} className="h-1.5" />
                    </div>
                  </div>
                </div>
              ))}
              {activeCourses.length === 0 && (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No active courses</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Recent Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {earnedAchievements.slice(0, 4).map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20"
                  >
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">{achievement.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{achievement.description}</p>
                      {achievement.date && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          Earned {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
              {earnedAchievements.length === 0 && (
                <div className="text-center py-8">
                  <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No achievements yet</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Complete courses to earn achievements</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Achievements */}
      <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">All Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    achievement.earned
                      ? "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20"
                      : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        achievement.earned
                          ? "bg-yellow-500 text-white"
                          : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    {achievement.earned && <CheckCircle className="w-5 h-5 text-green-500" />}
                  </div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">{achievement.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{achievement.description}</p>
                  {achievement.earned && achievement.date && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      Earned {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StudentProgress
