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
  const { userDetails, assignedModules } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Handling Logout
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar fluid rounded className="bg-[#E6E6E6]">
      <Link to="/procurement/home" className="flex flex-col items-center">
        <p className="text-3xl font-bold">ERP</p>
        <span className="text-xs">Enterprise Resource Planning</span>
      </Link>

      <div className="flex md:order-2">
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
    </Navbar>
  );
};
