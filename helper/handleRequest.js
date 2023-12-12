import axiosInstance from "@/utilities/axiosInstance";
import { message } from "antd";

const handleRequest = async (method, url, body, header) => {
  try {
    if (body) {
      const { data } = await axiosInstance[method](url, body);
      data?.message && message?.success(data?.message);
      return data;
    } else if (body && header) {
      const { data } = await axiosInstance[method](url, body, {
        header: header,
      });
      data?.message && message?.success(data?.message);
      return data;
    } else {
      const { data } = await axiosInstance[method](url);
      data?.message && message?.success(data?.message);
      return data;
    }
  } catch (e) {

    const errors = e?.response?.data?.errorMessages;
    errors?.map((error) => message?.error(error?.message));
    return {
      success: false,
      data: null
    };
  }
};

export default handleRequest;
