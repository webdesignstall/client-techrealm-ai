"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from 'lucide-react';
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
import { useRouter } from 'next/navigation'
import { Toaster, toast } from "sonner";
import { HandleRequest } from "@/helper/handleRequest";

const formSchema = z
    .object({
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


export default function ChangePassword() {

    const [loading, setloading] = React.useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });


    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setloading(true)

            const data = await HandleRequest('post', '/passwords', {
                password: values.password,
                confirmPassword: values.confirmPassword,
                email: localStorage.getItem("otpEmail"),
                otp: localStorage.getItem("verifyOtp"),
            })


            if (data.success === true) {
                toast.success(data.message)
                form.reset()
                setTimeout(() => {
                    setloading(false)
                    router.push('/login')
                }, 1000);
            } else {
                setloading(false)
                toast.error(data.message || data)
            }
        } catch (err:any) {
            setloading(false)
            toast.error(err?.response?.data?.message || err?.message || err)
        }
    };

    const router = useRouter()



    return (
        <main className="flex  flex-col max-w-md w-full  gap-4  m-auto px-3">
            <Toaster richColors />
            <div className="">
                <div>
                    <h1 className="text-center  text-3xl py-4 font-bold lg:font-semibold text-gray-600 dark:text-white">Create new password</h1>
                </div>
            </div>
            <div className="py-4 lg:py-0">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className=""
                    >
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
                                Change Password
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