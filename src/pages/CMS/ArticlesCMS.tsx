import { useState } from "react";
import UseFetchArticles from "../../hooks/UseFetchArticles";
import Error from "../../components/CMS/ErrorCMS";
import { Card, Checkbox } from "flowbite-react";
import LoaderCMS from "../../components/CMS/LoaderCMS";
import ArticlesFiltersCMS from "../../components/CMS/ArticlesFiltersCMS";
import { ChangeEvent } from "react";

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

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, article: Article) => {
    if (event.target.checked) {
      setSelectedArticles((prev) => [...prev, article.id]);
      console.log(selectedArticles);
    } else {
      setSelectedArticles((prev) => [...prev.filter((id) => id === article.id)]);
      console.log(selectedArticles);
    }
  };
  return (
    <div className="flex gap-y-10 flex-col w-full">
      <ArticlesFiltersCMS selectedArticles={selectedArticles} />

      {fetchingArticlesLoading && <LoaderCMS />}
      {fetchingArticlesError && <Error errorMessage={fetchingArticlesError} />}

      <div className="flex gap-y-8 gap-x-6 flex-wrap max-[800px]:justify-center">
        {articles.length === 0 ? (
          <p className="text-2xl text-white">No articles stored in database</p>
        ) : (
          articles.map((article) => (
            <Card key={article.id} className="max-w-sm hover:scale-105 transition-all relative" imgAlt={article.title} imgSrc={article.image}>
              <Checkbox className="absolute top-3 left-3 w-6 h-6" onChange={(event) => handleCheckboxChange(event, article)} />
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
