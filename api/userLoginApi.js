import axios from "axios"
import { store } from "@/redux/store"
import { setToken } from "@/redux/slice/AuthSlice"
import instance from '@/helper/axiosInstance'



export const AuthCheck = async () => {
    try {
        const { data } = await instance.get(`${process.env.NEXT_PUBLIC_API_BASE}/auth/auth-check`,)
        return data
    } catch (err) {
        return err
    }
}
export const userLogin = async (values) => {
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/login`, values)
        await store.dispatch(setToken(data?.data?.accessToken))
        return true
    } catch (err) {
        return false
    }
}
export const userSignup = async (values) => {
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/register`, values)
        await store.dispatch(setToken(data?.data?.accessToken))
        return true
    } catch (err) {
        return false
    }
}


export const PasswordForget = async (values) => {
    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/resend-otp/${values.email}`, values)
        localStorage.setItem("otpEmail", values?.email);
        return data
    } catch (err) {
        return err.response
    }
}


export const OTPverification = async (values) => {
    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/otp/${localStorage.getItem('otpEmail')}/${values}`,)
        localStorage.setItem("verifyOtp", values);
        return data
    } catch (err) {
        return err.response
    }
}

export const ResetPassword = async (values) => {
    try {
        const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE}/passwords`, values)
        return data
    } catch (err) {
        return err.response
    }
}


