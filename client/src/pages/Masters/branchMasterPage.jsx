import { useEffect, useState } from "react";
import { AddButton } from "../../components/UI/addButtonUi";
import Select from "react-select";
import {
  deleteBranch,
  getAllBranches,
  getBranchById,
  updateBranchStatus,
} from "../../services/master_services/service";
import { toast } from "react-toastify";
import { BranchMasterForm } from "../../components/masters/branchMasters/branchMasterForm";
import { BranchMasterListing } from "../../components/masters/branchMasters/branchMasterListing";
import { BranchMasterView } from "../../components/masters/branchMasters/branchMasterView";

export const BranchMasterPage = () => {
  const [listing, setListing] = useState(null);
  const [formVisibility, setFormVisibility] = useState(false);
  const [viewVisibility, setViewVisibility] = useState(false);
  const [formType, setFormType] = useState("Add");
  const [data, setData] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [viewId, setViewId] = useState(null);
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
  const [selectedStatusFilter, setSelectedStatusFIlter] = useState(null);
  const [selectedBillingStatusFilter, setSelectedBillingStatusFIlter] =
    useState(null);

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
  const getDataById = async (id) => {
    const response = await getBranchById(id);
    if (response.success) {
      setData(response.data[0]);
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
  const handleChangeFilter = (type, e) => {
    if (type === "input") {
      const { name, value } = e.target;
      setFilter((prev) => ({ ...prev, [name]: value }));
    }

    if (type === "dropdown") {
      const { field, value } = e;
      setFilter((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Handle View Visibility
  const handleViewVisibility = (type) => {
    if (type === "open") {
      setViewVisibility(true);
    } else if (type === "close") {
      setViewVisibility(false);
      setViewId(null);
    }
  };

  // For initial load and filter/pagination changes
  useEffect(() => {
    getAllData();
  }, [limit, page, filter]);

  // For update operations
  useEffect(() => {
    if (viewId || updateId) {
      let id = viewId || updateId;
      getDataById(id);
    }
  }, [updateId, viewId]);

  // For delete operations
  useEffect(() => {
    if (deleteId) {
      deleteData();
    }
  }, [deleteId]);

  const styledDropdown = {
    control: (base) => ({
      ...base,
      minHeight: "32px",
      height: "32px",
      borderRadius: "0.375rem",
      borderColor: "#d1d5db", // gray-300
      fontSize: "0.875rem", // text-sm
      paddingLeft: "0.5rem", // px-2
      paddingRight: "0.5rem", // px-2
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

  console.log(data);

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
            <div className="flex gap-3 items-center">
              {/* Search Filter By Name */}
              <input
                type="search"
                name="name"
                value={filter.name}
                placeholder="Search here.."
                className="py-1 px-2 rounded-md text-sm border-borders-light"
                onChange={(e) => handleChangeFilter("input", e)}
              />

              {/* Search Filter By Billing Status */}
              <Select
                value={selectedBillingStatusFilter}
                onChange={(selectedOption) => {
                  setSelectedBillingStatusFIlter(selectedOption);
                  handleChangeFilter("dropdown", {
                    field: "billing_status",
                    value: selectedOption ? selectedOption.value : "",
                  });
                }}
                options={[
                  { value: 1, label: "Billing" },
                  { value: 0, label: "Non-Billing" },
                ]}
                placeholder="Search by billingStatus..."
                isClearable
                isSearchable={false}
                className="react-select-container"
                classNamePrefix="react-select"
                styles={styledDropdown}
              />
              {/* Search Filter By Status */}
              <Select
                value={selectedStatusFilter}
                onChange={(selectedOption) => {
                  setSelectedStatusFIlter(selectedOption);
                  handleChangeFilter("dropdown", {
                    field: "status",
                    value: selectedOption ? selectedOption.value : "",
                  });
                }}
                options={[
                  { value: 1, label: "Active" },
                  { value: 0, label: "In-Active" },
                ]}
                placeholder="Search by status..."
                isClearable
                isSearchable={false}
                className="react-select-container"
                classNamePrefix="react-select"
                styles={styledDropdown}
              />
            </div>
          </div>

          <div onClick={() => handleFormVisibility("open", "add")}>
            <AddButton text="Create Branch" />
          </div>
        </div>

        {/* Branch Listing */}
        <BranchMasterListing
          isLoading={isLoading}
          listing={listing}
          handleFormVisibility={handleFormVisibility}
          handleActiveInactive={handleActiveInactive}
          handleViewVisibility={handleViewVisibility}
          setUpdateId={setUpdateId}
          setDeleteId={setDeleteId}
          setViewId={setViewId}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />

        {/* Branch Form */}
        <BranchMasterForm
          formVisibility={formVisibility}
          onClose={() => handleFormVisibility("close", "add")}
          getAllData={getAllData}
          formType={formType}
          updateId={updateId}
          data={data}
          setUpdateId={setUpdateId}
        />

        {/* Branch View */}
        <BranchMasterView
          viewVisibility={viewVisibility}
          onClose={() => handleViewVisibility("close")}
          data={data}
        />
      </div>
    </>
  );
};
