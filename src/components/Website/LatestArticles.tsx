import Loader from "../Loader";
import Error from "../Error";
import UseFetchArticles from "../../hooks/UseFetchArticles";
import ArticleCard from "./ArticleCard";

const LatestArticles = () => {
  const { articles, loading, error } = UseFetchArticles();
  const fiveLatestArticles = articles.slice(0, 5);

  return (
    <div className="min-w-full flex flex-col items-center gap-y-5">
      <h2 className="text-3xl font-serif self-start select-none">Latest articles</h2>
      <div className="w-full flex flex-wrap gap-y-4 justify-center">
        
        {/* Loading */}
        {loading && <Loader textDark={true} />}

        {/* Error */}
        {error && <Error errorMessage="Failed to fetch articles data, please try again later" />}

        {/* Render component */}
        {!loading && !error && (
          <>
            {/* First two articles */}
            <div className="flex flex-wrap w-full justify-around gap-4 max-[800px]:gap-8">
              {fiveLatestArticles.slice(0, 2).map((article) => (
                <ArticleCard key={article.id} article={article} width="w-[48%]" horizontal={false} />
              ))}
            </div>

            {/* Remaining three articles */}
            <div className="flex flex-wrap w-full justify-around gap-4 mt-4 max-[800px]:gap-8">
              {fiveLatestArticles.slice(2).map((article) => (
                <ArticleCard key={article.id} article={article} width="w-[30%]" horizontal={false} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LatestArticles;
