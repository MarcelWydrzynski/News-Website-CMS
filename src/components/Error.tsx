
type ErrorProps = {
  errorMessage: string;
};

const Error = ({ errorMessage }: ErrorProps) => {
  return <p className="text-center select-none text-xl text-rose-400 text-shadow-black">{errorMessage}</p>;
};

export default Error;
