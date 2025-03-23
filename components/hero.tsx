"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Github, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"
import gsap from "gsap"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Mouse follow effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { clientX, clientY } = e
      const rect = containerRef.current.getBoundingClientRect()

      const x = clientX - rect.left
      const y = clientY - rect.top

      containerRef.current.style.setProperty("--mouse-x", `${x}px`)
      containerRef.current.style.setProperty("--mouse-y", `${y}px`)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
    }

    // GSAP text animation
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        {
          backgroundPosition: "0% 50%",
        },
        {
          backgroundPosition: "100% 50%",
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
      )
    }

    // Create particles
    if (particlesRef.current) {
      const particlesContainer = particlesRef.current
      const particleCount = 50

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div")
        particle.classList.add("particle")

        // Random position, size and animation duration
        const size = Math.random() * 5 + 1
        const posX = Math.random() * 100
        const posY = Math.random() * 100
        const duration = Math.random() * 20 + 10
        const delay = Math.random() * 5

        particle.style.width = `${size}px`
        particle.style.height = `${size}px`
        particle.style.left = `${posX}%`
        particle.style.top = `${posY}%`

        gsap.to(particle, {
          y: -100 - Math.random() * 100,
          x: Math.random() * 50 - 25,
          opacity: 0,
          duration: duration,
          delay: delay,
          repeat: -1,
          ease: "power1.out",
        })

        particlesContainer.appendChild(particle)
      }
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
        } as React.CSSProperties
      }
    >
      {/* Particles background */}
      <div ref={particlesRef} className="absolute inset-0 -z-10 overflow-hidden" />

      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(var(--primary-rgb),0.15),transparent_40%)]" />

      {/* Futuristic grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(var(--primary-rgb),0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-rgb),0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-4xl mx-auto z-10"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
          }}
          className="mb-6 relative inline-block"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20 backdrop-blur-md flex items-center justify-center border border-primary/30">
            <span className="text-4xl md:text-5xl font-bold">PS</span>
          </div>
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-purple-600 opacity-30 blur-md -z-10 animate-pulse" />
        </motion.div>

        <motion.h1
          ref={textRef}
          className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-primary bg-[length:200%_auto] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Full-Stack MERN Developer
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Hi, I&apos;m <span className="font-semibold text-primary">Prabhat Shukla</span>. I build modern web
          applications with React, Next.js, Node.js, and MongoDB.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="#projects">
            <Button className="gap-2 relative group overflow-hidden">
              <span className="relative z-10">View Projects</span>
              <ArrowRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </Link>
          <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2 relative group overflow-hidden">
              <span className="relative z-10">Download Resume</span>
              <Download className="h-4 w-4 relative z-10 group-hover:translate-y-[2px] transition-transform" />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          className="flex justify-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {[
            { icon: <Github className="h-6 w-6" />, href: "https://github.com/prabhatshukla", label: "GitHub" },
            {
              icon: <Linkedin className="h-6 w-6" />,
              href: "https://linkedin.com/in/prabhatshukla",
              label: "LinkedIn",
            },
            { icon: <Twitter className="h-6 w-6" />, href: "https://twitter.com/prabhatshukla", label: "Twitter" },
            { icon: <Mail className="h-6 w-6" />, href: "mailto:prabhatshukla0849@gmail.com", label: "Email" },
          ].map((social, index) => (
            <motion.div
              key={social.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.9 + index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
            >
              <Link href={social.href} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 relative group">
                  {social.icon}
                  <span className="sr-only">{social.label}</span>
                  <div className="absolute inset-0 rounded-full bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <ArrowRight className="h-6 w-6 rotate-90" />
      </motion.div>
    </section>
  )
}

