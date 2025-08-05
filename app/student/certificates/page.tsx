"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useData } from "@/contexts/DataContext"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Award, Download, Share2, Search, Calendar, CheckCircle } from "lucide-react"

const StudentCertificates: React.FC = () => {
  const { user } = useAuth()
  const { courses, enrollments, getStudentEnrollments } = useData()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const studentEnrollments = user ? getStudentEnrollments(user.id) : []
  const completedCourses = studentEnrollments
    .filter((enrollment) => enrollment.status === "completed")
    .map((enrollment) => {
      const course = courses.find((c) => c.id === enrollment.courseId)
      return { ...enrollment, course }
    })
    .filter((item) => item.course)

  const filteredCertificates = completedCourses.filter((enrollment) => {
    const course = enrollment.course!
    return (
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleViewCertificate = (enrollment: any) => {
    setSelectedCertificate(enrollment)
    setIsViewDialogOpen(true)
  }

  const handleDownloadCertificate = (enrollment: any) => {
    // In a real app, this would generate and download a PDF certificate
    console.log("Downloading certificate for:", enrollment.course.title)
    alert("Certificate download started!")
  }

  const handleShareCertificate = (enrollment: any) => {
    // In a real app, this would generate a shareable link
    const shareUrl = `${window.location.origin}/certificates/${enrollment.id}`
    navigator.clipboard.writeText(shareUrl)
    alert("Certificate link copied to clipboard!")
  }

  const generateCertificateId = (enrollmentId: string) => {
    return `TC-${enrollmentId.slice(-8).toUpperCase()}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Certificates</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">View and download your course completion certificates</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Certificates</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{completedCourses.length}</p>
              </div>
              <Award className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {
                    completedCourses.filter((e) => {
                      const completedDate = new Date(e.completedAt || e.enrolledAt)
                      const thisMonth = new Date()
                      return (
                        completedDate.getMonth() === thisMonth.getMonth() &&
                        completedDate.getFullYear() === thisMonth.getFullYear()
                      )
                    }).length
                  }
                </p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {new Set(completedCourses.map((e) => e.course!.category)).size}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search certificates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map((enrollment) => {
          const course = enrollment.course!
          const certificateId = generateCertificateId(enrollment.id)

          return (
            <Card key={enrollment.id} className="bg-white dark:bg-gray-800 border-0 shadow-lg">
              <div className="relative h-48 rounded-t-lg overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Award className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-lg font-bold">Certificate of Completion</h3>
                    <p className="text-sm opacity-90">TechCraft Academy</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {course.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{course.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Instructor: {course.instructor}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Certificate ID: {certificateId}</p>
                </div>

                <div className="flex items-center justify-between mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Completed: {new Date(enrollment.completedAt || enrollment.enrolledAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewCertificate(enrollment)}
                    className="flex-1"
                  >
                    View
                  </Button>
                  <Button size="sm" onClick={() => handleDownloadCertificate(enrollment)}>
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleShareCertificate(enrollment)}>
                    <Share2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredCertificates.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {completedCourses.length === 0 ? "No certificates yet" : "No certificates found"}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {completedCourses.length === 0
              ? "Complete courses to earn certificates"
              : "Try adjusting your search to find certificates"}
          </p>
        </div>
      )}

      {/* Certificate View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Certificate Preview</DialogTitle>
          </DialogHeader>
          {selectedCertificate && (
            <div className="space-y-6">
              {/* Certificate Preview */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-lg border-2 border-dashed border-blue-200 dark:border-blue-800">
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <Award className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Certificate of Completion</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">This is to certify that</p>
                  </div>

                  <div>
                    <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{user?.name}</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400">has successfully completed the course</p>
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedCertificate.course.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Instructed by {selectedCertificate.course.instructor}
                    </p>
                  </div>

                  <div className="flex justify-between items-end pt-8">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Date of Completion</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {new Date(
                          selectedCertificate.completedAt || selectedCertificate.enrolledAt,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Certificate ID</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {generateCertificateId(selectedCertificate.id)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">TechCraft Academy</p>
                      <div className="w-20 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm">TC</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => handleShareCertificate(selectedCertificate)}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button onClick={() => handleDownloadCertificate(selectedCertificate)}>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default StudentCertificates
