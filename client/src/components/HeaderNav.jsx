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
import { useEffect, useState } from "react";

export const HeaderNav = () => {
  const { userDetails, activeModule } = useSelector((state) => state.auth);
  const [displayModule, setDisplayModule] = useState(activeModule);

  const dispatch = useDispatch();

  useEffect(() => {
    setDisplayModule(activeModule);
  }, [activeModule]);

  // Handling Logout
  const handleLogout = () => {
    dispatch(logout());
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
    </Navbar>
  );
};
