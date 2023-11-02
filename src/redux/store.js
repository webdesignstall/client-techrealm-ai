import { configureStore } from "@reduxjs/toolkit";
import permissionsReducer from "@/redux/slice/permission-slice";
import rolesReducer from "@/redux/slice/role-slice";
import authReducer from "@/redux/slice/auth-slice";

export default configureStore({
  reducer: {
    auth: authReducer,
    roles: rolesReducer,
    permissions: permissionsReducer,
  },
});
