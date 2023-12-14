"use client"

import { cn } from '@/lib/utils'
import { Inter as FontSans } from "next/font/google"
import Header from './components/layout/Header'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AuthCheck } from '@/api/userLoginApi'



export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const [token, setToken] = React.useState(false)

    const AuthVerify = async () => {
        try {
            const data = await AuthCheck()
            if (data.ok === true) {
                console.log(data)
            }
            else if (data.response.data.success === false) {
                localStorage.clear()
                window.location.href = "/";
            }
        } catch (err) {
            localStorage.clear()
            window.location.href = "/";
        }
    }

    const path = usePathname()
    React.useEffect(() => {
        AuthVerify()
    }, [path])

    React.useEffect(() => {
        const token = window.localStorage.getItem('token')
        if (!token) {
            router.push('/login')
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
                token ? <>
                    <Header />
                    {children}
                </> : <div></div>
            }
        </div>
    )
}
