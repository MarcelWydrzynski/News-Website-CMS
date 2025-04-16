import { Outlet } from "react-router";
import Header from "../../components/CMS/HeaderCMS";

const HomeCMS = () => {
  return (
    <div className="bg-[#111827] w-full min-h-screen flex flex-col">
      <Header />
      <div className="p-4 flex">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeCMS;
