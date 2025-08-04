export const AddButton = ({ text }) => {
  return (
    <>
      <button className="py-2 px-4 bg-button-color rounded-md text-white text-sm hover:bg-button-hover transition-all duration=[.3s]">
        {text}
      </button>
    </>
  );
};
