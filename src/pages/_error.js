import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

function Error({ statusCode }) {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  if (statusCode === 404) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button onClick={goBack} type="primary">
            Back Home
          </Button>
        }
      />
    );
  }
  if (statusCode === 403) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button onClick={goBack} type="primary">
            Back Home
          </Button>
        }
      />
    );
  }
  if (statusCode === 500) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Button onClick={goBack} type="primary">
            Back Home
          </Button>
        }
      />
    );
  }
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
