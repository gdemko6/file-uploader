import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import FoldersPage from "./pages/FoldersPage";
import FolderDetailPage from "./pages/FolderDetailPage";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen items">
        <Navbar />
        <main className="flex flex-grow justify-center">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/folders" element={<FoldersPage />} />
            <Route path="/folders/:folderId" element={<FolderDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
