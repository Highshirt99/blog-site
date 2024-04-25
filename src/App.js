import { Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/home/Homepage";
import ArticleDetailPage from "./pages/articleDetail/ArticleDetailPage";
import RegisterPage from "./pages/register/RegisterPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="font-bodyFont">
      <Routes>
        <Route index path="/" element={<Homepage />} />
        <Route path="/blog/:id" element={<ArticleDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
