import { useState } from "react";
import UseFetchArticles from "../../hooks/UseFetchArticles";
import Error from "../../components/CMS/ErrorCMS";
import { Card, Checkbox } from "flowbite-react";
import LoaderCMS from "../../components/CMS/LoaderCMS";
import ArticlesFiltersCMS from "../../components/CMS/ArticlesFiltersCMS";
import { useDeleteArticles } from "../../hooks/UseDeleteArticles";

const ArticlesCMS = () => {
  const { articles, fetchingArticlesLoading, fetchingArticlesError } = UseFetchArticles();
  const { deleteArticles } = useDeleteArticles();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleCheckbox = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    deleteArticles(selectedIds);
    setSelectedIds([]);

  };

  return (
    <div className="flex gap-y-10 flex-col w-full">
      <ArticlesFiltersCMS onDelete={handleDelete} selectedIds={selectedIds} />

      {fetchingArticlesLoading && <LoaderCMS />}
      {fetchingArticlesError && <Error errorMessage={fetchingArticlesError} />}


      <div className="flex gap-y-8 gap-x-6 flex-wrap max-[800px]:justify-center">
        {articles.length === 0 ? (
          <p className="text-2xl text-white">No articles stored in database</p>
        ) : (
          articles.map((article) => (
            <Card key={article.id} className="max-w-sm hover:scale-105 transition-all relative" imgAlt={article.title} imgSrc={article.image}>
              <Checkbox className="absolute top-3 left-3 w-6 h-6" checked={selectedIds.includes(article.id)} onChange={() => toggleCheckbox(article.id)} />
              <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                <span className="font-thin">By: </span>
                {article.author}
              </h5>
              <h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{article.title}</h4>
              <p className="font-normal text-gray-700 dark:text-gray-400">{article.description}</p>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ArticlesCMS;
