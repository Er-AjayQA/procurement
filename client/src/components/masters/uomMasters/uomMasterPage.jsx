import { AddButton } from "../../UI/addButtonUi";
import { UomMasterListing } from "./uomMasterListing";
import { UomMasterForm } from "./uomMasterForm";
import { useUomMasterContext } from "../../../contextApis/useMastersContextFile";
import { UomMasterView } from "./uomMasterView";

export const UomMasterPage = () => {
  const {
    filter,
    handleFormVisibility,
    handleViewVisibility,
    handleLimitChange,
    handleChangeFilter,
  } = useUomMasterContext();

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
                onChange={(e) => handleChangeFilter(e)}
              />
            </div>
          </div>

          <div onClick={() => handleFormVisibility("open", "add")}>
            <AddButton text="Create UOM" />
          </div>
        </div>

        {/* UOM Listing */}
        <UomMasterListing />

        {/* UOM ListViewing */}
        <UomMasterView onClose={() => handleViewVisibility("close")} />

        {/* UOM Form */}
        <UomMasterForm onClose={() => handleFormVisibility("close", "add")} />
      </div>
    </>
  );
};
