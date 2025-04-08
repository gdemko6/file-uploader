import { useState } from "react";
import { useEffect } from "react";
import Folder from "../components/Folder";

export default function FoldersPage() {
  const [folders, setFolders] = useState([]);

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

        const data = await res.json();
        setFolders(data.folders);
      } catch (err) {
        console.error("Error fetching folders:", err.message);
      }
    };
    fetchFolders();
  }, []);

  return (
    <div className="grid grid-cols-2 justify-between w-full gap-10 min-h-200 px-6 pt-15 pb-30">
      {folders &&
        folders.map((folder) => <Folder key={folder.id} folder={folder} />)}
    </div>
  );
}
