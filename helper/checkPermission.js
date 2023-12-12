import store from "../redux/store";

export const checkPermission = (permission) => {
  const { currentUser } = store.getState().auth;
  if (currentUser?.role?.name === "super_admin") {
    return true;
  }
  const authPermission = currentUser?.permissions;
  return authPermission?.some((item) => item?.name === permission);
};
