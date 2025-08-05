import { useEffect, useState } from "react";
import { AddButton } from "../../components/UI/addButtonUi";
import {
  deleteDesignation,
  getAllDesignations,
  getDesignationById,
  updateDesignationStatus,
} from "../../services/master_services/service";
import { toast } from "react-toastify";
import { DesignationMasterForm } from "../../components/masters/designationMasters/designationMasterForm";
import { DesignationMasterListing } from "../../components/masters/designationMasters/designationMasterListing";

export const DesignationMasterPage = () => {
  const [listing, setListing] = useState(null);
  const [formVisibility, setFormVisibility] = useState(false);
  const [formType, setFormType] = useState("Add");
  const [data, setData] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filter, setFilter] = useState(null);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);

  // Get All Master Data
  const getAllData = async () => {
    const data = await getAllDesignations({ limit, page, filter });

    if (data.success) {
      setListing(data.data);
      setTotalPages(data.pagination.totalPages);
    } else {
      setListing([]);
    }
  };

  // Get Data By Id
  const getDataById = async () => {
    const response = await getDesignationById(updateId);
    if (response.success) {
      setData(response.data);
    }
  };

  // Delete Data By Id
  const deleteData = async () => {
    const response = await deleteDesignation(deleteId);
    if (response.success) {
      toast(response.message);
      getAllData();
      setDeleteId(null);
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
        setData(null);
      } else if (formType === "update") {
        setFormType("Update");
      }
      setFormVisibility(true);
    } else if (visibility === "close") {
      setFormVisibility(false);
      setUpdateId(null);
      setData(null);
    }
  };

  // Handle Active/Inactive
  const handleActiveInactive = async (id) => {
    try {
      const response = await updateDesignationStatus(id);

      if (response.success) {
        getAllData();
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

  // Handle Filter Value
  const handleChangeFilter = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  // For initial load and filter/pagination changes
  useEffect(() => {
    getAllData();
  }, [limit, page, filter]);

  // For update operations
  useEffect(() => {
    if (updateId) {
      getDataById();
    }
  }, [updateId]);

  // For delete operations
  useEffect(() => {
    if (deleteId) {
      deleteData();
    }
  }, [deleteId]);

  return (
    <>
      <div className="px-5 h-full">
        <div className="flex justify-between items-center pt-3 pb-10">
          <div className="flex items-center gap-5">
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
            <div>
              <input
                type="search"
                placeholder="Search here.."
                className="py-1 px-2 rounded-md text-sm border-borders-light"
                onChange={(e) => handleChangeFilter(e)}
              />
            </div>
          </div>

          <div onClick={() => handleFormVisibility("open", "add")}>
            <AddButton text="Create Designation" />
          </div>
        </div>

        {/* Role Listing */}
        <DesignationMasterForm
          formVisibility={formVisibility}
          onClose={() => handleFormVisibility("close", "add")}
          getAllData={getAllData}
          formType={formType}
          updateId={updateId}
          data={data}
        />
        <DesignationMasterListing
          listing={listing}
          handleFormVisibility={handleFormVisibility}
          handleActiveInactive={handleActiveInactive}
          setUpdateId={setUpdateId}
          setDeleteId={setDeleteId}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </>
  );
};
