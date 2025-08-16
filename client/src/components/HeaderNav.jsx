import { useDispatch, useSelector } from "react-redux";
import { FaBell } from "react-icons/fa";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarToggle,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../ReduxToolkit/authSlice";
import { useEffect, useState } from "react";
import { NotificationContainer } from "./notificationManagement/notificationContainer";
import { useNotificationContext } from "../contextApis/useNotificationContextFile";

export const HeaderNav = () => {
  const { userDetails, activeModule } = useSelector((state) => state.auth);
  const [displayModule, setDisplayModule] = useState(activeModule);
  const { newNotificationsCount, handleNotificationVisibility, viewId } =
    useNotificationContext();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    setDisplayModule(activeModule);
  }, [activeModule]);

  // Handling Logout
  const handleLogout = () => {
    dispatch(logout());
    navigate(`/procurement/sign-in`);
  };

  return (
    <Navbar fluid rounded className="bg-white !px-0 !py-0">
      {/* Menu Container */}
      <div className="flex flex-grow md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">{userDetails?.userName}</span>
            <span className="block truncate text-sm font-medium">
              {userDetails?.official_email}
            </span>
          </DropdownHeader>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>

      <div className="me-5 relative p-2">
        <FaBell
          className="w-[20px] h-[20px] cursor-pointer"
          onClick={() => handleNotificationVisibility("open")}
        />

        <div className="w-[10px] h-[10px] rounded-[50%] bg-red-600 absolute top-[-2px] right-[-2px] p-2 text-xs text-white flex items-center justify-center">
          {newNotificationsCount}
        </div>
      </div>

      {/* Notfication Container */}
      <NotificationContainer
        onClose={() => handleNotificationVisibility("close")}
      />
    </Navbar>
  );
};
