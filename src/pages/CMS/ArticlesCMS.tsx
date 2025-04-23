import { useState, ChangeEvent } from "react";
import UseFetchArticles from "../../hooks/UseFetchArticles";
import Error from "../../components/CMS/ErrorCMS";
import LoaderCMS from "../../components/CMS/LoaderCMS";
import ArticlesFiltersCMS from "../../components/CMS/ArticlesFiltersCMS";
import deleteArticles from "../../hooks/UseDeleteArticles";
import { Button, Card, Checkbox } from "flowbite-react";
import ArticleModal from "../../components/CMS/ArticleModal";

type Article = {
  id: number;
  author: string;
  category: string;
  title: string;
  description: string;
  lead: string;
  image: string;
  content: string;
};

const ArticlesCMS = () => {
  const { articles, fetchingArticlesLoading, fetchingArticlesError } = UseFetchArticles();
  const [selectedArticles, setSelectedArticles] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article>();

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, article: Article) => {
    if (event.target.checked) {
      setSelectedArticles((prev) => [...prev, article.id]);
    } else {
      setSelectedArticles((prev) => prev.filter((id) => id !== article.id));
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleDelete = () => {
    deleteArticles(selectedArticles);
  };

  const handleModal = (article: Article) => {
    setSelectedArticle(article);
    setOpenModal(true);
  };

  const filteredArticles = searchQuery.trim() === "" ? articles : articles.filter((article) => article.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex gap-y-10 flex-col w-full">
      <ArticlesFiltersCMS selectedArticles={selectedArticles} onSearch={handleSearch} onDelete={handleDelete} />
      {openModal ? <ArticleModal openModal={openModal} setOpenModal={setOpenModal} article={selectedArticle} /> : null}

      {fetchingArticlesLoading && <LoaderCMS />}
      {fetchingArticlesError && <Error errorMessage={fetchingArticlesError} />}

      <div className="flex gap-y-8 gap-x-6 flex-wrap max-[800px]:justify-center items-stretch justify-center">
        {filteredArticles.length === 0 && fetchingArticlesLoading === false ? (
          <p className="text-2xl text-white">No articles found</p>
        ) : (
          filteredArticles.map((article) => (
            <Card
              key={article.id}
              className="max-w-sm hover:scale-105 transition-all relative break-word flex flex-col justify-between"
              imgAlt={article.title}
              imgSrc={article.image}
            >
              <Checkbox className="absolute top-3 left-3 w-6 h-6" onChange={(event) => handleCheckboxChange(event, article)} />

              <div className="flex flex-col gap-2 flex-grow">
                <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                  <div className="flex gap-1 flex-wrap">
                    <span className="font-thin">By:</span> {article.author}
                    <span className="font-thin ml-2">Category:</span> {article.category}
                  </div>
                </h5>
                <h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{article.title}</h4>
                <p className="font-normal text-gray-700 dark:text-gray-400">{article.description}</p>
              </div>

              <Button className="mt-auto w-fit" onClick={() => handleModal(article)}>
                Display article
              </Button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ArticlesCMS;
