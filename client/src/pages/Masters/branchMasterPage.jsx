import { useEffect, useState } from "react";
import { AddButton } from "../../components/UI/addButtonUi";
import {
  deleteBranch,
  getAllBranches,
  getAllCountries,
  getAllStates,
  getBranchById,
  updateBranchStatus,
} from "../../services/master_services/service";
import { toast } from "react-toastify";
import { BranchMasterForm } from "../../components/masters/branchMasters/branchMasterForm";
import { BranchMasterListing } from "../../components/masters/branchMasters/branchMasterListing";

export const BranchMasterPage = () => {
  const [listing, setListing] = useState(null);
  const [formVisibility, setFormVisibility] = useState(false);
  const [formType, setFormType] = useState("Add");
  const [data, setData] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filter, setFilter] = useState({
    name: "",
    billing_status: "",
    status: "",
  });
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [allCountriesList, setAllCountriesList] = useState(null);
  const [allStateList, setAllStateList] = useState(null);
  const [allCitiesList, setAllCitiesList] = useState(null);

  // Get All Master Data
  const getAllData = async () => {
    try {
      setIsLoading(true);
      const data = await getAllBranches({ limit, page, filter });

      if (data.success) {
        setListing(data.data);
        setTotalPages(data.pagination.totalPages);
      } else {
        setListing(null);
        setTotalPages(null);
      }
    } catch (error) {
      setListing(null);
      setTotalPages(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Get Data By Id
  const getDataById = async () => {
    const response = await getBranchById(updateId);
    if (response.success) {
      setData(response.data);
    }
  };

  // Delete Data By Id
  const deleteData = async () => {
    const response = await deleteBranch(deleteId);
    if (response.success) {
      toast(response.message);
      getAllData();
      setDeleteId(null);
    } else {
      toast.error(response.message);
    }
  };

  // Get All Countries List
  const getAllCountriesList = async () => {
    try {
      const response = await getAllCountries({
        limit: 500,
        page: 1,
        filter: { name: "" },
      });
      if (response.success) {
        setAllCountriesList(response.data);
      } else {
        setAllCountriesList((prev) => null);
      }
    } catch (error) {
      setAllCountriesList((prev) => null);
    }
  };

  // Get All State List
  const getAllStatesList = async () => {
    try {
      const response = await getAllStates({
        limit: 50000,
        page: 1,
        filter: { country_id: "", name: "" },
      });
      if (response.success) {
        setAllStateList(response.data);
      } else {
        setAllStateList((prev) => null);
      }
    } catch (error) {
      setAllStateList((prev) => null);
    }
  };

  // Get All Cities List
  const getAllCitiesList = async () => {
    try {
      const response = await getAllStates({
        limit: 50000,
        page: 1,
        filter: { state_id: "", country_id: "", name: "" },
      });
      if (response.success) {
        setAllCitiesList(response.data);
      } else {
        setAllCitiesList((prev) => (prev = null));
      }
    } catch (error) {
      setAllCitiesList((prev) => (prev = null));
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
      const response = await updateBranchStatus(id);

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
            <AddButton text="Create Branch" />
          </div>
        </div>

        {/* Role Listing */}
        <BranchMasterForm
          formVisibility={formVisibility}
          onClose={() => handleFormVisibility("close", "add")}
          getAllData={getAllData}
          formType={formType}
          updateId={updateId}
          data={data}
          setUpdateId={setUpdateId}
        />
        <BranchMasterListing
          isLoading={isLoading}
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
