import { Routes, Route } from "react-router";
import Home from "./pages/Webstie/Home";
import "./index.css";
import HomeCMS from "./pages/CMS/HomeCMS";
import ArticlesCMS from "./components/CMS/ArticlesCMS";
import ImagesCMS from "./components/CMS/ImagesCMS";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/CMS" element={<HomeCMS />}>
        <Route path="articles" element={<ArticlesCMS />} />
        <Route path="images" element={<ImagesCMS />} />
        <Route path="ads" element={<ArticlesCMS />} />
      </Route>
    </Routes>
  );
}

export default App;
