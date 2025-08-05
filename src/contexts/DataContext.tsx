"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

// Types
export interface Project {
  id: string
  title: string
  description: string
  image: string
  category: string
  technologies: string[]
  link?: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  price?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar: string
  rating: number
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  social: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  date: string
  status: "new" | "read" | "replied"
}

// Add this interface after the existing interfaces
export interface Course {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  instructor: string
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  price: number
  originalPrice?: number
  category: string
  features: string[]
  curriculum: {
    module: string
    lessons: string[]
  }[]
  rating: number
  studentsEnrolled: number
  tags: string[]
  status: "active" | "draft" | "archived"
}

interface DataContextType {
  projects: Project[]
  services: Service[]
  testimonials: Testimonial[]
  team: TeamMember[]
  messages: ContactMessage[]
  addProject: (project: Omit<Project, "id">) => void
  updateProject: (id: string, project: Partial<Project>) => void
  deleteProject: (id: string) => void
  addService: (service: Omit<Service, "id">) => void
  updateService: (id: string, service: Partial<Service>) => void
  deleteService: (id: string) => void
  addTestimonial: (testimonial: Omit<Testimonial, "id">) => void
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void
  deleteTestimonial: (id: string) => void
  addTeamMember: (member: Omit<TeamMember, "id">) => void
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void
  deleteTeamMember: (id: string) => void
  addMessage: (message: Omit<ContactMessage, "id" | "date" | "status">) => void
  updateMessageStatus: (id: string, status: ContactMessage["status"]) => void
  // ... existing properties
  courses: Course[]
  addCourse: (course: Omit<Course, "id">) => void
  updateCourse: (id: string, course: Partial<Course>) => void
  deleteCourse: (id: string) => void
  // ... rest of existing properties
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export const useData = () => {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}

// Initial data
const initialProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "Modern e-commerce solution with advanced features and seamless user experience.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Web Development",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "https://example.com",
  },
  {
    id: "2",
    title: "Healthcare Mobile App",
    description: "Mobile application for healthcare management and patient monitoring.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Mobile Development",
    technologies: ["React Native", "Firebase", "AI/ML"],
  },
  {
    id: "3",
    title: "Financial Dashboard",
    description: "Real-time financial analytics dashboard with advanced reporting.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Web Development",
    technologies: ["Vue.js", "Python", "PostgreSQL"],
  },
  {
    id: "4",
    title: "Learning Management System",
    description: "Comprehensive LMS platform for online education and training.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Web Development",
    technologies: ["React", "Django", "MySQL"],
  },
]

const initialServices: Service[] = [
  {
    id: "1",
    title: "Website Development",
    description: "Custom websites and web applications built with modern technologies.",
    icon: "🌐",
    features: ["Responsive Design", "SEO Optimization", "Performance Optimization", "CMS Integration"],
    price: "Starting from $2,000",
  },
  {
    id: "2",
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    icon: "📱",
    features: ["iOS Development", "Android Development", "Cross-platform", "App Store Deployment"],
    price: "Starting from $5,000",
  },
  {
    id: "3",
    title: "UI/UX Design",
    description: "Beautiful and intuitive user interfaces that enhance user experience.",
    icon: "🎨",
    features: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
    price: "Starting from $1,500",
  },
  {
    id: "4",
    title: "IT Consultation",
    description: "Strategic IT consulting to help your business leverage technology effectively.",
    icon: "💼",
    features: ["Technology Strategy", "Digital Transformation", "System Architecture", "Process Optimization"],
    price: "Starting from $150/hour",
  },
]

const initialTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc.",
    content:
      "TechCraft delivered an exceptional product that exceeded our expectations. Their attention to detail and technical expertise is unmatched.",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "CTO",
    company: "InnovateCorp",
    content:
      "Working with TechCraft was a game-changer for our business. They transformed our ideas into a scalable, robust solution.",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Founder",
    company: "StartupXYZ",
    content:
      "The team at TechCraft is incredibly talented and professional. They delivered our project on time and within budget.",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
]

