"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Mode from './Mode'
import { Tv2 } from 'lucide-react';



export default function Header() {

    return (
        <div className="shadow py-2 dark:shadow-gray-600">
            <div className="max-w-7xl m-auto px-2 flex justify-between items-center">
                <div className="flex space-x-6">
                    <h1 className="p-3 font-semibold text-xl text-gray-700">
                        <Link className="cursor-pointer dark:text-white " href='/'>
                            <Tv2 size='30px' />
                        </Link>
                    </h1>
                </div>
                <div className="space-x-4">
                    <Link href='/login'>
                        <Button className='font-semibold' variant='ghost'>Login</Button>
                    </Link>
                    <Link href='/sign-up'>
                        <Button className='font-semibold'>Sign Up</Button>
                    </Link>
                    <Mode />
                </div>
            </div>
        </div>
    )
}


