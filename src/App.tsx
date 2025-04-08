import { Routes, Route } from "react-router";
import Home from "./pages/Webstie/Home";
import "./index.css";
import HomeCMS from "./pages/CMS/HomeCMS";
import ArticlesCMS from "./pages/CMS/ArticlesCMS";
import ImagesCMS from "./pages/CMS/ImagesCMS";
import AddArticle from "./pages/CMS/AddArticleCMS";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/CMS" element={<HomeCMS />}>
        <Route path="articles" element={<ArticlesCMS />} />
        <Route path="images" element={<ImagesCMS />} />
        <Route path="ads" element={<ArticlesCMS />} />
        <Route path="add-article" element={<AddArticle />} />
      </Route>
    </Routes>
  );
}

export default App;
