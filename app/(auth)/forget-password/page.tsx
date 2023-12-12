"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from 'lucide-react';
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


const formSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(3),
    })


export default function ForgetPassword() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };

    return (
        <main className="p-4 py-14 flex lg:flex-col justify-center lg:items-center lg:h-full lg:py:0 lg:p-0">
            <div className="w-full max-w-md">
                <div className="py-8">
                    <div>
                        <h1 className="text-center lg:text-3xl text-4xl py-4 font-bold lg:font-semibold text-gray-800">Forget your password</h1>
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
                                            <FormLabel className="text-lg lg:text-sm font-semibold text-gray-600">Email address</FormLabel>
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

                            <Button type="submit" className="w-full py-8 text-xl lg:py-6 lg:text-lg">
                                Sent OTP
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </main>
    );
}
