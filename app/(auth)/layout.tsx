"use client"

import { cn } from '@/lib/utils'
import { Inter as FontSans } from "next/font/google"
import Header from "@/app/(auth)/components/layout/Header"
import React from 'react'
import { useRouter } from 'next/navigation'


export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const router = useRouter()
    const [token, setToken] = React.useState(false)

    React.useEffect(() => {
        const token = window.localStorage.getItem('token')
        if (token) {
            router.push('/dashboard')
        } else {
            setToken(true)
        }
    }, [token])
    return (
        <div
            className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
            )}
        >
            {
                token ? <div>
                    <Header />
                    {children}
                </div> : <div></div>
            }
        </div>
    )
}
