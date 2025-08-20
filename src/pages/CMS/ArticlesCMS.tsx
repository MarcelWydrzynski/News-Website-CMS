import { useState, ChangeEvent } from "react";
import UseFetchArticles from "../../hooks/UseFetchArticles";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import ArticlesFiltersCMS from "../../components/CMS/ArticlesFiltersCMS";
import deleteArticles from "../../hooks/UseDeleteArticles";
import ArticleModal from "../../components/CMS/ArticleModal";
import ArticleCardCMS from "../../components/CMS/ArticleCardCMS";
import Article from "../../types/article";

const ArticlesCMS = () => {
  const [selectedArticles, setSelectedArticles] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article>();

  const { articles, loading, error } = UseFetchArticles();

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, article: Article) => {
    if (event.target.checked) {
      setSelectedArticles((prev) => [...prev, article.id]);
    } else {
      setSelectedArticles((prev) => prev.filter((id) => id !== article.id));
    }
  };

  const handleModal = (article: Article) => {
    setSelectedArticle(article);
    setOpenModal(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleDelete = () => {
    deleteArticles(selectedArticles);
  };

  const filteredArticles = searchQuery.trim() === "" ? articles : articles.filter((article) => article.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex gap-y-10 flex-col w-full">
      <ArticlesFiltersCMS selectedArticles={selectedArticles} onSearch={handleSearch} onDelete={handleDelete} />
      {openModal ? <ArticleModal openModal={openModal} setOpenModal={setOpenModal} article={selectedArticle!} /> : null}

      {/*Loading */}
      {loading && <Loader textDark={false} />}

      {/*Error */}
      {error && <Error errorMessage={"Failed to fetch articles. Please try again later"} />}

      {/*No articles in database */}
      <div className="flex gap-y-8 gap-x-6 flex-wrap max-[800px]:justify-center items-stretch justify-center">
        {filteredArticles.length === 0 && !loading && <p className="text-2xl text-white">No articles found</p>}

        {/*Render content */}
        {!loading &&
          !error &&
          filteredArticles.map((article) => (
            <ArticleCardCMS
              key={article.id}
              article={article}
              setSelectedArticle={setSelectedArticle}
              handleCheckboxChange={handleCheckboxChange}
              handleModal={handleModal}
              setOpenModal={setOpenModal}
            />
          ))}
      </div>
    </div>
  );
};

export default ArticlesCMS;