const initialTeam: TeamMember[] = [
  {
    id: "1",
    name: "Alex Johnson",
    role: "CEO & Founder",
    bio: "Visionary leader with 15+ years in tech industry, passionate about building innovative solutions.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com/in/alexjohnson",
      twitter: "https://twitter.com/alexjohnson",
    },
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "CTO",
    bio: "Technical expert specializing in scalable architectures and modern development practices.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com/in/sarahchen",
      github: "https://github.com/sarahchen",
    },
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    role: "Lead Designer",
    bio: "Creative designer focused on user-centered experiences and beautiful interfaces.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com/in/michaelrodriguez",
      twitter: "https://twitter.com/michaelrodriguez",
    },
  },
  {
    id: "4",
    name: "Emily Davis",
    role: "Project Manager",
    bio: "Expert in agile methodologies and client relations, ensuring smooth project delivery.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "https://linkedin.com/in/emilydavis",
    },
  },
]

// Add initial courses data after initialTeam
const initialCourses: Course[] = [
  {
    id: "1",
    title: "Full Stack Web Development",
    description: "Master modern web development with React, Node.js, and MongoDB",
    longDescription:
      "This comprehensive course covers everything you need to become a full-stack web developer. You'll learn React for frontend development, Node.js and Express for backend, MongoDB for database management, and deploy your applications to the cloud.",
    image: "/placeholder.svg?height=300&width=400",
    instructor: "Sarah Chen",
    duration: "12 weeks",
    level: "Intermediate",
    price: 299,
    originalPrice: 399,
    category: "Web Development",
    features: [
      "24/7 Support",
      "Lifetime Access",
      "Certificate of Completion",
      "Real-world Projects",
      "Job Placement Assistance",
    ],
    curriculum: [
      {
        module: "Frontend Development",
        lessons: ["HTML5 & CSS3", "JavaScript ES6+", "React Fundamentals", "State Management", "React Router"],
      },
      {
        module: "Backend Development",
        lessons: ["Node.js Basics", "Express Framework", "RESTful APIs", "Authentication", "Database Integration"],
      },
      {
        module: "Database & Deployment",
        lessons: ["MongoDB", "Mongoose ODM", "Cloud Deployment", "DevOps Basics", "Project Deployment"],
      },
    ],
    rating: 4.8,
    studentsEnrolled: 1250,
    tags: ["React", "Node.js", "MongoDB", "JavaScript", "Full Stack"],
    status: "active",
  },
  {
    id: "2",
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile apps for iOS and Android",
    longDescription:
      "Learn to create beautiful, performant mobile applications using React Native. This course covers navigation, state management, native modules, and publishing to app stores.",
    image: "/placeholder.svg?height=300&width=400",
    instructor: "Michael Rodriguez",
    duration: "10 weeks",
    level: "Intermediate",
    price: 249,
    originalPrice: 349,
    category: "Mobile Development",
    features: [
      "iOS & Android Development",
      "Real Device Testing",
      "App Store Publishing Guide",
      "Native Module Integration",
      "Performance Optimization",
    ],
    curriculum: [
      {
        module: "React Native Fundamentals",
        lessons: ["Setup & Environment", "Components & Styling", "Navigation", "State Management", "Debugging"],
      },
      {
        module: "Advanced Features",
        lessons: ["Native Modules", "Camera & Media", "Push Notifications", "Offline Storage", "Performance"],
      },
      {
        module: "Publishing & Deployment",
        lessons: ["App Store Guidelines", "iOS Deployment", "Android Deployment", "CI/CD", "Maintenance"],
      },
    ],
    rating: 4.7,
    studentsEnrolled: 890,
    tags: ["React Native", "Mobile", "iOS", "Android", "JavaScript"],
    status: "active",
  },
  {
    id: "3",
    title: "UI/UX Design Masterclass",
    description: "Learn design thinking, prototyping, and user experience principles",
    longDescription:
      "Master the art of creating beautiful and functional user interfaces. This course covers design principles, user research, wireframing, prototyping, and design systems.",
    image: "/placeholder.svg?height=300&width=400",
    instructor: "Emily Davis",
    duration: "8 weeks",
    level: "Beginner",
    price: 199,
    category: "Design",
    features: [
      "Design Tools Training",
      "Portfolio Development",
      "User Research Methods",
      "Design System Creation",
      "Industry Mentorship",
    ],
    curriculum: [
      {
        module: "Design Fundamentals",
        lessons: ["Design Principles", "Color Theory", "Typography", "Layout & Composition", "Visual Hierarchy"],
      },
      {
        module: "User Experience",
        lessons: [
          "User Research",
          "Personas & Journey Maps",
          "Information Architecture",
          "Wireframing",
          "Usability Testing",
        ],
      },
      {
        module: "Design Tools & Systems",
        lessons: ["Figma Mastery", "Prototyping", "Design Systems", "Handoff to Developers", "Portfolio Building"],
      },
    ],
    rating: 4.9,
    studentsEnrolled: 2100,
    tags: ["UI/UX", "Design", "Figma", "Prototyping", "User Research"],
    status: "active",
  },
  {
    id: "4",
    title: "Cloud Computing with AWS",
    description: "Master Amazon Web Services and cloud architecture",
    longDescription:
      "Comprehensive AWS training covering EC2, S3, Lambda, RDS, and more. Learn to design, deploy, and manage scalable cloud applications.",
    image: "/placeholder.svg?height=300&width=400",
    instructor: "Alex Johnson",
    duration: "14 weeks",
    level: "Advanced",
    price: 399,
    originalPrice: 499,
    category: "Cloud Computing",
    features: [
      "AWS Certification Prep",
      "Hands-on Labs",
      "Real Cloud Projects",
      "Cost Optimization",
      "Security Best Practices",
    ],
    curriculum: [
      {
        module: "AWS Fundamentals",
        lessons: ["AWS Overview", "IAM & Security", "EC2 Instances", "VPC & Networking", "Storage Services"],
      },
      {
        module: "Advanced Services",
        lessons: ["Lambda Functions", "API Gateway", "RDS & DynamoDB", "CloudFormation", "Monitoring & Logging"],
      },
      {
        module: "Architecture & Best Practices",
        lessons: [
          "Well-Architected Framework",
          "High Availability",
          "Disaster Recovery",
          "Cost Optimization",
          "Security",
        ],
      },
    ],
    rating: 4.6,
    studentsEnrolled: 650,
    tags: ["AWS", "Cloud", "DevOps", "Architecture", "Certification"],
    status: "active",
  },
]

