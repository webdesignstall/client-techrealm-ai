"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CreateProject } from "@/api/projectApi"
import { Toaster, toast } from 'sonner'


const formSchema = z
    .object({
        projectName: z.string().min(3),
        prompt: z.string().min(3),
        projectType: z.string().min(1),

    })

export default function Project() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectName: "",
            prompt: "",
            projectType: "",
        },
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        const data = await CreateProject(values)
        if (data.success === true) {
            toast.success(data.message)
        } else {
            toast.warning(data.data.message)
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
                                    <FormLabel className="text-lg lg:text-sm font-semibold text-gray-600 dark:text-gray-300">Select your project type</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a fruit" />
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
                    <DialogFooter>
                        <Button type="submit">Generate now</Button>
                    </DialogFooter>
                </form>
            </Form>
        </div>
    )
}
