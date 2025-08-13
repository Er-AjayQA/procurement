export const CancelButton = ({ text }) => {
  return (
    <>
      <button className="py-2 px-4 bg-red-600 rounded-md text-white text-sm hover:bg-red-700 transition-all duration=[.3s]">
        {text}
      </button>
    </>
  );
};
