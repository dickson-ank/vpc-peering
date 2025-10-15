"use client"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { SidebarMenu } from "@/components/sidebar-menu"

interface NavigationProps {
  sections: Array<{
    id: string
    title: string
  }>
}

export function Navigation({ sections }: NavigationProps) {
  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <SidebarMenu sections={sections} />
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={scrollToContact} className="h-9 w-9">
                <User className="h-4 w-4" />
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <div className="fixed bottom-4 left-4 z-40 max-w-[calc(100vw-2rem)]">
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-sm">
          <p className="text-xs text-muted-hero">
            Project by: <span className="font-medium text-foreground">Dickson Ankamah</span>
          </p>
        </div>
      </div>
    </>
  )
}
