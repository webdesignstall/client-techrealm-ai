import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PermissionsState {
  list: any[]; // Replace 'any[]' with the actual type of your 'list' data
  permissionByRole: any[]; // Replace 'any[]' with the actual type of your 'permissionByRole' data
  checkedValues: any[]; // Replace 'any[]' with the actual type of your 'checkedValues' data
}

const initialState: PermissionsState = {
  list: [],
  permissionByRole: [],
  checkedValues: [],
};

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    setPermissionList: (state, action: PayloadAction<any[]>) => {
      state.list = action.payload;
    },
    setPermissionByRole: (state, action: PayloadAction<any[]>) => {
      state.permissionByRole = action.payload;
    },
    setCheckedValue: (state, action: PayloadAction<any[]>) => {
      state.checkedValues = action.payload;
    },
  },
});

export const { setPermissionList, setPermissionByRole, setCheckedValue } = permissionsSlice.actions;
export default permissionsSlice.reducer;
