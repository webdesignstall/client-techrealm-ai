import axios from "axios"
import { store } from "@/redux/store"
import { setToken } from "@/redux/slice/AuthSlice"





export const AuthCheck = async (values) => {
    try {
        const data = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}//auth/auth-check`, values)
        console.log(data)
        return true
    } catch (err) {
        return false
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
        console.log(data)
        return true
    } catch (err) {
        return false
    }
}


