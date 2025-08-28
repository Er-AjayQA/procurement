import { AddButton } from "../../UI/addButtonUi";
import Select from "react-select";
import { useEmployeeIdCardContext } from "../../../contextApis/useHrmsContextFile";
import { EmployeeIdCardListing } from "./idCardListing";
import { EmployeeIdCardView } from "./idCardView";

export const EmployeeIdCardPage = () => {
  const {
    filter,
    viewVisibility,
    handleLimitChange,
    handleChangeFilter,
    styledComponent,
    handleViewVisibility,
  } = useEmployeeIdCardContext();

  return (
    <>
      <div className="px-5 h-full">
        {viewVisibility ? (
          <EmployeeIdCardView onClose={() => handleViewVisibility("close")} />
        ) : (
          <>
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
                    placeholder="Search employee.."
                    className="py-1 px-2 rounded-md text-sm border-borders-light"
                    onChange={(e) => handleChangeFilter("input", e)}
                  />
                </div>
              </div>
            </div>
            <EmployeeIdCardListing />
          </>
        )}
      </div>
    </>
  );
};
