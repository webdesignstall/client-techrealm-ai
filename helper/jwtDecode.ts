import { jwtDecode } from "jwt-decode";

export const jwtDecoder = (token:any) => {
  try {
    if (token) {
      const tokenDecoded = jwtDecode(token);
      return tokenDecoded;
    }
  } catch (error) {
    console.error('JWT Decoding Error:', error);
    // Handle the error appropriately, such as returning null or throwing a custom error.
  }
};
