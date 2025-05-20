import { Spinner } from "flowbite-react";

type LoaderCMSProps = {
  textDark: boolean;
};

const LoaderCMS = ({ textDark }: LoaderCMSProps) => {
  return (
    <p className={`text-2xl tracking-tight ${textDark ? "text-black" : "text-white"} mx-auto`}>
      loading data... <Spinner aria-label="Large spinner example" size="lg" />
    </p>
  );
};

export default LoaderCMS;
