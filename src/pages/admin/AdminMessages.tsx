"use client"

import type React from "react"
import { useState } from "react"
import { useData, type ContactMessage } from "../../contexts/DataContext"

const AdminMessages: React.FC = () => {
  const { messages, updateMessageStatus } = useData()
  const [selectedStatus, setSelectedStatus] = useState<"all" | ContactMessage["status"]>("all")
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  const filteredMessages = messages.filter((message) => {
    if (selectedStatus === "all") return true
    return message.status === selectedStatus
  })

  const handleStatusChange = (messageId: string, newStatus: ContactMessage["status"]) => {
    updateMessageStatus(messageId, newStatus)
  }

  const getStatusColor = (status: ContactMessage["status"]) => {
    switch (status) {
      case "new":
        return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400"
      case "read":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400"
      case "replied":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400"
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Messages</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage client messages and inquiries</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as "all" | ContactMessage["status"])}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Messages</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {filteredMessages.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                          {message.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{message.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{message.email}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 line-clamp-2">{message.message}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2 ml-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(message.date).toLocaleDateString()}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(message.status)}`}>
                      {message.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No messages found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {selectedStatus === "all" ? "No messages yet" : `No ${selectedStatus} messages`}
            </p>
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Message Details</h2>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 dark:text-gray-400 font-medium text-lg">
                    {selectedMessage.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedMessage.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedMessage.email}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(selectedMessage.date).toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Message:</h4>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Status:</h4>
                <div className="flex space-x-2">
                  {(["new", "read", "replied"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(selectedMessage.id, status)}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        selectedMessage.status === status
                          ? getStatusColor(status)
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: Your inquiry&body=Hi ${selectedMessage.name},%0D%0A%0D%0AThank you for your message.%0D%0A%0D%0ABest regards,%0D%0ATechCraft Team`}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => handleStatusChange(selectedMessage.id, "replied")}
                >
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminMessages
