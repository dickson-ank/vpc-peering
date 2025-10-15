import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})
    
export const metadata: Metadata = {
  title: "Vpc peering",
  description: "Connection two VPCs PROD and DEV by using VPC peering",
    generator: 'Dickson Ankamah',
    applicationName: 'VPC peering with Network Interface ',
    keywords: ['how to', 'load balancer','walkthrough', 'bastion', 'devops', 'web application'],
    authors: [{ name: 'Dickson Ankamah'}],
    creator: 'Dickson Ankamah'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${montserrat.variable} antialiased min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
