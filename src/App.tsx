import { Routes, Route } from "react-router";
import Home from "./pages/Webstie/Home";
import "./index.css";
import HomeCMS from "./pages/CMS/HomeCMS";
import ArticlesCMS from "./pages/CMS/ArticlesCMS";
import ImagesCMS from "./pages/CMS/ImagesCMS";
import AddArticle from "./pages/CMS/AddArticleCMS";
import AuthorsCMS from "./pages/CMS/AuthorsCMS";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/CMS" element={<HomeCMS />}>
        <Route path="articles" element={<ArticlesCMS />} />
        <Route path="images" element={<ImagesCMS />} />
        <Route path="authors" element={<AuthorsCMS />} />
        <Route path="add-article" element={<AddArticle />} />
      </Route>
    </Routes>
  );
}

export default App;
