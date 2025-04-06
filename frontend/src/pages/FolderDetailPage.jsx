import { useParams } from "react-router-dom";

export default function FolderDetailPage() {
  const { folderId } = useParams();

  return (
    <div className="p-6 text-xl">
      Folder ID: <strong>{folderId}</strong>
    </div>
  );
}
