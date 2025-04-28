import { Alert } from "flowbite-react";

const InProgress = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center my-10 px-4">
      <Alert color="info" className="max-w-xl text-center" >
        <span className="font-bold text-lg">Page Under Construction 🚧</span>
        <p className="mt-2 text-sm">This page is still being developed and is not the final version of the application. Stay tuned for updates!</p>
      </Alert>
    </div>
  );
};

export default InProgress;
