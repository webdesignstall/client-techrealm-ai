import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spin } from "antd";

const AuthLoader = () => {
  // slice
  const [count, setCount] = useState(3);
  // hooks
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 &&
      /*navigate(`/${path}`, {
            slice: location.pathname,
        });*/
      router.push("/");
    // cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div
      style={{
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white!important",
        height: "100vh",
        width: "100%",
        position: "absolute",
        left: "0px!important",
      }}
    >
      <Spin tip="Loading" size="large" />
    </div>
  );
};

export default AuthLoader;
