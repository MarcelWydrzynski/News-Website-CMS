import { Button } from "flowbite-react";
import { useNavigate } from "react-router";

type LostPageProps = {
  textDark: boolean;
};

const LostPage = ({ textDark }: LostPageProps) => {
  const navigate = useNavigate();
  const textColor = textDark ? "text-black" : "text-white";

  return (
    <div className={`w-full flex justify-center flex-col items-center gap-6 ${textColor}`}>
      <h1 className="font-bold text-3xl">Oops! Looks like you’re lost.</h1>
      <h2 className="text-5xl font-extrabold mb-4">404</h2>
      <p className="text-lg">We can’t seem to find the page you’re looking for. Maybe it wandered off into the internet wilderness.</p>
      <Button
        className={`!bg-transparent border focus:!ring-transparent hover:cursor-pointer select-none hover:scale-110 transition-all ${textColor}`}
        onClick={() => navigate(-1)}
      >
        Go Back
      </Button>
    </div>
  );
};

export default LostPage;
