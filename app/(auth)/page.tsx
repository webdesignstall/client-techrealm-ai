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
import { CreateProject } from "@/api/projectApi"
import { Toaster, toast } from 'sonner'
import axios from 'axios'
import { Loader2 } from 'lucide-react'



const formSchema = z
    .object({
        projectName: z.string().min(3),
        prompt: z.string().min(3),
        projectType: z.string().min(1),

    })



export default function Homepage() {

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
        setloading(true)
        const data = await CreateProject(values)
        if (data === true) {
            setloading(false)
            form.reset()
            toast.success('Project create successfully')
        } else {
            setloading(false)
            toast.warning('Something went wrong')
        }
    }

    React.useEffect(() => {
        (async () => {
            const ids = localStorage.getItem("projectIds");
            if (ids) {
                const result = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/projects-byids/${ids}`);
                setProjects(result?.data);
            }
        })();
    })
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
