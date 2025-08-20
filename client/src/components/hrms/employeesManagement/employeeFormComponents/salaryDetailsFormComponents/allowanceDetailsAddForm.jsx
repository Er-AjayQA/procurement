import { useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { useEmployeeContext } from "../../../../../contextApis/useHrmsContextFile";

export const AllowanceDetailsAddItem = ({
  key,
  allowance,
  index,
  onChange,
  onRemove,
  allowanceDetails,
}) => {
  const { allowancesOptions, formSelectStyles } = useEmployeeContext();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // Helper function to find selected option
  const findSelectedOption = (options, value) => {
    if (!options || value === undefined || value === null) return null;
    return options.find((opt) => opt.value === value);
  };

  return (
    <>
      <div
        className="grid grid-cols-12 w-full border-b border-b-gray-300 gap-3"
        key={key}
      >
        <div className="col-span-3 px-3 py-3 text-xs flex items-center justify-center">
          {index + 1}.
        </div>
        <div className="col-span-3 space-y-2 px-3 py-3">
          <select
            name="allowance_id"
            value={allowance.allowance_id}
            onChange={(e) => onChange(index, "allowance_id", e.target.value)}
            className="w-full rounded-lg text-xs hover:border-blue-500 py-2 px-3 border border-gray-300"
            required
          >
            <option value="">Select type</option>
            {allowancesOptions?.map((item) => {
              const checkAlreadySelected = allowanceDetails.find(
                (data) => data.allowance_id === item.value
              );
              return (
                <option value={item.value} disabled={checkAlreadySelected}>
                  {item.label}
                </option>
              );
            })}
          </select>
        </div>

        <div className="col-span-4 flex flex-col gap-3 px-3 py-3">
          <div className="flex flex-col gap-2">
            <input
              type="number"
              id="amount"
              name="amount"
              value={allowance.amount}
              onChange={(e) => onChange(index, "amount", e.target.value)}
              required
              className={`w-full rounded-md border py-2 px-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-xs`}
              placeholder="Enter amount..."
            />
          </div>
        </div>

        <div className="flex justify-center items-center basis-[20%] p-3">
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-gray-500 hover:text-red-500 transition-colors"
          >
            <MdDelete className="text-xl" />
          </button>
        </div>
      </div>
    </>
  );
};
