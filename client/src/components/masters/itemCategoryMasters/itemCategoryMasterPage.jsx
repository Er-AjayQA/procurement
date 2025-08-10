import { AddButton } from "../../UI/addButtonUi";
import { useItemCategoryMasterContext } from "../../../contextApis/useMastersContextFile";
import { ItemCategoryMasterView } from "./itemCategoryMasterView";
import { ItemCategoryMasterListing } from "./itemCategoryMasterListing";
import { ItemCategoryMasterForm } from "./itemCategoryMasterForm";

export const ItemCategoryMasterPage = () => {
  const {
    filter,
    handleFormVisibility,
    handleViewVisibility,
    handleLimitChange,
    handleChangeFilter,
  } = useItemCategoryMasterContext();

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
            <AddButton text="Create Item Category" />
          </div>
        </div>

        {/* Item Category Listing */}
        <ItemCategoryMasterListing />

        {/* Item Category ListViewing */}
        <ItemCategoryMasterView onClose={() => handleViewVisibility("close")} />

        {/* Item Category Form */}
        <ItemCategoryMasterForm
          onClose={() => handleFormVisibility("close", "add")}
        />
      </div>
    </>
  );
};
