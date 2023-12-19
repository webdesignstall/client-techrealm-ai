"use client";
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
import React from "react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { HandleRequest } from "@/helper/handleRequest";


const formSchema = z
    .object({
        otp: z.string().min(6),
    })


export default function Verification() {

    const router = useRouter()
    const [loading, setloading] = React.useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setloading(true)
            const numericOTP = parseInt(values.otp, 10); // Convert the OTP string to a number
            const data = await HandleRequest('get', `/otp/${localStorage.getItem('otpEmail')}/${numericOTP}`)
            if (data.success === true) {
                toast.success(data.message)
                setTimeout(() => {
                    setloading(false)
                    router.push('/reset-password')
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

    return (
        <main className="p-4 py-14 flex lg:flex-col justify-center lg:items-center lg:h-full lg:py:0 lg:p-0">
            <Toaster richColors />
            <div className="w-full max-w-md">
                <div className="py-8">
                    <div>
                        <h1 className="text-center lg:text-3xl text-4xl py-4 font-bold lg:font-semibold text-gray-800 dark:text-white">
                            Verify your OTP pin code
                        </h1>
                    </div>
                </div>
                <div>
                    <div>
                        <Label className="text-lg lg:text-sm font-semibold text-gray-600 dark:text-white">Email Address</Label>
                        <Input className="my-2 py-6" disabled defaultValue={`${localStorage.getItem('otpEmail')}`} />
                    </div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className="w-full flex flex-col gap-4"
                        >
                            <FormField
                                control={form.control}
                                name="otp"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel className="text-lg lg:text-sm font-semibold text-gray-600 dark:text-white">OTP</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="py-6"
                                                    placeholder="Enter your code"
                                                    type="number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />

                            {
                                !loading ? <Button type="submit" className="w-full py-8 text-xl lg:py-6 lg:text-lg">
                                    Send OTP
                                </Button> :
                                    <Button disabled className="w-full py-8 text-xl lg:py-6 lg:text-lg">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </Button>
                            }
                        </form>
                    </Form>
                </div>
            </div>
        </main>
    );
}
