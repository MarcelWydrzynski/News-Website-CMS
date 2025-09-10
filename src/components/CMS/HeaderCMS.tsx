import { Button, MegaMenu, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Link } from "react-router";
import { useAuth } from "../../Context/AuthContext";
import { Dropdown, DropdownItem } from "flowbite-react";

function HeaderCMS() {
  const { user, signOut } = useAuth();
  return (
    <MegaMenu>
      <Link to="/cms">
        <NavbarBrand>
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Admin</span>
        </NavbarBrand>
      </Link>

      <div className="flex md:order-2 gap-2">
        <p className="text-md">
          {user ? (
            <Dropdown label={`Hello, ${user.user_metadata.username}`} dismissOnClick={true}>
              <DropdownItem onClick={signOut}>Sign out</DropdownItem>
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
      <NavbarToggle />
      <NavbarCollapse>
        <Link to="/cms">
          <NavbarLink>Articles</NavbarLink>
        </Link>

        <Link to="/cms/images">
          <NavbarLink>Images</NavbarLink>
        </Link>
        <Link to="/cms/authors">
          <NavbarLink>Authors</NavbarLink>
        </Link>
        <Link to="/">
          <NavbarLink>Go to Website</NavbarLink>
        </Link>
      </NavbarCollapse>
    </MegaMenu>
  );
}

export default HeaderCMS;
