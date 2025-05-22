import { Button, MegaMenu, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Link } from "react-router";

function HeaderCMS() {
  return (
    <MegaMenu>
      <Link to="/cms">
        <NavbarBrand>
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Admin</span>
        </NavbarBrand>
      </Link>

      <div className="order-2 hidden items-center md:flex">
        <Button href="#">Sign up</Button>
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
        <Link to="https://news-website-cms.vercel.app/">
          <NavbarLink>Go to Website</NavbarLink>
        </Link>
      </NavbarCollapse>
    </MegaMenu>
  );
}

export default HeaderCMS;
