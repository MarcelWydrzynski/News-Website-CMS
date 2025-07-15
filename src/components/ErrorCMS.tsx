import React from "react";

type ErrorProps = {
  errorMessage: string;
};

const Error = ({ errorMessage }: ErrorProps) => {
  return <p className="text-center text-xl text-red-400">{errorMessage}</p>;
};

export default Error;
