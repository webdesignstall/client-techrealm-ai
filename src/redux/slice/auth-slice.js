import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "@/utilities/jwtDecode.js";
import { getToken, setToken } from "@/utilities/sessionHelper";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: jwtDecode(getToken()),
  },
  reducers: {
    setAuth: (state, action) => {
      setToken(action.payload);
    },
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
