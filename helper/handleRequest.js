import axiosInstance from '@/helper/axiosInstance'

export const HandleRequest = async (method, url, values) => {
  try {
    if (!values) {
      const { data } = await axiosInstance[method](url)
      return data
    } else {
      const { data } = await axiosInstance[method](url, values)
      return data
    }

  } catch (err) {
    return err
  }
}