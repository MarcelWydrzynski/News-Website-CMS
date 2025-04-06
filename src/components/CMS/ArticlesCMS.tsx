import UseFetchArticles from "../../hooks/UseFetchArticles";
import Error from "../../components/CMS/ErrorCMS";
import { Card } from "flowbite-react";
import LoaderCMS from "./LoaderCMS";

const ArticlesCMS = () => {
  const { articles, fetchingArticlesLoading, fetchingArticlesError } =
    UseFetchArticles();

  return (
    <div className="flex gap-8 flex-wrap justify-center items-center">
      {fetchingArticlesLoading ? <LoaderCMS /> : null}
      {fetchingArticlesError ? (
        <Error errorMessage={fetchingArticlesError} />
      ) : null}
      {articles.map((article) => (
        <Card
          key={article.id}
          className="max-w-sm"
          imgAlt={article.title}
          imgSrc={article.image}
        >
          <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
            By: {article.author}
          </h5>
          <h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {article.title}
          </h4>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {article.content.length > 10
              ? `${article.content.substring(0, 100)}...`
              : article.content}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default ArticlesCMS;
