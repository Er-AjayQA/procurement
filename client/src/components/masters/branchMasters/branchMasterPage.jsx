import { AddButton } from "../../UI/addButtonUi";
import Select from "react-select";
import { BranchMasterForm } from "./branchMasterForm";
import { BranchMasterListing } from "./branchMasterListing";
import { BranchMasterView } from "./branchMasterView";
import { useBranchMasterContext } from "../../../contextApis/useMastersContextFile";

export const BranchMasterPage = () => {
  const {
    handleLimitChange,
    filter,
    handleChangeFilter,
    selectedBillingStatusFilter,
    setSelectedBillingStatusFIlter,
    styledDropdown,
    selectedStatusFilter,
    setSelectedStatusFIlter,
    handleFormVisibility,
    handleViewVisibility,
  } = useBranchMasterContext();
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
        <BranchMasterListing />

        {/* Branch Form */}
        <BranchMasterForm
          onClose={() => handleFormVisibility("close", "add")}
        />

        {/* Branch View */}
        <BranchMasterView onClose={() => handleViewVisibility("close")} />
      </div>
    </>
  );
};
