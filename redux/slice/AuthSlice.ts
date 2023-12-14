import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getToken } from '@/helper/sessionHelper'
import { jwtDecoder } from '@/helper/jwtDecode'

interface AuthState {
  token: any | null;
}

const initialState: AuthState = {
  token: jwtDecoder(getToken()) || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
