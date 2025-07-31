import { Outlet } from "react-router-dom";
import { HeaderNav } from "../HeaderNav";
import { SidebarMenu } from "../sidebar";

export const HomeLayout = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 shadow-md">
          <HeaderNav />
        </div>

        <div className="flex flex-1 overflow-hidden bg-body">
          {/* Sidebar container */}
          <aside className="bg-white  basis-[16rem] px-2 flex-shrink-0 h-full sticky top-[header-height] overflow-y-auto">
            <SidebarMenu />
          </aside>
          {/* Body Container */}
          <div className="flex-grow md:order-2 overflow-y-auto p-5 bg-[#eeecec]">
            <div className="bg-white h-full overflow-y-scroll scrollbar-hide">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
