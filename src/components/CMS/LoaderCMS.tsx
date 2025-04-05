import { Spinner } from "flowbite-react";

const LoaderCMS = () => {
  return (
    <p className="text-2xl tracking-tight text-gray-900 dark:text-white">
      loading data... <Spinner aria-label="Large spinner example" size="lg" />
    </p>
  );
};

export default LoaderCMS;
