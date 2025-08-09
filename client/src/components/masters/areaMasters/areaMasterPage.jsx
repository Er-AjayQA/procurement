import { AddButton } from "../../UI/addButtonUi";
import { AreaMasterListing } from "./areaMasterListing";
import { AreaMasterForm } from "./areaMasterForm";
import { useAreaMasterContext } from "../../../contextApis/useMastersContextFile";
import Select from "react-select";
import { useEffect, useState } from "react";
import { getAllDepartments } from "../../../services/master_services/service";

export const AreaMasterPage = () => {
  const {
    filter,
    handleFormVisibility,
    handleLimitChange,
    handleChangeFilter,
    styledComponent,
  } = useAreaMasterContext();

  const [departmentOptions, setDepartmentOptions] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // Get All Department List
  const getAllDepartmentList = async () => {
    try {
      const response = await getAllDepartments({ limit: 500, page: 1 });

      if (response.success) {
        setDepartmentOptions(
          response.data.map((code) => ({
            value: `${code.id}`,
            label: `${code.name}`,
          }))
        );
      } else {
        setDepartmentOptions(null);
      }
    } catch (error) {
      setDepartmentOptions(null);
    }
  };

  useEffect(() => {
    getAllDepartmentList();
  }, []);

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
            <div className="flex items-center gap-5">
              <input
                type="search"
                name="name"
                value={filter.name}
                placeholder="Search here.."
                className="py-1 px-2 rounded-md text-sm border-borders-light"
                onChange={(e) => handleChangeFilter("input", e)}
              />

              <Select
                value={selectedDepartment}
                onChange={(selectedOption) => {
                  setSelectedDepartment(selectedOption);
                  handleChangeFilter("dropdown", {
                    field: "dept_id",
                    value: selectedOption ? selectedOption.value : "",
                  });
                }}
                options={departmentOptions}
                placeholder="Search by department..."
                isClearable
                isSearchable
                className="react-select-container"
                classNamePrefix="react-select"
                styles={styledComponent}
              />
            </div>
          </div>

          <div onClick={() => handleFormVisibility("open", "add")}>
            <AddButton text="Create Area" />
          </div>
        </div>

        {/* Area Listing */}
        <AreaMasterListing />

        {/* Area Form */}
        <AreaMasterForm onClose={() => handleFormVisibility("close", "add")} />
      </div>
    </>
  );
};
