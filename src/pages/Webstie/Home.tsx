import Loader from "../../components/Loader";
import Error from "../../components/Error";
import LatestArticles from "../../components/Website/LatestArticles";
import ArticlesCategoryDisplay from "../../components/Website/ArticlesCategoryDisplay";
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

      {/* Rendere content */}
      {!loading && !error && (
        <>
          <LatestArticles articles={articles} />
          <Seperator />
          <ArticlesCategoryDisplay articles={articles} />
        </>
      )}
    </>
  );
};

export default Home;
