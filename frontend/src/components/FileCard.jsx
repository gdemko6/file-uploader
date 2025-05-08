import React from "react";

export default function FileCard({ file, folderId, onDelete }) {
  return (
    <li className="flex justify-between items-center border border-blue-200 py-1 px-1.5 rounded shadow-sm bg-white">
      <span className="text-gray-800 font-bold italic mr-5 pl-1">
        {file.filename}
      </span>
      <div className="space-x-4">
        {/* Download file */}
        <a
          href={`http://localhost:3000/folders/${folderId}/${file.id}/download`}
          className="text-blue-500 hover:underline"
        >
          Download
        </a>

        {/* Delete function is made and passed as a prop from FolderDetailPage */}
        <button
          onClick={() => onDelete(file.id)}
          className="text-red-500 cursor-pointer hover:underline"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
