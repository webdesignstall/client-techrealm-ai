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
        projectName: z.string(),
        prompt: z.string(),
        projectType: z.string(),

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
        if (data === true) {
            toast.success('Project saved successfully')
        } else {
            toast.warning('Something went wrong')
        }
    }

    return (
        <div>
            <Toaster richColors />
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Add New</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create a new Project</DialogTitle>
                    </DialogHeader>

                    
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
                                                            <SelectValue placeholder="Select a fruit" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Fruits</SelectLabel>
                                                                <SelectItem value='Apple'>Apple</SelectItem>
                                                                <SelectItem value='Banana'>Banana</SelectItem>
                                                                <SelectItem value='Blueberry'>Blueberry</SelectItem>
                                                                <SelectItem value='grapes'>Grapes</SelectItem>
                                                                <SelectItem value='pinaaple'>Pineapple</SelectItem>
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
                </DialogContent>
            </Dialog>
        </div>
    )
}
