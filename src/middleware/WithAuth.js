import React, { useEffect, useState } from "react";
import { getToken } from "@/utilities/sessionHelper";
import AuthLoader from "@/components/AuthLoader";
import handleRequest from "@/utilities/handleRequest";
import { getDisplayName } from "next/dist/shared/lib/utils";
import { Provider } from "react-redux";
import store from "@/redux/store";

const withAuth = (WrappedComponent) => {
  const WithAuthWrapper = (props) => {
    const [ok, setOk] = useState(false);
    const token = getToken();

    useEffect(() => {
      const authCheck = async () => {
        const data = await handleRequest("get", `/auth/auth-check`);
        if (data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      };

      if (token) authCheck().catch();
    }, [token]);

    return ok ? (
      <Provider store={store}>
        <WrappedComponent {...props} />
      </Provider>
    ) : (
      <AuthLoader path="" />
    );
  };

  WithAuthWrapper.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return WithAuthWrapper;
};

export default withAuth;
