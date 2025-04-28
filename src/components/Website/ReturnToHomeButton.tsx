import React from "react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

const ReturnToHomeButton = () => {
  return (
    <Link to={"/"}>
      <Button className="bg-transparent! text-black w-fit self-end mt-auto focus:ring-transparent! hover:cursor-pointer mb-10 max-[500px]:mb-2 p-0 select-none">&larr; Return to homepage</Button>
    </Link>
  );
};

export default ReturnToHomeButton;
