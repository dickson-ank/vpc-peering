"use client"

import { Mail, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488" />
  </svg>
)

export function ContactSection() {
  return (
    <section id="contact" className="gradient-bg py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-muted-hero text-pretty max-w-2xl mx-auto">
            Have questions about this project or want to collaborate? I'd love to hear from you!
          </p>
        </div>

        <div className="flex flex-col items-center space-y-8">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/60 shadow-lg">
              <img
                src="./profilepic.jpg"
                alt="Dickson Ankamah"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name and Title */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-2">Dickson Ankamah</h3>
            <p className="text-muted-hero">Cloud Practitioner</p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
            <Button
              variant="outline"
              size="lg"
              className="flex items-center space-x-3 p-4 sm:p-6 h-auto gradient-card border-border hover:bg-accent/50 transition-all duration-200 bg-transparent"
              onClick={() => window.open("mailto:dicksonank@gmail.com", "_blank")}
            >
              <Mail className="h-5 w-5 text-primary flex-shrink-0" />
              <div className="text-left min-w-4">
                <div className="font-medium text-foreground text-sm sm:text-base">Email</div>
                <div className="text-xs sm:text-xs text-muted-hero truncate">dicksonank@gmail.com</div>
              </div>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="flex items-center space-x-3 p-4 sm:p-6 h-auto gradient-card border-border hover:bg-accent/50 transition-all duration-200 bg-transparent"
              onClick={() => window.open("https://linkedin.com/in/dickson-ank", "_blank")}
            >
              <Linkedin className="h-5 w-5 text-primary flex-shrink-0" />
              <div className="text-left">
                <div className="font-medium text-foreground text-sm sm:text-base">LinkedIn</div>
                <div className="text-xs sm:text-sm text-muted-hero">Connect with me</div>
              </div>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="flex items-center space-x-3 p-4 sm:p-6 h-auto gradient-card border-border hover:bg-accent/50 transition-all duration-200 bg-transparent"
              onClick={() => window.open("https://wa.me/233547407384", "_blank")}
            >
              <WhatsAppIcon className="h-5 w-5 text-primary flex-shrink-0" />
              <div className="text-left">
                <div className="font-medium text-foreground text-sm sm:text-base">WhatsApp</div>
                <div className="text-xs sm:text-sm text-muted-hero">Message me</div>
              </div>
            </Button>
          </div>

          {/* Additional Info */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 sm:p-6 max-w-2xl w-full">
            <p className="text-sm text-muted-hero text-center text-pretty">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about
              technology. Feel free to reach out through any of the channels above!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
