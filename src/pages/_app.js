import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress"; // You can use NProgress or any other loader library
import "nprogress/nprogress.css";

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
      NProgress.start();
    };

    const handleComplete = () => {
      setLoading(false);
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  const isDashboardRoute = router.pathname.startsWith("/dashboard");

  /* if (loading && !isDashboardRoute) {
    return (
      <div className="page-loader">
        <Spin size="large" />
      </div>
    );
  }*/

  return getLayout(
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>,
  );
}
