"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import gsap from "gsap"

type Skill = {
  name: string
  icon: string
  level: number
}

type SkillCategory = {
  name: string
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      { name: "React.js", icon: "⚛️", level: 90 },
      { name: "Next.js", icon: "▲", level: 85 },
      { name: "TypeScript", icon: "TS", level: 80 },
      { name: "JavaScript", icon: "JS", level: 95 },
      { name: "Tailwind CSS", icon: "🎨", level: 90 },
      { name: "HTML/CSS", icon: "🌐", level: 95 },
      { name: "Redux Toolkit", icon: "🔄", level: 85 },
      { name: "Framer Motion", icon: "🎭", level: 75 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", icon: "🟢", level: 85 },
      { name: "Express.js", icon: "🚂", level: 85 },
      { name: "MongoDB", icon: "🍃", level: 80 },
      { name: "Prisma", icon: "🔺", level: 75 },
      { name: "REST APIs", icon: "🔌", level: 90 },
      { name: "WebSockets", icon: "🔄", level: 80 },
      { name: "SQL", icon: "📊", level: 75 },
      { name: "Redis", icon: "🔴", level: 70 },
    ],
  },
  {
    name: "DevOps",
    skills: [
      { name: "Docker", icon: "🐳", level: 75 },
      { name: "AWS", icon: "☁️", level: 70 },
      { name: "Vercel", icon: "▲", level: 85 },
      { name: "DigitalOcean", icon: "🌊", level: 75 },
      { name: "CI/CD", icon: "🔄", level: 70 },
      { name: "Git", icon: "🔀", level: 90 },
      { name: "GitHub", icon: "🐙", level: 90 },
      { name: "Nginx", icon: "🟩", level: 65 },
    ],
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const progressRefs = useRef<(HTMLDivElement | null)[]>([])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  useEffect(() => {
    // Initialize progress bars with GSAP
    const initProgressBars = () => {
      progressRefs.current.forEach((ref, index) => {
        if (!ref) return

        const skill = ref.getAttribute("data-skill")
        const level = ref.getAttribute("data-level")

        gsap.fromTo(
          ref,
          { width: 0 },
          {
            width: `${level}%`,
            duration: 1.5,
            delay: index * 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref,
              start: "top bottom-=100",
              toggleActions: "play none none reverse",
            },
          },
        )
      })
    }

    // Add refs to array when tab changes
    const setupProgressRefs = () => {
      progressRefs.current = []
      document.querySelectorAll(".skill-progress").forEach((el) => {
        progressRefs.current.push(el as HTMLDivElement)
      })
      initProgressBars()
    }

    // Setup initial progress bars
    setupProgressRefs()

    // Setup event listeners for tab changes
    const tabTriggers = document.querySelectorAll('[role="tab"]')
    tabTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        // Small delay to ensure DOM is updated
        setTimeout(setupProgressRefs, 100)
      })
    })

    return () => {
      tabTriggers.forEach((trigger) => {
        trigger.removeEventListener("click", setupProgressRefs)
      })
    }
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05),transparent_70%)]" />

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
              Technical Skills
            </span>
          </h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            My expertise spans across frontend, backend, and DevOps technologies in the MERN stack ecosystem.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="Frontend" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {skillCategories.map((category) => (
                <TabsTrigger key={category.name} value={category.name}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {skillCategories.map((category) => (
              <TabsContent key={category.name} value={category.name} className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                      viewport={{ once: true }}
                    >
                      <Card className="overflow-hidden h-full hover:border-primary/50 transition-all duration-300 group">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="text-2xl">{skill.icon}</div>
                            <h3 className="font-medium">{skill.name}</h3>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                            <div
                              className="skill-progress bg-gradient-to-r from-primary to-purple-600 h-2.5 rounded-full"
                              data-skill={skill.name}
                              data-level={skill.level}
                              style={{ width: "0%" }}
                            ></div>
                          </div>
                          <div className="mt-2 text-right text-sm text-muted-foreground">{skill.level}%</div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </motion.div>
    </section>
  )
}

