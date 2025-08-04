import { useEffect, useState } from "react";
import { RoleMasterForm } from "../../components/rbac/roleMaster/roleMasterForm";
import { RoleMasterListing } from "../../components/rbac/roleMaster/roleMasterListing";
import { AddButton } from "../../components/UI/addButtonUi";
import {
  deleteRole,
  getAllRoles,
  getRoleById,
  updateRoleStatus,
} from "../../services/master_services/service";
import { toast } from "react-toastify";

export const RoleMasterPage = () => {
  const [rolesList, setRolesList] = useState(null);
  const [formVisibility, setFormVisibility] = useState(false);
  const [formType, setFormType] = useState("Add");
  const [roleData, setRoleData] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filter, setFilter] = useState(null);
  const [limit, setLimit] = useState(10);

  // Get Master Roles List From API
  const getAllRoleMasters = async () => {
    const data = await getAllRoles();

    if (data.success) {
      setRolesList(data.data);
    } else {
      setRolesList([]);
    }
  };

  // Get Role Data By Id
  const getRoleDataById = async () => {
    const response = await getRoleById(updateId);
    if (response.success) {
      setRoleData(response.data);
    }
  };

  // Delete Role By Id
  const deleteRoleMaster = async () => {
    const response = await deleteRole(deleteId);
    if (response.success) {
      toast(response.message);
      getAllRoleMasters();
    } else {
      toast.error(response.message);
    }
  };

  // Handle Form Visibility
  const handleFormVisibility = (visibility, formType) => {
    if (visibility === "open") {
      if (formType === "add") {
        setFormType("Add");
        setUpdateId(null);
        setRoleData(null);
      } else if (formType === "update") {
        setFormType("Update");
      }
      setFormVisibility(true);
    } else if (visibility === "close") {
      setFormVisibility(false);
      setUpdateId(null);
      setRoleData(null);
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
        toast.error(response.message);
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Handle Set Limit
  const handleLimitChange = (e) => {
    e.preventDefault();
    setLimit(e.target.value);
  };

  useEffect(() => {
    getAllRoleMasters();

    if (updateId) {
      getRoleDataById();
    }

    if (deleteId) {
      deleteRoleMaster();
    }
  }, [updateId, deleteId]);

  console.log(limit);

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
              onChange={(e) => handleLimitChange(e)}
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
          <div onClick={() => handleFormVisibility("open", "add")}>
            <AddButton text="Create New Role" />
          </div>
        </div>

        {/* Role Listing */}
        <RoleMasterForm
          formVisibility={formVisibility}
          onClose={() => handleFormVisibility("close", "add")}
          getAllRoleMasters={getAllRoleMasters}
          formType={formType}
          updateId={updateId}
          roleData={roleData}
        />
        <RoleMasterListing
          rolesList={rolesList}
          handleFormVisibility={handleFormVisibility}
          handleRoleActiveInactive={handleRoleActiveInactive}
          setUpdateId={setUpdateId}
          setDeleteId={setDeleteId}
        />
      </div>
    </>
  );
};
