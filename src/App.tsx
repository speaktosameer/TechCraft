import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { DataProvider } from "./contexts/DataContext"
import { ThemeProvider } from "./contexts/ThemeContext"
import ProtectedRoute from "./components/ProtectedRoute"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"

// Public Pages
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ServicesPage from "./pages/ServicesPage"
import ProjectsPage from "./pages/ProjectsPage"
import ContactPage from "./pages/ContactPage"
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import CoursesPage from "./pages/CoursesPage"
import CourseDetailPage from "./pages/CourseDetailPage"

// Admin Pages
import AdminLayout from "./components/admin/AdminLayout"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminProjects from "./pages/admin/AdminProjects"
import AdminServices from "./pages/admin/AdminServices"
import AdminTestimonials from "./pages/admin/AdminTestimonials"
import AdminTeam from "./pages/admin/AdminTeam"
import AdminMessages from "./pages/admin/AdminMessages"
import AdminCourses from "./pages/admin/AdminCourses"

import "./App.css"

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <Router>
            <div className="App">
              <Routes>
                {/* Auth Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Public Routes */}
                <Route
                  path="/"
                  element={
                    <>
                      <Navbar />
                      <HomePage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <>
                      <Navbar />
                      <AboutPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/services"
                  element={
                    <>
                      <Navbar />
                      <ServicesPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <>
                      <Navbar />
                      <ProjectsPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <>
                      <Navbar />
                      <ContactPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/courses"
                  element={
                    <>
                      <Navbar />
                      <CoursesPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/courses/:id"
                  element={
                    <>
                      <Navbar />
                      <CourseDetailPage />
                      <Footer />
                    </>
                  }
                />

                {/* Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="projects" element={<AdminProjects />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="testimonials" element={<AdminTestimonials />} />
                  <Route path="team" element={<AdminTeam />} />
                  <Route path="messages" element={<AdminMessages />} />
                  <Route path="courses" element={<AdminCourses />} />
                </Route>

                {/* Redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </Router>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
