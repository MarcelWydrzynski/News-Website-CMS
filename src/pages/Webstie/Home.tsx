import { Suspense, lazy } from "react";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
const LatestArticles = lazy(() => import("../../components/Website/LatestArticles"));
const ArticlesCategoryDisplay = lazy(() => import("../../components/Website/ArticlesCategoryDisplay"));
import Seperator from "../../components/Website/Separator";
import UseFetchArticles from "../../hooks/UseFetchArticles";

const Home = () => {
  const { articles, loading, error } = UseFetchArticles();

  return (
    <>
      {/* Loading */}
      {loading && <Loader textDark={true} />}

      {/* Error */}
      {error && <Error errorMessage="Could not fetch Articles. Please try again later." />}

      {/* Render content */}
      {!loading && !error && (
        <Suspense fallback={<Loader textDark={true} />}>
          <LatestArticles articles={articles} />
          <Seperator />
          <ArticlesCategoryDisplay articles={articles} />
        </Suspense>
      )}
    </>
  );
};

export default Home;
