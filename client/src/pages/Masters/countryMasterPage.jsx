import { useEffect, useState } from "react";
import { AddButton } from "../../components/UI/addButtonUi";
import {
  getAllCountries,
  getCountryById,
} from "../../services/master_services/service";
import { CountryMasterForm } from "../../components/masters/countryMasters/countryMasterForm";
import { CountryMasterListing } from "../../components/masters/countryMasters/countryMasterListing";
import { CountryMasterView } from "../../components/masters/countryMasters/countryMasterView";

export const CountryMasterPage = () => {
  const [listing, setListing] = useState(null);
  const [formVisibility, setFormVisibility] = useState(false);
  const [data, setData] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [filter, setFilter] = useState(null);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [viewVisibility, setViewVisibility] = useState(false);

  // Get All Master Data
  const getAllData = async () => {
    setIsLoading(true);
    const data = await getAllCountries({ limit, page, filter });

    if (data.success) {
      setIsLoading(false);
      setListing(data.data);
      setTotalPages(data.pagination.totalPages);
    } else {
      setIsLoading(false);
      setListing([]);
    }
  };

  // Get Data By Id
  const getDataById = async () => {
    const response = await getCountryById(viewId);
    if (response.success) {
      setData(response.data[0]);
    }
  };

  // Handle Form Visibility
  const handleFormVisibility = (visibility) => {
    if (visibility === "open") {
      setFormVisibility(true);
    } else if (visibility === "close") {
      setFormVisibility(false);
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

  // Handle View Form Visibility
  const handleViewVisibility = (type) => {
    if (type === "open") {
      setViewVisibility(true);
    } else if (type === "close") {
      setViewVisibility(false);
      setViewId(null);
      setData(null);
    }
  };

  // For initial load and filter/pagination changes
  useEffect(() => {
    getAllData();
  }, [limit, page, filter]);

  // For update operations
  useEffect(() => {
    if (viewId) {
      getDataById();
    }
  }, [viewId]);

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
            <AddButton text="Upload Countries" />
          </div>
        </div>

        {/* Countries Listing */}
        <CountryMasterForm
          formVisibility={formVisibility}
          onClose={() => handleFormVisibility("close", "add")}
          getAllData={getAllData}
          data={data}
        />
        <CountryMasterListing
          isLoading={isLoading}
          listing={listing}
          handleFormVisibility={handleFormVisibility}
          setViewId={setViewId}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          setViewVisibility={setViewVisibility}
        />

        <CountryMasterView
          viewVisibility={viewVisibility}
          onClose={() => handleViewVisibility("close")}
          data={data}
        />
      </div>
    </>
  );
};
