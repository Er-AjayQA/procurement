import { Outlet } from "react-router-dom";
import { HeaderNav } from "../HeaderNav";
import { SidebarMenu } from "../sidebar";

export const HomeLayout = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10">
          <HeaderNav />
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar container */}
          <aside className="bg-[#F9FAFB] w-[16rem] h-full sticky top-[header-height] overflow-y-auto py-5 px-2">
            <SidebarMenu />
          </aside>
          {/* Body Container */}
          <div className="w-[84rem] overflow-y-auto p-5">
            <div className="bg-white h-full overflow-y-scroll scrollbar-hide">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
