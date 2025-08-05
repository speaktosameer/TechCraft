import type React from "react"
import { useData } from "../../contexts/DataContext"

const AdminDashboard: React.FC = () => {
  const { projects, services, testimonials, team, messages, courses } = useData()

  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      change: "+12%",
      icon: "🚀",
      color: "text-blue-600",
    },
    {
      title: "Active Courses",
      value: courses.filter((c) => c.status === "active").length,
      change: "+3",
      icon: "📚",
      color: "text-purple-600",
    },
    {
      title: "Services",
      value: services.length,
      change: "+5%",
      icon: "⚙️",
      color: "text-green-600",
    },
    {
      title: "New Messages",
      value: messages.filter((m) => m.status === "new").length,
      change: "+8",
      icon: "💬",
      color: "text-orange-600",
    },
  ]

  const recentProjects = projects.slice(0, 4)
  const recentMessages = messages.slice(0, 4)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">{stat.change} from last month</p>
              </div>
              <div className={`text-3xl ${stat.color}`}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Projects</h2>
            <span className="text-2xl">🚀</span>
          </div>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{project.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{project.category}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.slice(0, 2).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="ml-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Courses</h2>
            <span className="text-2xl">📚</span>
          </div>
          <div className="space-y-4">
            {courses.slice(0, 4).map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{course.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{course.category}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">👨‍🏫 {course.instructor}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      👥 {course.studentsEnrolled} students
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">⭐ {course.rating}</span>
                  </div>
                </div>
                <div className="ml-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      course.status === "active"
                        ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400"
                        : course.status === "draft"
                          ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400"
                          : "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Messages</h2>
            <span className="text-2xl">💬</span>
          </div>
          <div className="space-y-4">
            {recentMessages.length > 0 ? (
              recentMessages.map((message) => (
                <div key={message.id} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                      {message.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-white">{message.name}</h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(message.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{message.message}</p>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                        message.status === "new"
                          ? "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400"
                          : message.status === "read"
                            ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400"
                            : "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400"
                      }`}
                    >
                      {message.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No messages yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <div className="text-3xl mb-2">🚀</div>
            <h3 className="font-medium text-gray-900 dark:text-white">New Project</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Create a new project</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center cursor-pointer hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="font-medium text-gray-900 dark:text-white">Add Team Member</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Invite new team member</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
            <div className="text-3xl mb-2">💬</div>
            <h3 className="font-medium text-gray-900 dark:text-white">View Messages</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Check client messages</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
