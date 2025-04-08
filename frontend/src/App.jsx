import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import FoldersPage from "./pages/FoldersPage";
import FolderDetailPage from "./pages/FolderDetailPage";
import Footer from "./components/Footer";

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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
