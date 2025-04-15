import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Folder from "../components/Folder";

export default function FoldersPage() {
  const [folders, setFolders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await fetch("http://localhost:3000/folders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (res.status === 401) {
          navigate("/login");
          return;
        }

        const data = await res.json();
        setFolders(data.folders);
      } catch (err) {
        console.error("Error fetching folders:", err.message);
      }
    };
    fetchFolders();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-gray-800 px-6 pt-5">Folders</h1>

      <div className="grid grid-cols-2 justify-between w-full gap-10 px-6 pt-10 pb-30 min-h-200">
        {folders &&
          folders.map((folder) => <Folder key={folder.id} folder={folder} />)}
      </div>
    </div>
  );
}
