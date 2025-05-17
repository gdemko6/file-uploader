import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import FoldersPage from "./pages/FoldersPage";
import FolderDetailPage from "./pages/FolderDetailPage";
import FilesPage from "./pages/FilesPage";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/me", {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data?.user || null));
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen items">
        <Navbar />
        <main className="flex flex-grow justify-center">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/folders" element={<FoldersPage />} />
            <Route path="/folders/:folderId" element={<FolderDetailPage />} />
            <Route path="/files" element={<FilesPage />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </main>
        <Footer user={user} />
      </div>
    </Router>
  );
}

export default App;
