import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import Select from "react-select";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { SkeltonUi } from "../../UI/Skelton";
import { AddButton } from "../../UI/addButtonUi";
import { useState } from "react";
import { ViewIcon } from "../../UI/viewIconUi";
import { EditIcon } from "../../UI/editIconUi";
import { DeleteIcon } from "../../UI/deleteIcon";

import { TicketHistoryPopup } from "./historyPopup";
import { TicketActionPopup } from "./actionPopup";
import { useCalendarContext } from "../../../contextApis/useEssContextFile";

export const CalendarListing = ({ componentType }) => {
  const {
    currentDate,
    totalDysInMonth,
    dateTab,
    firstDayOfMonth,
    filter,
    isLoading,
    listing,
    tabType,
    currentTab,
    page,
    totalPages,
    setPage,
    setViewId,
    setUpdateId,
    setDeleteId,
    daysOptions,
    styledComponent,
    handleChangeFilter,
    handleComponentView,
    handleTabClick,
    handleCurrentDate,
    tabList,
  } = useCalendarContext();

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center px-3">
          {/* Month Navigation */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCurrentDate("prev")}
                className="p-2 rounded hover:bg-gray-100"
              >
                <MdKeyboardArrowLeft size={20} />
              </button>
              <div className="font-bold">
                {currentDate.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <button
                onClick={() => handleCurrentDate("next")}
                className="p-2 rounded hover:bg-gray-100"
              >
                <MdKeyboardArrowRight size={20} />
              </button>
            </div>
          </div>
          {/* View Options */}
          <div>
            <ul className="flex gap-5">
              {tabList.map((tab) => (
                <li
                  key={tab.value}
                  className={`text-[.8rem] cursor-pointer font-bold p-2 rounded-t-md border border-transparent hover:text-white hover:border-gray-300 hover:bg-body-bg_color ${
                    currentTab === tab.value
                      ? "border-gray-300 bg-body-bg_color text-white"
                      : ""
                  }`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="days_container mb-2">
          {daysOptions?.map((day) => {
            return (
              <div
                key={day.value}
                className="text-center py-2 px-3 bg-blue-800 rounded-[10px]"
              >
                <p className="text-white text-sm">
                  {day?.label.substring(0, 3)}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="shadow-lg rounded-md border pb-2 border-gray-300 h-full flex flex-col overflow-auto scrollbar-hide">
        <div className="dates_containers">
          {dateTab.length > 0 ? dateTab : "No Records Found!"}
        </div>
      </div>
    </>
  );
};
