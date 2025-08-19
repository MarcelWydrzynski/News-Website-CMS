import { Routes, Route } from "react-router-dom";
import useScrollToTop from "./utils/ScrollToTop.ts"; // <-- Import the hook
import Layout from "./components/Website/Layout";
import HomeCMS from "./pages/CMS/HomeCMS";
import ArticlesCMS from "./pages/CMS/ArticlesCMS";
import ImagesCMS from "./pages/CMS/ImagesCMS";
import AddArticle from "./pages/CMS/AddArticleCMS";
import EditArticle from "./pages/CMS/EditArticleCMS";
import AuthorsCMS from "./pages/CMS/AuthorsCMS";
import Home from "./pages/Webstie/Home";
import Article from "./pages/Webstie/Article";
import Crytpo from "./pages/Webstie/Crytpo";
import PrivacyPolicy from "./pages/Webstie/PrivacyPolicy";
import Licensing from "./pages/Webstie/Licensing";
import TermsAndConditions from "./pages/Webstie/TermsAndConditions";
import LostPage from "./pages/Webstie/LostPage.tsx";
import SingleCrypto from "./pages/Webstie/SingleCrypto";
import Weather from "./pages/Webstie/Weather.tsx";

function App() {
  useScrollToTop();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/article/:idSlug" element={<Article />} />
        <Route path="crypto" element={<Crytpo />} />
        <Route path="crypto/:cryptoId" element={<SingleCrypto />} />
        <Route path="weather" element={<Weather />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="licensing" element={<Licensing />} />
        <Route path="terms-conditions" element={<TermsAndConditions />} />
        <Route path="*" element={<LostPage textDark={true}/>} />
      </Route>

      <Route path="/cms" element={<HomeCMS />}>
        <Route index element={<ArticlesCMS />} />
        <Route path="images" element={<ImagesCMS />} />
        <Route path="authors" element={<AuthorsCMS />} />
        <Route path="add-article" element={<AddArticle />} />
        <Route path="edit-article" element={<EditArticle />} />
        <Route path="*" element={<LostPage textDark={false}/>} />
      </Route>
    </Routes>
  );
}

export default App;
