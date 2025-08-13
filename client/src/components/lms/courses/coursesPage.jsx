import { AddButton } from "../../UI/addButtonUi";
import { CoursesListing } from "./coursesListing";
import { CoursesForm } from "./coursesForm";
import { useCoursesMasterContext } from "../../../contextApis/useLmsContextFile";
import { CoursesView } from "./coursesView";

export const CoursesPageComponent = () => {
  const {
    filter,
    handleLimitChange,
    handleChangeFilter,
    componentType,
    setViewId,
    setUpdateId,
    handleComponentView,
  } = useCoursesMasterContext();

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
            </div>
          </div>
          {componentType === "listing" ? (
            <div onClick={() => handleComponentView("form")}>
              <AddButton text="Create Course" />
            </div>
          ) : (
            <div
              onClick={() => {
                handleComponentView("listing");
                setViewId(null);
                setUpdateId(null);
              }}
            >
              <AddButton text="Back" />
            </div>
          )}
        </div>

        {componentType === "listing" && <CoursesListing />}

        {componentType === "form" && (
          <CoursesForm onClose={() => handleComponentView("listing")} />
        )}

        {componentType === "view" && <CoursesView />}
      </div>
    </>
  );
};
