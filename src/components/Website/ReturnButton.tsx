import { Link, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

type ReturnButtonProps = {
  path?: string; 
  onClick?: () => void;
};

const ReturnButton = ({ path, onClick }: ReturnButtonProps) => {
  const navigate = useNavigate();

  // Default behavior: go back in history if no path or onClick provided
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (!path) {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/");
      }
    }
  };

  const button = (
    <Button
      onClick={handleClick}
      className="!bg-transparent text-black w-fit mt-auto focus:!ring-transparent hover:cursor-pointer mb-10 max-[500px]:mb-2 p-0 select-none"
    >
      &larr; Return
    </Button>
  );

  // If path provided → render Link, else just render button with click handler
  return path ? <Link to={path}>{button}</Link> : button;
};

export default ReturnButton;
