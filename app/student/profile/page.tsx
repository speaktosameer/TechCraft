"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useData } from "@/contexts/DataContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  BookOpen,
  Award,
  Clock,
  Target,
  Github,
  Linkedin,
  Twitter,
  Globe,
} from "lucide-react"
import Image from "next/image"

const StudentProfile: React.FC = () => {
  const { user, updateUser } = useAuth()
  const { courses, enrollments, getStudentEnrollments } = useData()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    bio: user?.bio || "",
    dateOfBirth: user?.dateOfBirth || "",
    occupation: user?.occupation || "",
    experience: user?.experience || "",
    interests: user?.interests?.join(", ") || "",
    goals: user?.goals || "",
    social: {
      github: user?.social?.github || "",
      linkedin: user?.social?.linkedin || "",
      twitter: user?.social?.twitter || "",
      website: user?.social?.website || "",
    },
  })

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

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...formData,
      interests: formData.interests
        .split(",")
        .map((interest) => interest.trim())
        .filter(Boolean),
    }
    updateUser(updatedUser)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      location: user?.location || "",
      bio: user?.bio || "",
      dateOfBirth: user?.dateOfBirth || "",
      occupation: user?.occupation || "",
      experience: user?.experience || "",
      interests: user?.interests?.join(", ") || "",
      goals: user?.goals || "",
      social: {
        github: user?.social?.github || "",
        linkedin: user?.social?.linkedin || "",
        twitter: user?.social?.twitter || "",
        website: user?.social?.website || "",
      },
    })
    setIsEditing(false)
  }

  const profileCompleteness = () => {
    const fields = [
      user?.name,
      user?.email,
      user?.phone,
      user?.location,
      user?.bio,
      user?.dateOfBirth,
      user?.occupation,
      user?.interests?.length,
      user?.goals,
    ]
    const completedFields = fields.filter(Boolean).length
    return Math.round((completedFields / fields.length) * 100)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your personal information and preferences</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={user?.avatar || "/placeholder.svg?height=96&width=96"}
                    alt={user?.name || "User"}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{user?.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{user?.occupation || "Student"}</p>

                {/* Profile Completeness */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Profile Completeness</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{profileCompleteness()}%</span>
                  </div>
                  <Progress value={profileCompleteness()} className="h-2" />
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{enrolledCourses.length}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Courses</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{completedCourses.length}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                  </div>
                </div>

                {/* Social Links */}
                {(user?.social?.github || user?.social?.linkedin || user?.social?.twitter || user?.social?.website) && (
                  <div className="flex justify-center space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    {user?.social?.github && (
                      <a
                        href={user.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {user?.social?.linkedin && (
                      <a
                        href={user.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-600"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {user?.social?.twitter && (
                      <a
                        href={user.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {user?.social?.website && (
                      <a
                        href={user.social.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Learning Stats */}
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg mt-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Learning Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Courses</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{enrolledCourses.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{completedCourses.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Learning Hours</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{completedHours}h</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Avg Progress</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {Math.round(totalProgress)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        {isEditing ? (
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center space-x-2 mt-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900 dark:text-white">{user?.name || "Not provided"}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email">Email</Label>
                        {isEditing ? (
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center space-x-2 mt-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900 dark:text-white">{user?.email || "Not provided"}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        {isEditing ? (
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center space-x-2 mt-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900 dark:text-white">{user?.phone || "Not provided"}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="location">Location</Label>
                        {isEditing ? (
                          <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center space-x-2 mt-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900 dark:text-white">{user?.location || "Not provided"}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        {isEditing ? (
                          <Input
                            id="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center space-x-2 mt-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900 dark:text-white">
                              {user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : "Not provided"}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="occupation">Occupation</Label>
                        {isEditing ? (
                          <Input
                            id="occupation"
                            value={formData.occupation}
                            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center space-x-2 mt-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900 dark:text-white">{user?.occupation || "Not provided"}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      {isEditing ? (
                        <Textarea
                          id="bio"
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          rows={3}
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white mt-2">{user?.bio || "No bio provided"}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="interests">Interests (comma-separated)</Label>
                      {isEditing ? (
                        <Input
                          id="interests"
                          value={formData.interests}
                          onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                          placeholder="Web Development, Design, AI, etc."
                        />
                      ) : (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {user?.interests?.length ? (
                            user.interests.map((interest, index) => (
                              <Badge key={index} variant="secondary">
                                {interest}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-gray-500 dark:text-gray-400">No interests specified</span>
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="goals">Learning Goals</Label>
                      {isEditing ? (
                        <Textarea
                          id="goals"
                          value={formData.goals}
                          onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                          rows={3}
                          placeholder="What do you want to achieve through learning?"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white mt-2">
                          {user?.goals || "No learning goals specified"}
                        </p>
                      )}
                    </div>

                    {/* Social Media */}
                    <div>
                      <Label>Social Media</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div>
                          <Label htmlFor="github" className="text-sm">
                            GitHub
                          </Label>
                          {isEditing ? (
                            <Input
                              id="github"
                              value={formData.social.github}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  social: { ...formData.social, github: e.target.value },
                                })
                              }
                              placeholder="https://github.com/username"
                            />
                          ) : (
                            <p className="text-gray-900 dark:text-white text-sm">
                              {user?.social?.github || "Not provided"}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="linkedin" className="text-sm">
                            LinkedIn
                          </Label>
                          {isEditing ? (
                            <Input
                              id="linkedin"
                              value={formData.social.linkedin}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  social: { ...formData.social, linkedin: e.target.value },
                                })
                              }
                              placeholder="https://linkedin.com/in/username"
                            />
                          ) : (
                            <p className="text-gray-900 dark:text-white text-sm">
                              {user?.social?.linkedin || "Not provided"}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="twitter" className="text-sm">
                            Twitter
                          </Label>
                          {isEditing ? (
                            <Input
                              id="twitter"
                              value={formData.social.twitter}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  social: { ...formData.social, twitter: e.target.value },
                                })
                              }
                              placeholder="https://twitter.com/username"
                            />
                          ) : (
                            <p className="text-gray-900 dark:text-white text-sm">
                              {user?.social?.twitter || "Not provided"}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="website" className="text-sm">
                            Website
                          </Label>
                          {isEditing ? (
                            <Input
                              id="website"
                              value={formData.social.website}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  social: { ...formData.social, website: e.target.value },
                                })
                              }
                              placeholder="https://yourwebsite.com"
                            />
                          ) : (
                            <p className="text-gray-900 dark:text-white text-sm">
                              {user?.social?.website || "Not provided"}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="learning">
              <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                    Learning Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Progress Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{enrolledCourses.length}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Enrolled Courses</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                        <Award className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedCourses.length}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                        <Clock className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedHours}h</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Learning Hours</p>
                      </div>
                    </div>

                    {/* Course Progress */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Course Progress</h3>
                      <div className="space-y-4">
                        {enrolledCourses.map((enrollment) => (
                          <div
                            key={enrollment.id}
                            className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
                          >
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                              <Image
                                src={enrollment.course!.image || "/placeholder.svg?height=48&width=48"}
                                alt={enrollment.course!.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                {enrollment.course!.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {enrollment.course!.instructor}
                              </p>
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
                            <Badge
                              variant={enrollment.status === "completed" ? "default" : "secondary"}
                              className={
                                enrollment.status === "completed"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                  : ""
                              }
                            >
                              {enrollment.status}
                            </Badge>
                          </div>
                        ))}
                        {enrolledCourses.length === 0 && (
                          <div className="text-center py-8">
                            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">No courses enrolled yet</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Mock activity data */}
                    {[
                      {
                        type: "enrollment",
                        title: "Enrolled in Full Stack Web Development",
                        date: "2024-02-10",
                        icon: BookOpen,
                      },
                      {
                        type: "completion",
                        title: "Completed React Fundamentals module",
                        date: "2024-02-08",
                        icon: Award,
                      },
                      {
                        type: "progress",
                        title: "Made progress in UI/UX Design course",
                        date: "2024-02-05",
                        icon: Target,
                      },
                    ].map((activity, index) => {
                      const Icon = activity.icon
                      return (
                        <div
                          key={index}
                          className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                        >
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                            <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(activity.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default StudentProfile
