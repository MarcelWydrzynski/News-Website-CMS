import {
  Button,
  MegaMenu,
  MegaMenuDropdown,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link } from "react-router";

function Header() {
  return (
    <MegaMenu>
      <Link to="/CMS">
        <NavbarBrand>
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            CMS
          </span>
        </NavbarBrand>
      </Link>

      <div className="order-2 hidden items-center md:flex">
        <Button href="#">Sign up</Button>
      </div>
      <NavbarToggle />
      <NavbarCollapse>
        <Link to="/CMS/articles">
          <NavbarLink>Articles</NavbarLink>
        </Link>

        <Link to="/CMS/images">
          <NavbarLink>Images</NavbarLink>
        </Link>
        <Link to="/CMS/articles">
          <NavbarLink>Ads</NavbarLink>
        </Link>
        <Link to="/CMS/articles">
          <NavbarLink>Authors</NavbarLink>
        </Link>
      </NavbarCollapse>
    </MegaMenu>
  );
}

export default Header;
