import Separator from "./Separator";
import Article from "../../types/article";
import UseFetchArticles from "../../hooks/UseFetchArticles";
import Loader from "../Loader";
import Error from "../Error";
import ArticleCard from "./ArticleCard";

type ShowRelatedArticlesProps = {
  selectedArticle: Article;
};

const ShowRelatedArticles = ({ selectedArticle }: ShowRelatedArticlesProps) => {
  const { articles, error, loading } = UseFetchArticles();
  const articlesFromSameCategory = articles.filter((article) => article.category === selectedArticle.category);
  const filteredArticles = articlesFromSameCategory.filter((article) => article.id !== selectedArticle.id);

  return (
    <>
      <Separator />
      <h1 className="text-3xl font-bold select-none mb-10">Related articles</h1>

      {/* Loading */}
      {loading && <Loader textDark={true} />}

      {/* Error */}
      {error && <Error errorMessage="Failed to fetch articles. Please try again later." />}

      {/* Handle no articles */}
      {!loading && !error && filteredArticles.length === 0 && <p>Found no articles from the same category.</p>}

      {/* Render articles */}
      {!loading && !error && filteredArticles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-15">
          {filteredArticles.slice(0, 3).map((article) => (
            <ArticleCard article={article} width="100%" horizontal={false} />
          ))}
        </div>
      )}
    </>
  );
};

export default ShowRelatedArticles;
