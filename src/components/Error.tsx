import React from "react";

type ErrorProps = {
  errorMessage: string;
};

const Error = ({ errorMessage }: ErrorProps) => {
  return <p className="text-center text-xl text-rose-300 text-shadow-black">{errorMessage}</p>;
};

export default Error;
