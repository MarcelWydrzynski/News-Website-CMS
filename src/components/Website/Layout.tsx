import { Outlet } from "react-router";
import Header from "../Website/Header";
import FooterComponent from "../Website/Footer";

const Layout = () => {
  return (
    <div className="bg-[#c3c3c3] w-full min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow p-4 w-full max-w-[1440px] mx-auto border-2">
        <Outlet />
      </div>
      <FooterComponent />
    </div>
  );
};

export default Layout;
