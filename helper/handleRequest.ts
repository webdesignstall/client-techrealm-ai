import axiosInstance from '@/helper/axiosInstance';

export const HandleRequest = async (method:string, url:string, values:any = null) => {
  try {
    const config = values ? { data: values } : null;
    const response = await axiosInstance({
      method: method,
      url: url,
      ...config,
    });

    return response.data;
  } catch (error:any) {
    return error?.response?.data || error?.message;
  }
};
