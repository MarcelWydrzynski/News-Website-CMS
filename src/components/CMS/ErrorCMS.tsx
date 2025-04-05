import React from "react";

type ErrorProps = {
  errorMessage: string;
};

const Error: React.FC<ErrorProps> = ({ errorMessage }) => {
  return (
    <div className="text-white">
      <h1 className="text-2xl">Oops! </h1>
      <span>There's an error: <p className="font-bold">{errorMessage}</p></span>
    </div>
  );
};

export default Error;
