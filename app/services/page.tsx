"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Smartphone, Palette, Cloud, Database, Shield, ArrowRight, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ServicesPage() {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom web applications built with modern technologies",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "React & Next.js Applications",
        "E-commerce Solutions",
        "Progressive Web Apps",
        "API Development",
        "Database Design",
      ],
      technologies: ["React", "Next.js", "Node.js", "TypeScript", "MongoDB"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "iOS & Android Apps",
        "React Native Development",
        "Flutter Applications",
        "App Store Optimization",
        "Mobile UI/UX Design",
      ],
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive designs that convert",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "User Research & Analysis",
        "Wireframing & Prototyping",
        "Visual Design",
        "Usability Testing",
        "Design Systems",
      ],
      technologies: ["Figma", "Adobe XD", "Sketch", "Principle", "InVision"],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and DevOps",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "AWS/Azure/GCP Setup",
        "Container Orchestration",
        "CI/CD Pipelines",
        "Monitoring & Logging",
        "Security Implementation",
      ],
      technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins"],
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Database,
      title: "Data Solutions",
      description: "Big data analytics and machine learning",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "Data Pipeline Development",
        "Business Intelligence",
        "Machine Learning Models",
        "Real-time Analytics",
        "Data Visualization",
      ],
      technologies: ["Python", "TensorFlow", "Apache Spark", "Tableau", "PostgreSQL"],
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Comprehensive security solutions",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "Security Audits",
        "Penetration Testing",
        "Compliance Management",
        "Incident Response",
        "Security Training",
      ],
      technologies: ["OWASP", "Nessus", "Metasploit", "Wireshark", "Splunk"],
      color: "from-red-500 to-pink-500",
    },
  ]

  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "We start by understanding your business goals, target audience, and project requirements.",
    },
    {
      step: "02",
      title: "Planning",
      description: "We create a detailed project roadmap with timelines, milestones, and resource allocation.",
    },
    {
      step: "03",
      title: "Design",
      description: "Our designers create wireframes, prototypes, and visual designs for your approval.",
    },
    {
      step: "04",
      title: "Development",
      description: "Our developers bring the designs to life using the latest technologies and best practices.",
    },
    {
      step: "05",
      title: "Testing",
      description: "Rigorous testing ensures your solution is bug-free and performs optimally.",
    },
    {
      step: "06",
      title: "Launch",
      description: "We deploy your solution and provide ongoing support and maintenance.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We offer comprehensive digital solutions to help your business thrive in the modern world. From web
              development to cloud solutions, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <Card
                key={index}
                className="card-hover border-0 shadow-2xl overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-20`}></div>
                  </div>

                  <CardContent className="p-8">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg mb-4`}
                    >
                      <service.icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>

                    <p className="text-gray-600 mb-6">{service.description}</p>

                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link href="/contact">
                      <Button className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90`}>
                        Get Started
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a proven methodology to ensure successful project delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <Card
                key={index}
                className="card-hover border-0 shadow-lg animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-bold text-xl mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and see how we can help you achieve your goals with our expert services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Start Your Project
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
