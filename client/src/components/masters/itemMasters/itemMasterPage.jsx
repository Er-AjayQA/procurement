import { AddButton } from "../../UI/addButtonUi";
import { ItemMasterListing } from "./itemMasterListing";
import { ItemMasterForm } from "./itemMasterForm";
import { useItemMasterContext } from "../../../contextApis/useMastersContextFile";
import Select from "react-select";
import { useEffect, useState } from "react";
import {
  getAllDepartments,
  getAllItemCategory,
} from "../../../services/master_services/service";
import { ItemMasterView } from "./itemMasterView";
import { toast } from "react-toastify";

export const ItemMasterPage = () => {
  const {
    filter,
    handleFormVisibility,
    handleLimitChange,
    handleChangeFilter,
    styledComponent,
    handleViewVisibility,
  } = useItemMasterContext();

  const [categoryOptions, setCategoryOptions] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Get All Item Category List
  const getAllCategoryList = async () => {
    try {
      const response = await getAllItemCategory({
        limit: 5000,
        page: 1,
        filter: { name: "" },
      });

      if (response.success) {
        setCategoryOptions(
          response.data.map((data) => ({
            value: data.id,
            label: data.name,
          }))
        );
      }
    } catch (error) {
      toast.error("Failed to load item categories");
    }
  };
  useEffect(() => {
    getAllCategoryList();
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
                value={selectedCategory}
                onChange={(selectedOption) => {
                  setSelectedCategory(selectedOption);
                  handleChangeFilter("dropdown", {
                    field: "item_category_id",
                    value: selectedOption ? selectedOption.value : "",
                  });
                }}
                options={categoryOptions}
                placeholder="Search by category..."
                isClearable
                isSearchable
                className="react-select-container"
                classNamePrefix="react-select"
                styles={styledComponent}
              />
            </div>
          </div>

          <div onClick={() => handleFormVisibility("open", "add")}>
            <AddButton text="Create Item" />
          </div>
        </div>

        {/* Item Listing */}
        <ItemMasterListing />

        {/* Item View */}
        <ItemMasterView onClose={() => handleViewVisibility("close")} />

        {/* Item Form */}
        <ItemMasterForm onClose={() => handleFormVisibility("close", "add")} />
      </div>
    </>
  );
};
