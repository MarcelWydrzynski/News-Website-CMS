import { MegaMenu, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Logo from "../../../public/czelad-times-high-resolution-logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { Dropdown, Button, DropdownItem } from "flowbite-react";

function Header() {
  const { user, signOut } = useAuth();

  return (
    <MegaMenu className="bg-transparent! py-4 w-full border-b-1 select-none">
      <NavbarBrand>
        <Link to={"/"}>
          <img src={Logo} alt="logo of czeladź times company" className="w-56 max-[500px]:w-full" />
        </Link>
      </NavbarBrand>
      <div className="flex md:order-2 gap-2">
        <p className="text-md">
          {user ? (
            <Dropdown
              label={`Hello, ${user.user_metadata.username}`}
              dismissOnClick={true}
              className="bg-transparent! border-1 text-black! cursor-pointer! focus:ring-transparent!"
            >
              <DropdownItem className="bg-white!  text-black! cursor-pointer! focus:ring-transparent!">
                <Link to={"favorite-articles"}>Favorite articles</Link>
              </DropdownItem>
              <DropdownItem className="bg-white! text-black! cursor-pointer! focus:ring-transparent!" onClick={() => signOut()}>
                Sign out
              </DropdownItem>
            </Dropdown>
          ) : (
            <Link to="/user-authentication">
              <Button className="!bg-transparent text-black border w-fit self-end mt-auto hover:!bg-white focus:!ring-transparent hover:cursor-pointer select-none hover:scale-110 transition-all">
                Sign in
              </Button>
            </Link>
          )}
        </p>
      </div>
      <NavbarToggle className="hover:bg-[#dbdbdbe3]! focus:ring-transparent!" />

      <NavbarCollapse>
        <Link to={"/"}>
          <NavbarLink className="border-1! text-black! hover:cursor-pointer hover:bg-transparent! p-4! rounded-2xl mt-2 border-none! text-center">Articles</NavbarLink>
        </Link>

        <Link to={"crypto"}>
          <NavbarLink className="border-1! text-black! hover:cursor-pointer hover:bg-transparent! p-4! rounded-2xl mt-2 border-none! text-center">Crypto</NavbarLink>
        </Link>

        <Link to={"weather"}>
          <NavbarLink className="border-1! text-black! hover:cursor-pointer hover:bg-transparent! p-4! rounded-2xl mt-2 border-none! text-center">Weather</NavbarLink>
        </Link>

        {user ? (
          <Link to={"cms"}>
            <NavbarLink className="border-1! text-black! hover:cursor-pointer hover:bg-transparent! p-4! rounded-2xl mt-2 border-none! text-center">Go to CMS</NavbarLink>
          </Link>
        ) : (
          <Link to={"user-authentication"}>
            <NavbarLink className="text-black! hover:cursor-pointer hover:bg-transparent! p-4! rounded-2xl mt-2 border-none! text-center">Go to CMS</NavbarLink>
          </Link>
        )}
      </NavbarCollapse>
    </MegaMenu>
  );
}

export default Header;
