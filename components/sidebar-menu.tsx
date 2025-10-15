"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarMenuProps {
  sections: Array<{
    id: string
    title: string
  }>
}

export function SidebarMenu({ sections }: SidebarMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("")
  const sidebarRef = React.useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // scroll spy
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  // outside click / escape
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) setIsOpen(false)
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscapeKey)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Menu button */}
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="h-9 w-9">
        <Menu className="h-4 w-4" />
      </Button>

      {mounted &&
        createPortal(
          <>
            {/* Backdrop */}
            {isOpen && (
              <div
                className="fixed inset-0 bg-black/60 backdrop-blur-md transition-all duration-300"
                onClick={() => setIsOpen(false)}
                style={{ backdropFilter: "blur(8px)", zIndex: 1000 }}
              />
            )}

            {/* Sidebar */}
            <div
              ref={sidebarRef}
              className={cn(
                "fixed top-0 left-0 transform transition-transform duration-300 ease-in-out shadow-2xl border-r border-border bg-background/98 backdrop-blur-xl",
                // responsive sizing
                "w-72 max-w-full sm:w-80",
                "h-full sm:h-auto sm:rounded-r-2xl",
                // slide in/out
                isOpen ? "translate-x-0" : "-translate-x-full",
              )}
              style={{ zIndex: 1100 }}
            >
              <div className="flex items-center justify-between p-4 border-b border-border bg-background/95 sm:rounded-tr-2xl">
                <h2 className="text-lg font-semibold text-foreground">Navigation</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-9 w-9 hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-4 space-y-2">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant="ghost"
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "w-full justify-between text-left h-auto py-3 px-3 rounded-lg transition-all duration-200",
                      activeSection === section.id
                        ? "bg-accent text-accent-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                    )}
                  >
                    <span className="text-sm font-medium">{section.title}</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  )
}
