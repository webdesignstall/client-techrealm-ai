import axios from "axios"
import instance from '@/helper/axiosInstance'


export const ProjectList = async () => {
    try {
        const { data } = await instance.get(`${process.env.NEXT_PUBLIC_API_BASE}/projects`)
        return data
    } catch (err) {
        return false
    }
}


export const CreateProject = async (values) => {
    try {
        const { data } = await instance.post(`/projects`, values)
        return data
    } catch (err) {
        return err.response
    }
}


export const SingleProject = async (link) => {
    try {
        const { data } = await instance.get(`/projects/${link}`)
        return data.data
    } catch (err) {
        return false
    }
}