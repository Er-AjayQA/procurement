import { useEffect, useState } from "react";
import { RoleMasterForm } from "../../components/rbac/roleMaster/roleMasterForm";
import { RoleMasterListing } from "../../components/rbac/roleMaster/roleMasterListing";
import { AddButton } from "../../components/UI/addButtonUi";
import {
  createRole,
  getAllRoles,
  updateRoleStatus,
} from "../../services/master_services/service";
import { toast } from "react-toastify";

export const RoleMasterPage = () => {
  const [rolesList, setRolesList] = useState(null);
  const [formVisibility, setFormVisibility] = useState(false);
  const [formType, setFormType] = useState("Add");

  // Get Master Roles List From API
  const getAllRoleMasters = async () => {
    const data = await getAllRoles();

    if (data.success) {
      setRolesList(data.data);
    } else {
      setRolesList([]);
    }
  };

  // Handle Form Visibility
  const handleFormVisibility = (visibility, formType) => {
    if (visibility === "open") {
      if (formType === "add") {
        setFormType("Add");
      } else if (formType === "update") {
        setFormType("Update");
      }
      setFormVisibility(true);
    } else if (visibility === "close") {
      setFormVisibility(false);
    }
  };

  // Handle Role Active/Inactive
  const handleRoleActiveInactive = async (id) => {
    try {
      const response = await updateRoleStatus(id);

      if (response.success) {
        getAllRoleMasters();
        toast.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getAllRoleMasters();
  }, []);

  console.log(formType);

  return (
    <>
      <div className="px-5 h-full">
        <div className="flex justify-between items-center pt-3 pb-10">
          {/* Sorting Element Start */}
          <div className="flex justify-center items-center gap-2">
            <label htmlFor="limit" className="text-sm">
              Limit
            </label>
            <select
              id="limit"
              className="rounded-md py-1 text-sm border-borders-light"
            >
              <option value={10} className="text-sm">
                10
              </option>
              <option value={50} className="text-sm">
                50
              </option>
              <option value={100} className="text-sm">
                100
              </option>
              <option value={500} className="text-sm">
                500
              </option>
            </select>
          </div>
          {/* Sorting Element End */}
          <div onClick={() => handleFormVisibility("open", "create")}>
            <AddButton text="Create New Role" />
          </div>
        </div>

        {/* Role Listing */}
        <RoleMasterForm
          formVisibility={formVisibility}
          onClose={() => handleFormVisibility("close")}
          getAllRoleMasters={getAllRoleMasters}
          formTyp={formType}
        />
        <RoleMasterListing
          rolesList={rolesList}
          handleFormVisibility={handleFormVisibility}
          handleRoleActiveInactive={handleRoleActiveInactive}
        />
      </div>
    </>
  );
};
