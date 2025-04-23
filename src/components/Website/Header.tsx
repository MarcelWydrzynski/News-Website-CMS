import { MegaMenu, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Logo from "../../../public/czelad-times-high-resolution-logo.png";

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
    <MegaMenu className="bg-[#dbdbdbe3]! py-2 w-full">
      <NavbarBrand>
        <img src={Logo} alt="logo of czeladź times company" className="w-56" />
      </NavbarBrand>
      <div className="flex md:order-2 gap-2">
        <p className="font-bold">{currentDate}</p>
        <p className="font-bold">{currentTime}</p>
      </div>
      <NavbarToggle className="hover:bg-[#dbdbdbe3]! focus:ring-black" />

      <NavbarCollapse>
        <NavbarLink className="text-black! hover:cursor-pointer hover:bg-white! p-4! rounded-2xl mt-2">Articles</NavbarLink>
        <NavbarLink className="text-black! hover:cursor-pointer hover:bg-white! p-4! rounded-2xl mt-2">Crypto</NavbarLink>
        <NavbarLink className="text-black! hover:cursor-pointer hover:bg-white! p-4! rounded-2xl mt-2">Weather</NavbarLink>
      </NavbarCollapse>
    </MegaMenu>
  );
}

export default Header;
