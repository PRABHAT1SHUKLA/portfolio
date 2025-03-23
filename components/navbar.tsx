"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Menu, X, Moon, Sun, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm" : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
            >
              Prabhat Shukla
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <Link
                  href={link.href}
                  className="text-foreground/80 hover:text-primary transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}
            <div className="flex items-center space-x-2">
              {[
                { icon: <Github className="h-5 w-5" />, href: "https://github.com/prabhatshukla", label: "GitHub" },
                {
                  icon: <Linkedin className="h-5 w-5" />,
                  href: "https://linkedin.com/in/prabhatshukla",
                  label: "LinkedIn",
                },
                { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com/prabhatshukla", label: "Twitter" },
              ].map((social, index) => (
                <motion.div
                  key={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.5 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <Link href={social.href} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" aria-label={social.label} className="relative group">
                      {social.icon}
                      <span className="absolute inset-0 rounded-full bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300" />
                    </Button>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.8,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                  className="relative group"
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  <span className="absolute inset-0 rounded-full bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300" />
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="relative group"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="absolute inset-0 rounded-full bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <Link
                    href={link.href}
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10 hover:text-primary"
                    onClick={closeMenu}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="flex items-center space-x-2 px-3 py-2">
                {[
                  { icon: <Github className="h-5 w-5" />, href: "https://github.com/prabhatshukla", label: "GitHub" },
                  {
                    icon: <Linkedin className="h-5 w-5" />,
                    href: "https://linkedin.com/in/prabhatshukla",
                    label: "LinkedIn",
                  },
                  {
                    icon: <Twitter className="h-5 w-5" />,
                    href: "https://twitter.com/prabhatshukla",
                    label: "Twitter",
                  },
                ].map((social, index) => (
                  <motion.div
                    key={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.5 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <Link href={social.href} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" aria-label={social.label}>
                        {social.icon}
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

