import { AddButton } from "../../UI/addButtonUi";
import { TransferReasonMasterListing } from "./transferReasonMasterListing";
import { TransferReasonMasterForm } from "./transferReasonMasterForm";
import { useTransferReasoneMasterContext } from "../../../contextApis/useMastersContextFile";

export const TransferReasonMasterPage = () => {
  const {
    filter,
    handleFormVisibility,
    handleLimitChange,
    handleChangeFilter,
  } = useTransferReasoneMasterContext();

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
                name="transfer_type"
                value={filter.transfer_type}
                placeholder="Search here.."
                className="py-1 px-2 rounded-md text-sm border-borders-light"
                onChange={(e) => handleChangeFilter(e)}
              />
            </div>
          </div>

          <div onClick={() => handleFormVisibility("open", "add")}>
            <AddButton text="Create Transfer Reason" />
          </div>
        </div>

        {/* Transfer Type Listing */}
        <TransferReasonMasterListing />

        {/* Transfer Type Form */}
        <TransferReasonMasterForm
          onClose={() => handleFormVisibility("close", "add")}
        />
      </div>
    </>
  );
};
