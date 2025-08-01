import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarToggle,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { logout } from "../ReduxToolkit/authSlice";

export const HeaderNav = () => {
  const { userDetails, activeModule } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Handling Logout
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar fluid rounded className="bg-white !px-0 !py-0">
      {/* Logo Container */}
      <div className="basis-[16rem] flex-shrink-0 border-e border-e-[2px] border-e-gray-200 px-2 py-2">
        <Link
          to="/procurement/dashboard"
          className="flex flex-col items-center"
        >
          <p className="text-3xl font-bold">ERP</p>
          <span className="text-[10px]">Enterprise Resource Planning</span>
        </Link>
      </div>

      {/* Menu Container */}
      <div className="flex flex-grow md:order-2 py-2 px-5">
        <div className="flex justify-between items-center w-full">
          <p>{activeModule}</p>

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
      </div>
    </Navbar>
  );
};
