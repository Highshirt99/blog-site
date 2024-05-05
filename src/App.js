import { Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/home/Homepage";
import ArticleDetailPage from "./pages/articleDetail/ArticleDetailPage";
import RegisterPage from "./pages/register/RegisterPage";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";

function App() {
  return (
    <div className="font-bodyFont">
      <Routes>
        <Route index path="/" element={<Homepage />} />
        <Route path="/blog/:slug" element={<ArticleDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
