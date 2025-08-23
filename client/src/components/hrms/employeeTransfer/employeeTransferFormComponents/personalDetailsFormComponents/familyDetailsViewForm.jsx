import { Controller, useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import { useEffect, useState } from "react";
import { AddButton } from "../../../../UI/addButtonUi";
import { useEmployeeContext } from "../../../../../contextApis/useHrmsContextFile";

export const FamilyDetailsViewItem = ({ isView, onClose, viewData }) => {
  const { countryCodeOptions, setFamilyFormVisible, formSelectStyles } =
    useEmployeeContext();

  return (
    <>
      <div
        className={`fixed inset-0 z-20 transition-opacity bg-[#0202025b] ${
          isView ? "block pointer-events-none" : "hidden"
        }`}
        onClick={onClose}
      ></div>
      <div
        className={`fixed right-0 top-0 w-full max-w-md h-full bg-white z-30 shadow-xl transition-transform duration-300 rounded-t-md  ${
          isView ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="haze_purple py-2 ps-3 pe-1 rounded-t-md flex justify-between items-center relative z-30">
          <h3 className="text-white text-sm font-bold">Family Member Detail</h3>
          <div
            onClick={onClose}
            className="hover:bg-red-500 p-2 rounded-lg hover:fill-white"
          >
            <MdOutlineClose className="fill-white" />
          </div>
        </div>

        <div className="py-5 px-10 mx-auto flex flex-col gap-5">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-6">
              <label className="text-sm font-bold">Member Name:</label>
            </div>
            <div className="col-span-6">
              <label className="text-sm">
                {viewData?.member_name || "N/A"}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-6">
              <label className="text-sm font-bold">Relation Type:</label>
            </div>
            <div className="col-span-6">
              <label className="text-sm">
                {viewData?.relation_type || "N/A"}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-6">
              <label className="text-sm font-bold">D.O.B:</label>
            </div>
            <div className="col-span-6">
              <label className="text-sm">{viewData?.dob || "N/A"}</label>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-6">
              <label className="text-sm font-bold">Contact No.:</label>
            </div>
            <div className="col-span-6">
              <label className="text-sm">
                {viewData?.contact_number || "N/A"}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-6">
              <label className="text-sm font-bold">Remark:</label>
            </div>
            <div className="col-span-6">
              <label className="text-sm">{viewData?.remark || "N/A"}</label>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-6">
              <label className="text-sm font-bold">
                Is Emergency Contact?:
              </label>
            </div>
            <div className="col-span-6">
              <label className="text-sm">
                {viewData?.selected_as_emergency ? (
                  <span className="text-green-500">Yes</span>
                ) : (
                  <span className="text-red-500">No</span>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
