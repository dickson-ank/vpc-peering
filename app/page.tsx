"use client"

import { Navigation } from "@/components/navigation"
import { ProjectSection } from "@/components/project-section"
import { ContactSection } from "@/components/contact-section"
import { ImageModal } from "@/components/image-modal"
import { Introduction } from "@/components/pagesections/Introduction"
import { useState } from "react"
import { Hero } from "@/components/pagesections/hero"
import { Step1 } from "@/components/pagesections/step-1"
import { Step2 } from "@/components/pagesections/step-2"
import { Step3 } from "@/components/pagesections/step-3"
import { Step4 } from "@/components/pagesections/step-4"
import { Step5 } from "@/components/pagesections/step-5"
import { Step6 } from "@/components/pagesections/step-6"

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "step-1", title: "Step 1: VPC and Subnets" },
  { id: "step-2", title: "Step 2: Routing" },
  { id: "step-3", title: "Step 3: VPC Peering" },
  { id: "step-4", title: "Step 4: Security Groups" },
  { id: "step-5", title: "Step 5: ENI & EC2 Instances" },
  { id: "step-6", title: "Step 6: Testing" },
  { id: "thank-you", title: "Need Help?" },
]

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Navigation sections={sections} />
      <main className="pt-16">
        <Hero/>

          {/* Project Sections */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
          <Introduction setSelectedImage={setSelectedImage}/>
          <Step1 setSelectedImage={setSelectedImage}/>
          <Step2 setSelectedImage={setSelectedImage}/>
          <Step3 setSelectedImage={setSelectedImage}/>
          <Step4 setSelectedImage={setSelectedImage}/>
          <Step5 setSelectedImage={setSelectedImage}/>
          <Step6 setSelectedImage={setSelectedImage}/>

          {/* Conclusion */}
          <ProjectSection id="thank-you" title="Thank You">
            <p className="text-muted-foreground mb-6 text-pretty text-sm sm:text-base">
             Thank you for following this project on establishing a connection between two VPCs, using VPC Peering. 
             I hope you found it informative and helpful.
             If you have any questions or need further assistance, feel free to reach out!
            </p>
          </ProjectSection>
        </div>
        <ContactSection />
      </main>

      <ImageModal
        src={selectedImage || "./placeholder.svg"}
        alt="Expanded view"
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  )
}
