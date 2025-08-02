export const Sorting = () => {
  return (
    <>
      {/* Sorting Element Start */}
      <div className="flex justify-center items-center gap-2">
        <label htmlFor="limit" className="text-sm">
          Limit
        </label>
        <select
          id="limit"
          className="rounded-md py-1 text-sm border-borders-light"
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
    </>
  );
};
