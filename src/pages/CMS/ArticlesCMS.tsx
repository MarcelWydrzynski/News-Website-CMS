import UseFetchArticles from "../../hooks/UseFetchArticles";
import Error from "../../components/CMS/ErrorCMS";
import { Card } from "flowbite-react";
import LoaderCMS from "../../components/CMS/LoaderCMS";
import ArticlesFiltersCMS from "../../components/CMS/ArticlesFiltersCMS";

const ArticlesCMS = () => {
  const { articles, fetchingArticlesLoading, fetchingArticlesError } =
    UseFetchArticles();

  return (
    <div className="flex gap-y-10 flex-col w-full ">
      <ArticlesFiltersCMS />
      {fetchingArticlesLoading ? <LoaderCMS /> : null}
      {fetchingArticlesError ? (
        <Error errorMessage={fetchingArticlesError} />
      ) : null}
      <div className="flex gap-y-8 gap-x-6 flex-wrap max-[800px]:justify-center">
        {articles.length === 0 ? (
          <p className="text-2xl text-white">No articles stored in database</p>
        ) : (
          articles.map((article) => (
            <Card
              key={article.id}
              className="max-w-sm hover:scale-105 transition-all"
              imgAlt={article.title}
              imgSrc={article.image}
            >
              <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                <span className="font-thin">By: </span>{article.author}
              </h5>
              <h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {article.title}
              </h4>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {article.description}
              </p>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ArticlesCMS;
