"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { store } from "@/redux/store"
import { clearToken } from "@/redux/slice/AuthSlice"
import { useRouter } from 'next/navigation'
import Mode from './Mode'
import NavigationMenu from './NavigationMenu'
import { Tv2 } from 'lucide-react';
import { useSelector } from "react-redux"


export default function Header() {

    const { token } = useSelector((state: any) => state.auth);

    const router = useRouter()

    const handleLogout = () => {
        store.dispatch(clearToken())
        router.push('/login')
    }

    return (
        <div className="shadow py-2 dark:shadow-gray-700">
            <div className="max-w-7xl m-auto px-2 flex justify-between items-center">
                <div className="flex space-x-6">
                    <h1 className="p-3 font-semibold text-xl text-gray-700">
                        <Link className="cursor-pointer dark:text-white" href='/dashboard'>
                            <Tv2 size='30px' />
                        </Link>
                    </h1>
                </div>
                <div className="space-x-4 flex">
                    <div className="pt-2">
                        <h1>Welcome <span className="font-semibold uppercase">
                            {`${token?.name?.firstName} ${token?.name?.lastName}`}
                        </span></h1>
                    </div>
                    <Link href='/login'>
                        <Button className="font-semibold" variant='destructive' onClick={handleLogout}>Logout</Button>
                    </Link>
                    <div>
                        <Mode />
                    </div>
                </div>
            </div>
            <div className='max-w-7xl m-auto py-2'>
                <NavigationMenu />
            </div>
        </div>
    )
}


