import { AddButton } from "../../UI/addButtonUi";
import { AreaMasterListing } from "./areaMasterListing";
import { AreaMasterForm } from "./areaMasterForm";
import { useMasterContext } from "../../../contextApis/useMastersContextFile";

export const AreaMasterPage = () => {
  const {
    listing,
    formVisibility,
    formType,
    data,
    updateId,
    filter,
    limit,
    totalPages,
    page,
    isLoading,
    getAllData,
    getDataById,
    handleFormVisibility,
    handleActiveInactive,
    handleLimitChange,
    handleChangeFilter,
    setUpdateId,
    setDeleteId,
    setPage,
  } = useMasterContext();

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
            <AddButton text="Create Area" />
          </div>
        </div>

        {/* Area Listing */}
        <AreaMasterListing
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

        {/* Area Form */}
        <AreaMasterForm
          formVisibility={formVisibility}
          onClose={() => handleFormVisibility("close", "add")}
          getAllData={getAllData}
          formType={formType}
          updateId={updateId}
          data={data}
        />
      </div>
    </>
  );
};
