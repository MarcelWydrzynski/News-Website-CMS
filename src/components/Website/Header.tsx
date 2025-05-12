import { MegaMenu, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Logo from "../../../public/czelad-times-high-resolution-logo.png";
import { Link } from "react-router-dom";

function Header() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const currentDate = `${date}/${month}/${year}`;

  const hours = today.getHours();
  const minutes = today.getMinutes();
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const isPM = hours >= 12;
  const currentTime = `${formattedHours}:${formattedMinutes} ${isPM ? "PM" : "AM"}`;

  return (
    <MegaMenu className="bg-transparent! py-2 w-full border-b-1 select-none">
      <NavbarBrand>
        <Link to={"/"}>
          <img src={Logo} alt="logo of czeladź times company" className="w-56 max-[500px]:w-full" />
        </Link>
      </NavbarBrand>
      <div className="flex md:order-2 gap-2">
        <p className="font-bold text-xl">
          {currentDate} {currentTime}
        </p>
      </div>
      <NavbarToggle className="hover:bg-[#dbdbdbe3]! focus:ring-transparent!" />

      <NavbarCollapse>
        <Link to={"/"}>
          <NavbarLink className="text-black! hover:cursor-pointer hover:bg-transparent! p-4! rounded-2xl mt-2 border-none! text-center">Articles</NavbarLink>
        </Link>
        <Link to={"crypto"}>
          <NavbarLink className="text-black! hover:cursor-pointer hover:bg-transparent! p-4! rounded-2xl mt-2 border-none! text-center">Crypto</NavbarLink>
        </Link>

        <Link to={"InProgress"}>
          <NavbarLink className="text-black! hover:cursor-pointer hover:bg-transparent! p-4! rounded-2xl mt-2 border-none! text-center">Weather</NavbarLink>
        </Link>
        <Link to="/admin">
          <NavbarLink>
            <NavbarLink className="text-black! hover:cursor-pointer hover:bg-transparent! p-4! rounded-2xl mt-2 border-none! text-center">Go to CMS</NavbarLink>
          </NavbarLink>
        </Link>
      </NavbarCollapse>
    </MegaMenu>
  );
}

export default Header;
