"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.03),transparent_70%)]" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-4 md:mb-0"
        >
          <p className="text-sm text-muted-foreground">© {currentYear} Prabhat Shukla. All rights reserved.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex items-center space-x-4"
        >
          {[
            { icon: <Github className="h-5 w-5" />, href: "https://github.com/prabhatshukla", label: "GitHub" },
            {
              icon: <Linkedin className="h-5 w-5" />,
              href: "https://linkedin.com/in/prabhatshukla",
              label: "LinkedIn",
            },
            { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com/prabhatshukla", label: "Twitter" },
            { icon: <Mail className="h-5 w-5" />, href: "mailto:prabhatshukla0849@gmail.com", label: "Email" },
          ].map((social, index) => (
            <motion.div
              key={social.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.3 + index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
            >
              <Link
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {social.icon}
                <span className="sr-only">{social.label}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </footer>
  )
}

