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
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { logout, setActiveEntity } from "../ReduxToolkit/authSlice";
import { useEffect, useState } from "react";
import { NotificationContainer } from "./notificationManagement/notificationContainer";
import { useNotificationContext } from "../contextApis/useNotificationContextFile";
import { getAllEntityList } from "../services/entityManagement_services/service";
import { getEmployeeDetails } from "../services/employeeDetails_services/services";

export const HeaderNav = () => {
  const { userDetails, activeModule } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);
  const [displayModule, setDisplayModule] = useState(activeModule);
  const { newNotificationsCount, handleNotificationVisibility, viewId } =
    useNotificationContext();
  const [selectedEntity, setSelectedEntity] = useState("");
  const [userEntityIds, setUserEntityIds] = useState([]);
  const [entityOptions, setEntityOptions] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Get Entity Options
  const getAllEntitiesList = async () => {
    try {
      const data = await getAllEntityList({
        limit: 5000,
        page: "",
        filter: {
          name: "",
        },
      });

      if (data.success) {
        setEntityOptions(
          data?.data.map((data) => ({
            value: data?.id,
            label: data?.display_name,
          }))
        );
      } else {
        setEntityOptions(null);
      }
    } catch (error) {
      setEntityOptions(null);
    }
  };

  // Get User Details
  const getUserData = async (id) => {
    try {
      const data = await getEmployeeDetails(id);

      if (data.data.success) {
        setUserData(data?.data?.data[0]);

        // Extract user's entity IDs
        const primaryEntityId = data?.data?.data[0]?.primary_entity_id;
        const registeredEntities =
          data?.data?.data[0]?.registered_entities_details || [];
        const registeredEntityIds = registeredEntities.map(
          (entity) => entity.id
        );
        // Combine all entity IDs user has access to
        const allEntityIds = [primaryEntityId, ...registeredEntityIds];
        setUserEntityIds(allEntityIds);
      } else {
        setUserData(null);
      }
    } catch (error) {
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setDisplayModule(activeModule);
  }, [activeModule]);

  // Fetching user data
  useEffect(() => {
    if (userDetails) getUserData(userDetails?.id);
  }, [userDetails]);

  // Handling Logout
  const handleLogout = () => {
    dispatch(logout());
    navigate(`/procurement/sign-in`);
  };

  // Fetching all available entities on page load
  useEffect(() => {
    getAllEntitiesList();
  }, []);

  //
  useEffect(() => {
    if (userData && entityOptions) {
      const findPrimaryEntity = entityOptions?.find(
        (option) => option?.value === userData?.primary_entity_id
      );

      if (findPrimaryEntity) {
        setSelectedEntity(findPrimaryEntity);
      }
    }
  }, [userData, entityOptions]);

  const styledComponent = {
    control: (base) => ({
      ...base,
      minHeight: "32px",
      height: "32px",
      borderRadius: "0.375rem",
      borderColor: "#d1d5db", // gray-300
      fontSize: "0.875rem", // text-sm
      paddingLeft: "0.5rem", // px-2
      paddingRight: "0.5rem", // px-2
      borderTop: "0px",
      borderLeft: "0px",
      borderRight: "0px",
      "&:hover": {
        borderColor: "#d1d5db", // gray-300
      },
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: "4px",
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: "4px",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0px",
    }),
    input: (base) => ({
      ...base,
      margin: "0px",
      paddingBottom: "0px",
      paddingTop: "0px",
    }),
    option: (base) => ({
      ...base,
      fontSize: "0.875rem", // text-sm
    }),
  };

  useEffect(() => {
    if (selectedEntity) {
      dispatch(setActiveEntity({ activeEntity: selectedEntity?.value }));
    }
  }, [selectedEntity]);

  // Filter entities to only show the ones the user has access to
  const filteredEntityOptions = entityOptions
    ? entityOptions.filter((option) => userEntityIds.includes(option.value))
    : [];

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

      <div className="me-5 relative p-2 flex items-center gap-10">
        {/* Select Entity Dropdown */}
        <div className="flex flex-col gap-3 w-[200px]">
          <label htmlFor="date_format" className="text-sm hidden">
            Select Entity
          </label>
          <Select
            value={selectedEntity}
            onChange={(selectedOption) => {
              setSelectedEntity(selectedOption);
            }}
            options={filteredEntityOptions}
            placeholder="Select Entity..."
            isSearchable
            className="react-select-container"
            classNamePrefix="react-select"
            styles={styledComponent}
          />
        </div>

        {/* Notification Bell Icon */}
        <FaBell
          className="w-[20px] h-[20px] cursor-pointer"
          onClick={() => handleNotificationVisibility("open")}
        />

        {/* Profile Setting Dropdown */}
        <div className="w-[10px] h-[10px] rounded-[50%] bg-red-600 absolute top-[-2px] right-[-2px] p-2 text-xs text-white flex items-center justify-center">
          {newNotificationsCount}
        </div>
      </div>

      {/* Notification Container */}
      <NotificationContainer
        onClose={() => handleNotificationVisibility("close")}
      />
    </Navbar>
  );
};
