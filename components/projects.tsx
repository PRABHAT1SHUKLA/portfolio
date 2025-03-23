"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Maximize2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  github: string
  live: string
  highlights: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "Breadit",
    description: "A social news aggregation, content rating, and discussion website similar to Reddit.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["NextJs", "ReactJs", "TypeScript", "MySQL", "Prisma"],
    github: "https://github.com/prabhatshukla/breadit",
    live: "https://breadit-demo.vercel.app",
    highlights: [
      "Introduced a community-building feature, users can create their own spaces for focused interaction & discussion which increased user engagement by 35%.",
      "Integrated real-time upvote/downvote mechanisms for posts and comments.",
      "Added authentication using next-auth library, ensuring secure onboarding, login, and data protection leading to a 10% decrease in unauthorized access.",
    ],
  },
  {
    id: 2,
    title: "Case Cobra: SAAS App",
    description: "A custom phonecase ecommerce SAAS platform with integrated payment gateway.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["NextJs", "ReactJs", "TypeScript", "MySQL", "Prisma"],
    github: "https://github.com/prabhatshukla/case-cobra",
    live: "https://case-cobra-demo.vercel.app",
    highlights: [
      "Created a custom phonecase ecommerce SAAS platform which has a responsive design with integrated payment gateway relying on webhooks.",
      "A smooth UI experience with modern industrial practices making the site navigation easy.",
      "Integrated admin dashboard to track user orders and resend email service to send user emails.",
    ],
  },
  {
    id: 3,
    title: "Talkative: Chat App",
    description: "A full-stack chat application with real-time communication using WebSockets.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["NextJs", "TypeScript", "ReactJs", "Redis", "WebSocket"],
    github: "https://github.com/prabhatshukla/talkative",
    live: "https://talkative-demo.vercel.app",
    highlights: [
      "Built a full-stack chat application, streamlining user interaction and seamless communication.",
      "Implemented authentication for users leveraging NextAuth library ensure secure user onboarding, login and data protection.",
      "Enabled real-time communication between users through WebSockets to allow instant messaging with increased user interaction by 60%.",
      "Integrated comprehensive features including friends requests, Image and video sharing.",
    ],
  },
  {
    id: 4,
    title: "Gitelp: A Git Helper",
    description: "A git commit summarizer and chatbot to enhance codebase understanding and collaboration.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["NextJs", "TypeScript", "Prisma", "AssemblyAI"],
    github: "https://github.com/prabhatshukla/gitelp",
    live: "https://gitelp-demo.vercel.app",
    highlights: [
      "Developed a useful git commit summarizer and chatbot to enhance codebase understanding and collaboration.",
      "Used Google Gemini API and ASSEMBLY AI apis for summarizing text and audio files.",
      "Enabled real-time streamed chatbot responses for seamless user interactions.",
    ],
  },
]

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("All")
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  const filters = ["All", "NextJs", "TypeScript", "Prisma", "WebSocket", "Redis"]

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.tags.includes(activeFilter))

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const cards = document.querySelectorAll(".project-card")

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [filteredProjects])

  const toggleProjectExpand = (id: number) => {
    setExpandedProject(expandedProject === id ? null : id)
  }

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.1),transparent_70%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(var(--primary-rgb),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-rgb),0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <motion.div style={{ opacity, y }} className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Explore my latest full-stack MERN projects showcasing my skills in React, Next.js, Node.js, and more.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {filters.map((filter, index) => (
            <motion.div
              key={filter}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
            >
              <Button
                variant={activeFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className="rounded-full relative overflow-hidden group"
              >
                <span className="relative z-10">{filter}</span>
                {activeFilter !== filter && (
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className={`project-card overflow-hidden h-full flex flex-col border-2 hover:border-primary/50 transition-all duration-300 group ${
                expandedProject === project.id ? "md:col-span-2" : ""
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={() => toggleProjectExpand(project.id)}
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-primary/10">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/80">
                  {project.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2 relative group overflow-hidden">
                    <span className="relative z-10">
                      <Github className="h-4 w-4 inline mr-1" /> GitHub
                    </span>
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </Link>
                <Link href={project.live} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="gap-2 relative group overflow-hidden">
                    <span className="relative z-10">
                      <ExternalLink className="h-4 w-4 inline mr-1" /> Live Demo
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

