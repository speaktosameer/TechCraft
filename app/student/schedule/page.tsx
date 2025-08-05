"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useData } from "@/contexts/DataContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, BookOpen, Video, Users, ChevronLeft, ChevronRight } from "lucide-react"

const StudentSchedule: React.FC = () => {
  const { user } = useAuth()
  const { courses, enrollments, getStudentEnrollments } = useData()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"week" | "month">("week")

  const studentEnrollments = user ? getStudentEnrollments(user.id) : []
  const activeCourses = studentEnrollments
    .filter((enrollment) => enrollment.status === "active")
    .map((enrollment) => {
      const course = courses.find((c) => c.id === enrollment.courseId)
      return { ...enrollment, course }
    })
    .filter((item) => item.course)

  // Mock schedule data - in a real app, this would come from the backend
  const scheduleEvents = [
    {
      id: "1",
      title: "React Fundamentals - Live Session",
      courseId: activeCourses[0]?.courseId,
      courseName: activeCourses[0]?.course?.title,
      type: "live_session",
      date: new Date(2024, 1, 15, 14, 0), // Feb 15, 2024, 2:00 PM
      duration: 90, // minutes
      instructor: activeCourses[0]?.course?.instructor,
      meetingLink: "https://zoom.us/j/123456789",
    },
    {
      id: "2",
      title: "Assignment Due: Portfolio Project",
      courseId: activeCourses[1]?.courseId,
      courseName: activeCourses[1]?.course?.title,
      type: "assignment",
      date: new Date(2024, 1, 18, 23, 59), // Feb 18, 2024, 11:59 PM
      duration: 0,
    },
    {
      id: "3",
      title: "UI/UX Design Workshop",
      courseId: activeCourses[2]?.courseId,
      courseName: activeCourses[2]?.course?.title,
      type: "workshop",
      date: new Date(2024, 1, 20, 10, 0), // Feb 20, 2024, 10:00 AM
      duration: 180, // minutes
      instructor: activeCourses[2]?.course?.instructor,
    },
    {
      id: "4",
      title: "Study Group: JavaScript Advanced Concepts",
      courseId: activeCourses[0]?.courseId,
      courseName: activeCourses[0]?.course?.title,
      type: "study_group",
      date: new Date(2024, 1, 22, 19, 0), // Feb 22, 2024, 7:00 PM
      duration: 120, // minutes
    },
  ]

  const getWeekDates = (date: Date) => {
    const week = []
    const startDate = new Date(date)
    const day = startDate.getDay()
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is sunday
    startDate.setDate(diff)

    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate)
      day.setDate(startDate.getDate() + i)
      week.push(day)
    }
    return week
  }

  const weekDates = getWeekDates(currentDate)

  const getEventsForDate = (date: Date) => {
    return scheduleEvents.filter((event) => {
      const eventDate = new Date(event.date)
      return eventDate.toDateString() === date.toDateString()
    })
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "live_session":
        return <Video className="w-4 h-4" />
      case "assignment":
        return <BookOpen className="w-4 h-4" />
      case "workshop":
        return <Users className="w-4 h-4" />
      case "study_group":
        return <Users className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "live_session":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "assignment":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "workshop":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "study_group":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7))
    setCurrentDate(newDate)
  }

  const todayEvents = getEventsForDate(new Date())
  const upcomingEvents = scheduleEvents
    .filter((event) => event.date > new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Schedule</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your learning schedule and upcoming events</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant={viewMode === "week" ? "default" : "outline"} size="sm" onClick={() => setViewMode("week")}>
            Week
          </Button>
          <Button variant={viewMode === "month" ? "default" : "outline"} size="sm" onClick={() => setViewMode("month")}>
            Month
          </Button>
        </div>
      </div>

      {/* Today's Events */}
      {todayEvents.length > 0 && (
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Today's Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center space-x-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20"
                >
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full text-white">
                    {getEventTypeIcon(event.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{event.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{event.courseName}</p>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{event.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                      </div>
                      {event.duration > 0 && <span>{event.duration} minutes</span>}
                    </div>
                  </div>
                  <Badge className={getEventTypeColor(event.type)}>{event.type.replace("_", " ")}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  {viewMode === "week" ? "Weekly Schedule" : "Monthly Schedule"}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => navigateWeek("prev")}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium text-gray-900 dark:text-white px-3">
                    {weekDates[0].toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </span>
                  <Button variant="outline" size="sm" onClick={() => navigateWeek("next")}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === "week" && (
                <div className="space-y-4">
                  {weekDates.map((date, index) => {
                    const dayEvents = getEventsForDate(date)
                    const isToday = date.toDateString() === new Date().toDateString()

                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          isToday
                            ? "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-gray-700"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`text-center ${isToday ? "text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-white"}`}
                            >
                              <p className="text-sm font-medium">
                                {date.toLocaleDateString("en-US", { weekday: "short" })}
                              </p>
                              <p className="text-lg font-bold">{date.getDate()}</p>
                            </div>
                          </div>
                          {dayEvents.length > 0 && (
                            <Badge variant="secondary">
                              {dayEvents.length} event{dayEvents.length !== 1 ? "s" : ""}
                            </Badge>
                          )}
                        </div>

                        {dayEvents.length > 0 ? (
                          <div className="space-y-2">
                            {dayEvents.map((event) => (
                              <div
                                key={event.id}
                                className="flex items-center space-x-3 p-2 rounded bg-white dark:bg-gray-700"
                              >
                                <div className="flex items-center justify-center w-6 h-6 bg-gray-100 dark:bg-gray-600 rounded text-gray-600 dark:text-gray-300">
                                  {getEventTypeIcon(event.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {event.title}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {event.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    {event.duration > 0 && ` • ${event.duration}m`}
                                  </p>
                                </div>
                                <Badge className={getEventTypeColor(event.type)} variant="secondary">
                                  {event.type.replace("_", " ")}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                            No events scheduled
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div>
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <div className="flex items-start space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full text-white">
                          {getEventTypeIcon(event.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{event.courseName}</p>
                          <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <Calendar className="w-3 h-3" />
                            <span>{event.date.toLocaleDateString()}</span>
                            <Clock className="w-3 h-3" />
                            <span>{event.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                          </div>
                          {event.meetingLink && (
                            <Button size="sm" variant="outline" className="mt-2 h-6 text-xs bg-transparent" asChild>
                              <a href={event.meetingLink} target="_blank" rel="noopener noreferrer">
                                Join Meeting
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No upcoming events</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg mt-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Live Sessions</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {scheduleEvents.filter((e) => e.type === "live_session").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Assignments Due</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {scheduleEvents.filter((e) => e.type === "assignment").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Workshops</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {scheduleEvents.filter((e) => e.type === "workshop").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Study Groups</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {scheduleEvents.filter((e) => e.type === "study_group").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default StudentSchedule
