import React from "react";

export default function FileCard({ file, folderId, onDelete }) {
  return (
    <li className="flex justify-between items-center border border-blue-600 p-4 rounded shadow-sm bg-white">
      <span className="text-gray-800 font-bold mr-5">{file.filename}</span>
      <div className="space-x-4">
        <a
          href={`http://localhost:3000/folders/${folderId}/${file.id}/download`}
          className="text-blue-500 hover:underline"
        >
          Download
        </a>
        <button
          onClick={() => onDelete(file.id)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
