import React from "react";

type ErrorProps = {
  errorMessage: string;
};

const ErrorCMS: React.FC<ErrorProps> = ({ errorMessage }) => {
  return <p className="text-center text-xl text-red-400">{errorMessage}</p>;
};

export default ErrorCMS;
