import { lazy, Suspense } from "react";
import useFetchFavoriteArticles from "../../hooks/UseFetchFavoriteArticles";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import { useAuth } from "../../Context/AuthContext";

const ArticleCard = lazy(() => import("../../components/Website/ArticleCard"));

const FavoriteArticles = () => {
  const { userFavoriteArticles } = useAuth();

  const { articles, loading, error } = useFetchFavoriteArticles(userFavoriteArticles);

  return (
    <div className=" flex  flex-col gap-y-5">
      <h2 className="text-3xl font-serif self-start select-none">Favorite Articles</h2>

      {/* Error */}
      {error && <Error errorMessage="There was an error fetching your articles. Please try again later." />}

      {/* Loading */}
      {loading && <Loader textDark={true} />}

      {/* Empty state */}
      {!error && !loading && articles.length === 0 && (
        <h2 className="text-xl font-serif self-start select-none">You have not added any Articles to your favorites. </h2>
      )}

      {/* Render list */}
      {!error && !loading && articles.length > 0 && (
        <Suspense fallback={<Loader textDark={true} />}>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} width="w-[30%]" horizontal={false} />
            ))}
          </div>
        </Suspense>
      )}
    </div>
  );
};

export default FavoriteArticles;
