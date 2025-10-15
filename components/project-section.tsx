import type { ReactNode } from "react"

interface ProjectSectionProps {
  id: string
  title: string
  children: ReactNode

  onImageClick ?: (src: string) => void
}

export function ProjectSection({ id, title, children }: ProjectSectionProps) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="mb-8">
        <h2 className="text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold text-foreground mb-4 text-balance">
          {title}
        </h2>
        <div className="w-20 h-1 bg-primary rounded-full" />
      </div>
      {children}
    </section>
  )
}
