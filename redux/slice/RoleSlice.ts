import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RolesState {
  list: string[]; // Replace string[] with your actual role type
  totalRole: number;
  roleId: string;
}

const initialState: RolesState = {
  list: [],
  totalRole: 0,
  roleId: "",
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setRoleList: (state, action: PayloadAction<string[]>) => {
      state.list = action.payload;
    },
    setTotalRole: (state, action: PayloadAction<number>) => {
      state.totalRole = action.payload;
    },
    setRoleId: (state, action: PayloadAction<string>) => {
      state.roleId = action.payload;
    },
  },
});

export const { setRoleList, setTotalRole, setRoleId } = rolesSlice.actions;
export default rolesSlice.reducer;
