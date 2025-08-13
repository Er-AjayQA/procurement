import { MdDelete } from "react-icons/md";

export const ContentItem = ({ content, index, onChange, onRemove }) => {
  return (
    <>
      <div className="flex w-full border-b border-b-gray-300">
        <div className="basis-[40%] p-3 border-e border-e-gray-300">
          <select
            name="content_type"
            value={content.content_type}
            onChange={(e) => onChange(index, "content_type", e.target.value)}
            className="w-full rounded-lg text-sm hover:border-blue-500 py-2 px-3 border"
            required
          >
            <option value="">Select type</option>
            <option value="PDF">PDF</option>
            <option value="Image">Image</option>
            <option value="Video">Video</option>
            <option value="Word Document">Word Document</option>
            <option value="Excel Sheet">Excel Sheet</option>
            <option value="Audio">Audio</option>
          </select>
        </div>
        <div className="basis-[40%] p-3 border-e border-e-gray-300">
          <input
            type="text"
            value={content.content_name}
            onChange={(e) => onChange(index, "content_name", e.target.value)}
            placeholder="File name"
            className="w-full rounded-lg text-sm hover:border-blue-500 py-2 px-3 border"
            required
          />
        </div>
        <div className="basis-[40%] p-3 border-e border-e-gray-300">
          <input
            type="text"
            value={content.content_link}
            onChange={(e) => onChange(index, "content_link", e.target.value)}
            placeholder="Enter link..."
            className="w-full rounded-lg text-sm hover:border-blue-500 py-2 px-3 border"
          />
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