interface DataProviderProps {
  children: ReactNode
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [services, setServices] = useState<Service[]>(initialServices)
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials)
  const [team, setTeam] = useState<TeamMember[]>(initialTeam)
  const [messages, setMessages] = useState<ContactMessage[]>([])

  // Add courses to the DataProvider state
  const [courses, setCourses] = useState<Course[]>(initialCourses)

  // Project CRUD
  const addProject = (project: Omit<Project, "id">) => {
    const newProject = { ...project, id: Date.now().toString() }
    setProjects((prev) => [...prev, newProject])
  }

  const updateProject = (id: string, project: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...project } : p)))
  }

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  // Service CRUD
  const addService = (service: Omit<Service, "id">) => {
    const newService = { ...service, id: Date.now().toString() }
    setServices((prev) => [...prev, newService])
  }

  const updateService = (id: string, service: Partial<Service>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...service } : s)))
  }

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id))
  }

  // Testimonial CRUD
  const addTestimonial = (testimonial: Omit<Testimonial, "id">) => {
    const newTestimonial = { ...testimonial, id: Date.now().toString() }
    setTestimonials((prev) => [...prev, newTestimonial])
  }

  const updateTestimonial = (id: string, testimonial: Partial<Testimonial>) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...testimonial } : t)))
  }

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id))
  }

  // Team CRUD
  const addTeamMember = (member: Omit<TeamMember, "id">) => {
    const newMember = { ...member, id: Date.now().toString() }
    setTeam((prev) => [...prev, newMember])
  }

  const updateTeamMember = (id: string, member: Partial<TeamMember>) => {
    setTeam((prev) => prev.map((m) => (m.id === id ? { ...m, ...member } : m)))
  }

  const deleteTeamMember = (id: string) => {
    setTeam((prev) => prev.filter((m) => m.id !== id))
  }

  // Message functions
  const addMessage = (message: Omit<ContactMessage, "id" | "date" | "status">) => {
    const newMessage: ContactMessage = {
      ...message,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: "new",
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const updateMessageStatus = (id: string, status: ContactMessage["status"]) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)))
  }

  // Add course CRUD functions
  const addCourse = (course: Omit<Course, "id">) => {
    const newCourse = { ...course, id: Date.now().toString() }
    setCourses((prev) => [...prev, newCourse])
  }

  const updateCourse = (id: string, course: Partial<Course>) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...course } : c)))
  }

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <DataContext.Provider
      value={{
        projects,
        services,
        testimonials,
        team,
        messages,
        addProject,
        updateProject,
        deleteProject,
        addService,
        updateService,
        deleteService,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addMessage,
        updateMessageStatus,
        // ... existing values
        courses,
        addCourse,
        updateCourse,
        deleteCourse,
        // ... rest of existing values
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
