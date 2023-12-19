"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Toaster, toast } from 'sonner'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { HandleRequest } from '@/helper/handleRequest';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';




const formSchema = z
    .object({
        projectName: z.string().min(3),
        prompt: z.string().min(3),
        projectType: z.string().min(1),

    })



export default function CreateProject() {


    const { token } = useSelector((state: any) => state.auth);
    const router = useRouter()
    const [loading, setloading] = React.useState(false)
    const [projects, setProjects] = React.useState([]);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectName: "",
            prompt: "",
            projectType: "",
        },
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setloading(true)
            if (!token) {
                const data = await HandleRequest('post', '/projects', values)
                const storedIds: string[] = JSON.parse(localStorage.getItem("projectIds") ?? "[]") || [];
                // Add the new ID to the array
                storedIds.push(data?.data?._id);
                // Store the updated array back in localStorage
                localStorage.setItem("projectIds", JSON.stringify(storedIds));
                if (data.success === true) {
                    setloading(false)
                    toast.success(data?.message)
                    router.push(`/project/${data?.data?.link}?param=${true}`);
                } else {
                    setloading(false)
                    toast.error(data?.response?.data?.message)
                }

            } else {
                const data = await HandleRequest('post', '/projects', {
                    projectName: values.projectName,
                    prompt: values.prompt,
                    projectType: values.projectType,
                    userId: token.id
                })
                if (data.success === true) {
                    setloading(false)
                    toast.success(data?.message)
                    router.push(`/dashboard/${data?.data?.link}?param=${true}`);
                } else {
                    setloading(false)
                    toast.error(data?.response?.data?.message)
                }
            }
        } catch (err: any) {
            toast.error(err?.response?.data?.message)
        }
    }

    return (
        <div className='max-w-xl m-auto my-14 shadow-lg p-8'>
            <Toaster richColors />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="w-full flex flex-col gap-4"
                >
                    <FormField
                        control={form.control}
                        name="projectName"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel className="text-lg lg:text-sm font-semibold text-gray-600 dark:text-gray-300">Project Name</FormLabel>
                                    <FormControl>
                                        <Input className="py-6"
                                            placeholder="Project Name"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />

                    <FormField
                        control={form.control}
                        name="prompt"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel className="text-lg lg:text-sm font-semibold text-gray-600 dark:text-gray-300">Description / Prompt</FormLabel>
                                    <FormControl>
                                        <Textarea className="py-6"
                                            placeholder="Description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="projectType"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel className="text-lg lg:text-sm font-semibold text-gray-600 dark:text-gray-300">What type of project do you have?</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Please select a project type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value='ecommerce'>Ecommerce</SelectItem>
                                                    <SelectItem value='landingPage'>landingPage</SelectItem>
                                                    <SelectItem value='softwareasaservicepage'>Software as a service page</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    {
                        !loading ? <Button type="submit" className="w-full py-8 text-xl lg:py-6 lg:text-lg">
                            Generate now
                        </Button> :
                            <Button disabled className="w-full py-8 text-xl lg:py-6 lg:text-lg">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                    }

                </form>
            </Form>
        </div>
    )
}
