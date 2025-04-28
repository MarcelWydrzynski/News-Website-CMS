import { Outlet } from "react-router";
import Header from "../Website/Header";
import FooterComponent from "../Website/Footer";

const Layout = () => {
  return (
    <div className="bg-[#ececec] w-full min-h-screen flex flex-col gap-8 max-[500px]:gap-2">
      <Header />
      <div className="flex-grow p-4 w-full max-w-[1440px] mx-auto">
        <Outlet />
      </div>
      <FooterComponent />
    </div>
  );
};

export default Layout;
