import { Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/home/Homepage";
import ArticleDetailPage from "./pages/articleDetail/ArticleDetailPage";

function App() {
  return (
    <div className="font-bodyFont">
      <Routes>
        <Route index path="/" element={<Homepage />} />
        <Route path="/blog/:id" element={<ArticleDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
