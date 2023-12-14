"use client"

import "@/app/globals.css"
import { cn } from '@/lib/utils'
import { Inter as FontSans } from "next/font/google"
import { Providers } from "./Provider";
import { ThemeProvider } from "@/components/theme-provider";
import LoadingBar from '@/components/Loading'


export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
           <LoadingBar />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
