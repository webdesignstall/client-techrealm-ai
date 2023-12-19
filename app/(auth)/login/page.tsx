"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from 'lucide-react';
import { Toaster } from 'sonner'
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
import { toast } from "sonner"
import { HandleRequest } from "@/helper/handleRequest";
import { store } from "@/redux/store";
import { setToken } from "@/redux/slice/AuthSlice";




const formSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(3),
    })


export default function Login() {

    const [loading, setloading] = React.useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });


    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setloading(true)
            const data = await HandleRequest("post", '/login', values)
            if (data.success === true) {
                await store.dispatch(setToken(data?.data?.accessToken))
                toast.success(data.message)
                setTimeout(() => {
                    setloading(false)
                    window.location.href = '/dashboard'
                }, 1000);
            } else {
                setloading(false)
                toast.error(data?.message || data)
            }
        } catch (err: any) {
            setloading(false)
            toast.error(err?.response?.data?.message || err?.message || err)
        }
    };

React.useEffect(()=>{
    localStorage.removeItem('otpEmail');
    localStorage.removeItem('token');
}, [])

    return (
            <main className="p-4 py-14 flex lg:flex-col justify-center lg:items-center lg:h-full lg:py:0 lg:p-0">
                <Toaster richColors />
                <div className="w-full max-w-md">
                    <div className="py-8">
                        <div>
                            <h1 className="text-center lg:text-3xl text-4xl py-4 font-bold lg:font-semibold text-gray-800 dark:text-white">Login Your Account</h1>
                        </div>
                        <div>
                            <Link className="flex text-center rounded-full text-md py-2 font-bold text-orange-600 dark:text-gray-300 dark:hover:bg-gray-900  justify-center lg:text-sm lg:font-semibold hover:bg-gray-100" href='/sign-up'>Create a new Account? Sign Up <ArrowRight /></Link>
                        </div>
                    </div>
                    <div>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleSubmit)}
                                className="w-full flex flex-col gap-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel className="text-lg lg:text-sm font-semibold text-gray-600 dark:text-white">Email address</FormLabel>
                                                <FormControl>
                                                    <Input className="py-6"
                                                        placeholder="xyz@example.com"
                                                        type="email"
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
                                    name="password"
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel className="text-lg lg:text-sm font-semibold text-gray-600 dark:text-white">Password</FormLabel>
                                                <FormControl>
                                                    <Input className="py-6"
                                                        placeholder="Password" type="password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                />

                                {
                                    !loading ? <Button type="submit" className="w-full py-8 text-xl lg:py-6 lg:text-lg">
                                        Login
                                    </Button> :
                                        <Button disabled className="w-full py-8 text-xl lg:py-6 lg:text-lg">
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Please wait
                                        </Button>
                                }
                            </form>
                        </Form>
                        <div>
                            <h1 className="text-orange-600 font-bold py-6 text-right lg:text-sm">
                                <Link className='dark:text-gray-500 dark:hover:text-gray-400 duration-300' href='/forget-password'>Forget Password?</Link>
                            </h1>

                        </div>
                    </div>
                </div>
            </main>
    );
}
