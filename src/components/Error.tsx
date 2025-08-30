
type ErrorProps = {
  errorMessage: string;
};

const Error = ({ errorMessage }: ErrorProps) => {
  return <p className="text-center select-none text-xl text-red-400">{errorMessage}</p>;
};

export default Error;
