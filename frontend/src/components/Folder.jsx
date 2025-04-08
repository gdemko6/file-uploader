import { FaFolder } from "react-icons/fa";

export default function Folder({ folder }) {
  return (
    <div className="rounded-md border border-gray-200 border-solid-3 shadow-sm flex flex-col pl-4 justify-center hover:shadow-md transition transform hover:scale-105 hover:cursor-pointer">
      <div className="flex items-center gap-4 text-blue-500 text-2xl">
        <FaFolder />
        <span className="text-gray-800 text-lg font-medium">{folder.name}</span>
      </div>
    </div>
  );
}
