"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Award, Code, BookOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  return (
    <section id="about" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05),transparent_70%)]" />
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
              About Me
            </span>
          </h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Get to know more about my background, experience, and what drives me as a developer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="relative aspect-square overflow-hidden rounded-xl mb-6 group">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Prabhat Shukla"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="flex flex-col space-y-4">
              <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <Button className="w-full gap-2 relative group overflow-hidden">
                  <span className="relative z-10">
                    <Download className="h-4 w-4 inline mr-1" /> Download Resume
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </Link>

              <Card className="glass">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <p>📧 prabhatshukla0849@gmail.com</p>
                    <p>📱 +91 9569584685</p>
                    <p>📍 Lucknow, India</p>
                    <p>🎓 Ajay Kumar Garg Engineering College</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="mb-6 glass">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">My Journey</h3>
                <p className="mb-4">
                  I'm Prabhat Shukla, a passionate Full-Stack MERN Developer currently pursuing my Bachelor's in
                  Technology (IT) at Ajay Kumar Garg Engineering College. With a strong foundation in both frontend and
                  backend technologies, I specialize in building modern, responsive, and user-friendly web applications.
                </p>
                <p>
                  My journey in web development began with a curiosity about how websites work, which quickly evolved
                  into a passion for creating them. I've since honed my skills through academic projects, internships,
                  and personal endeavors, always striving to stay updated with the latest technologies and best
                  practices in the field.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="h-full glass">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Award className="h-10 w-10 text-primary mb-4" />
                    <h3 className="font-semibold mb-2">Achievements</h3>
                    <ul className="text-sm text-foreground/80 space-y-2">
                      <li>Successfully taught 50+ 12th-grade students programming</li>
                      <li>Community Manager of Tech Savvy</li>
                      <li>Successfully merged 4 PRs during Hacktoberfest</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="h-full glass">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Code className="h-10 w-10 text-primary mb-4" />
                    <h3 className="font-semibold mb-2">Experience</h3>
                    <ul className="text-sm text-foreground/80 space-y-2">
                      <li>Wilco - Training & Internship (Jul-Dec 2024)</li>
                      <li>LongFinch - Internship (Feb 2024)</li>
                      <li>Head Coordinator - Anveshna Tech Fest</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="h-full glass">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <BookOpen className="h-10 w-10 text-primary mb-4" />
                    <h3 className="font-semibold mb-2">Education</h3>
                    <ul className="text-sm text-foreground/80 space-y-2">
                      <li>B.Tech in IT (2021-2025)</li>
                      <li>CGPA: 7.5</li>
                      <li>Cathedral Sr. Sec. School (2019-2020)</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

