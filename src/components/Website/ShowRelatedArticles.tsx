import Separator from "./Separator";
import { Card, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import slugify from "../../utils/slugify";
import Article from "../../types/article";
import UseFetchArticles from "../../hooks/UseFetchArticles";
import Loader from "../Loader";
import Error from "../Error";

type ShowRelatedArticlesProps = {
  selectedArticle: Article;
};

const ShowRelatedArticles = ({ selectedArticle }: ShowRelatedArticlesProps) => {
  const { articles, fetchingArticlesError, fetchingArticlesLoading } = UseFetchArticles();
  const articlesFromSameCategory = articles.filter((article) => article.category === selectedArticle.category);
  const filteredArticles = articlesFromSameCategory.filter((article) => article.id !== selectedArticle.id);

  return (
    <>
      <Separator />
      <h1 className="text-3xl font-bold select-none mb-10">Related articles</h1>

      {/* Loading */}
      {fetchingArticlesLoading && <Loader textDark={true} />}

      {/* Error */}
      {fetchingArticlesError && <Error errorMessage="Failed to fetch articles. Please try again later." />}

      {/* Handle no articles */}
      {!fetchingArticlesLoading && !fetchingArticlesError && filteredArticles.length === 0 && <p>Found no articles from the same category.</p>}

      {/* Render articles */}
      {!fetchingArticlesLoading && !fetchingArticlesError && filteredArticles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-15">
          {filteredArticles.slice(0, 3).map((article) => (
            <Card
              key={article.id}
              className="!bg-[#ececec] text-black hover:scale-105 transition-all flex flex-col h-full"
              imgAlt={article.title}
              imgSrc={article.image}
            >
              <div className="flex flex-col justify-around gap-3 h-full">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>By: {article.author}</span>
                  <span>Category: {article.category}</span>
                </div>
                <h5 className="text-2xl font-bold">{article.title}</h5>
                <p className="text-gray-700">{article.description}</p>
                <Link to={`/article/${article.id}-${slugify(article.title)}`}>
                  <Button className="bg-transparent! text-black border w-fit hover:bg-white focus:ring-transparent! hover:cursor-pointer">View Article</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default ShowRelatedArticles;
