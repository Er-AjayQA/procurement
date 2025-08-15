import { Outlet } from "react-router-dom";
import { HeaderNav } from "../HeaderNav";
import { SidebarMenu } from "../sidebar";
import { Breadcrumb } from "../UI/breadcrumb";
import { HeaderBrand } from "../UI/headerBrandUi";
import { NotificationProvider } from "../../contextApis/notificationManagement/notificationProvider";

export const HomeLayout = () => {
  return (
    <>
      <div className="flex h-screen p-3 haze_purple gap-2">
        {/* Sidebar */}
        <aside className="bg-body-bg_color basis-[16rem] ps-2 flex-shrink-0 rounded-lg h-full sticky top-[header-height] overflow-y-auto scrollbar-hide rounded-s-md">
          <HeaderBrand />
          <SidebarMenu />
        </aside>

        {/* Body */}

        <div className="bg-white h-full flex-grow overflow-y-scroll scrollbar-hide rounded-lg">
          <div className="flex justify-between items-center py-3 px-5 bg-white border-b-2 border-b-gray-200 sticky top-0 z-10">
            <Breadcrumb />
            <NotificationProvider>
              <HeaderNav />
            </NotificationProvider>
          </div>
          <div className="p-4 h-[75%]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
