"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { HandleRequest } from '@/helper/handleRequest';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';



export default function ProjectList() {

    const [data, setData] = React.useState<any>([{}])
    const [loading, setloading] = React.useState(true)
    const router = useRouter()
    const { token } = useSelector((state: any) => state.auth);

    const ProjectDetails = async () => {
        try {
            if (token) {
                const data = await HandleRequest('get', '/projects')
                setTimeout(() => {
                    setData(data.data)
                    setloading(false)
                }, 1000);
            } else {
                const ids = localStorage.getItem("projectIds");
                const data = await HandleRequest('get', `/projects-byids/${ids}`)
                setTimeout(() => {
                    setData(data.data)
                    setloading(false)
                }, 1000);
            }
        } catch (err) {
            console.log(err)
        }
    }

    React.useEffect(() => {
        ProjectDetails()
    }, [])

    return (
        <div className='max-w-7xl m-auto'>
            <div>
                <div>
                    <div className='flex lg:flex-wrap justify-center lg:justify-start flex-col lg:flex-row items-center mx-6 lg:mx-0'>

                        {
                            data?.map((item: any, index: number) => (
                                <Card className=' sm:w-96 w-full max-h-44 m-3 hover:shadow-md duration-150 cursor-pointer dark:hover:bg-[#071128] dark:shadow-none' key={index}>
                                    {
                                        loading ?
                                            <CardHeader>
                                                <Skeleton className="w-full my-2 h-[25px] rounded-full" />
                                                <Skeleton className="w-[200px] h-[20px] rounded-full" />
                                                <Skeleton className="w-[300px] h-[20px] rounded-full" />
                                                <Skeleton className="w-[300px] h-[20px] rounded-full" />
                                            </CardHeader>
                                            :
                                            <CardHeader onClick={() => token ? router.push(`dashboard/${item.link}`) : router.push(`/project/${item.link}`)} className='overflow-hidden '>
                                                <CardTitle className='py-2 capitalize text-gray-500 dark:text-white'>{item?.projectName}</CardTitle>
                                                <CardContent className='p-0 text-orange-700 dark:text-orange-300'>
                                                    {item.prompt}
                                                </CardContent>
                                                <CardContent className='p-0 text-gray-800 dark:text-gray-200'>
                                                    {item?.projectType}
                                                </CardContent>
                                            </CardHeader>
                                    }
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


const listItem = [
    {
        projectName: "Alert Dialog",
        prompt: "/docs/primitives/alert-dialog",
        projectType:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        projectName: "Hover Card",
        prompt: "/docs/primitives/hover-card",
        projectType:
            "For sighted users to preview content available behind a link.",
    },
    {
        projectName: "Progress",
        prompt: "/docs/primitives/progress",
        projectType:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        projectName: "Scroll-area",
        prompt: "/docs/primitives/scroll-area",
        projectType: "Visually or semantically separates content.",
    },
    {
        projectName: "Tabs",
        prompt: "/docs/primitives/tabs",
        projectType:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        projectName: "Tooltip",
        prompt: "/docs/primitives/tooltip",
        projectType:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]