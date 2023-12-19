"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { userSignup } from "@/api/userLoginApi";
import { Toaster, toast } from "sonner";
import { HandleRequest } from "@/helper/handleRequest";

const formSchema = z
    .object({
        name: z.object({
            firstName: z.string(),
            lastName: z.string(),
        }),
        email: z.string().email(),
        password: z.string().min(3),
        confirmPassword: z.string(),
    })
    .refine(
        (data) => {
            return data.password === data.confirmPassword;
        },
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }
    )


export default function Signup() {

    const [loading, setloading] = React.useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: {
                firstName: "",
                lastName: "",
            },
            email: "",
            password: "",
            confirmPassword: "",
        },
    });


    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setloading(true)
            const data = await HandleRequest("post", '/register', values)
            if (data.success === true) {
                toast.success(data.message)
                form.reset()
                setTimeout(() => {
                    setloading(false)
                    router.push('/login')
                }, 1000);
            } else {
                console.log(data)
                setloading(false)
                toast.error(data?.response?.data?.message || data?.message)
            }
        } catch (err: any) {
            toast.error(err?.response?.data?.message)
        }
    };

    const router = useRouter()



    return (
        <main className="flex  flex-col max-w-md w-full  gap-4  m-auto px-3">
            <Toaster richColors />
            <div className="">
                <div>
                    <h1 className="text-center  text-3xl py-4 font-bold lg:font-semibold text-gray-600 dark:text-white">Create a new Account</h1>
                </div>
                <div>
                    <Link className="flex text-center rounded-full text-md py-2 font-bold text-orange-600  justify-center lg:text-sm lg:font-semibold hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900" href='/login'>Already have an account? Login <ArrowRight /></Link>
                </div>
            </div>
            <div className="py-4 lg:py-0">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className=""
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name.firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg lg:text-sm">First Name</FormLabel>
                                        <FormControl>
                                            <Input className="py-6" placeholder="First Name" {...field} />
                                        </FormControl>

                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="name.lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg lg:text-sm">Last Name</FormLabel>
                                        <FormControl>
                                            <Input className="py-6" placeholder="Last Name" {...field} />
                                        </FormControl>

                                    </FormItem>
                                )}
                            />

                        </div>



                        <div className="py-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel className="text-lg lg:text-sm">Email address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="py-6"
                                                    placeholder="Email address"
                                                    type="email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>

                        <div className="py-2">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel className="text-lg lg:text-sm">Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="py-6"
                                                    placeholder="Password"
                                                    type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>
                        <div className="py-2">
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel className="text-lg lg:text-sm">Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="py-6"
                                                    placeholder="Confirm Password"
                                                    type="password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>
                        {
                            !loading ? <Button type="submit" className="w-full my-4 py-8 text-xl lg:py-6 lg:text-lg">
                                Create account
                            </Button> :
                                <Button disabled className="w-full my-4 py-8 text-xl lg:py-6 lg:text-lg">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </Button>
                        }
                    </form>
                </Form>
            </div>
        </main>
    );
}