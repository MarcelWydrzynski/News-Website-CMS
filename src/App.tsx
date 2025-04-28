import { Routes, Route } from "react-router-dom";
import useScrollToTop from "./hooks/ScrollToTop"; // <-- Import the hook
import Layout from "./components/Website/Layout";
import HomeCMS from "./pages/CMS/HomeCMS";
import ArticlesCMS from "./pages/CMS/ArticlesCMS";
import ImagesCMS from "./pages/CMS/ImagesCMS";
import AddArticle from "./pages/CMS/AddArticleCMS";
import AuthorsCMS from "./pages/CMS/AuthorsCMS";
import Home from "./pages/Webstie/Home";
import Article from "./pages/Webstie/Article";
import PrivacyPolicy from "./pages/Webstie/PrivacyPolicy";
import Licensing from "./pages/Webstie/Licensing";
import TermsAndConditions from "./pages/Webstie/TermsAndConditions";
import InProgress from "./pages/Webstie/InProgress";

function App() {
  useScrollToTop();

  return (
    <Routes>
      <Route path="/CMS" element={<HomeCMS />}>
        <Route index element={<ArticlesCMS />} />
        <Route path="images" element={<ImagesCMS />} />
        <Route path="authors" element={<AuthorsCMS />} />
        <Route path="add-article" element={<AddArticle />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="article/:slug" element={<Article />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="licensing" element={<Licensing />} />
        <Route path="terms&conditions" element={<TermsAndConditions />} />
        <Route path="InProgress" element={<InProgress />} />
      </Route>
    </Routes>
  );
}

export default App;
