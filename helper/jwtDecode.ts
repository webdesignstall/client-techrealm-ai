import { jwtDecode } from "jwt-decode";

export const jwtDecoder = (token:any) => {
  if (token) {
    const tokenDecoded = jwtDecode(token || null);
    return tokenDecoded;
  }
};
