import LatestArticles from "../../components/Website/LatestArticles";
import ArticlesCategoryDisplay from "../../components/Website/ArticlesCategoryDisplay";
import UseFetchArticles from "../../hooks/UseFetchArticles";
import Seperator from "../../components/Website/Separator";

const Home = () => {
  const { articles, fetchingArticlesError, fetchingArticlesLoading } = UseFetchArticles();
  const allCategories = new Set(articles.map((article) => article.category));
  const allCategoriesArray = [...allCategories];

  return (
    <>
      <LatestArticles data={articles} loading={fetchingArticlesLoading} error={fetchingArticlesError} />
      <Seperator />
      {allCategoriesArray.map((category) => (
        <ArticlesCategoryDisplay key={category} data={articles} loading={fetchingArticlesLoading} error={fetchingArticlesError} title={category} />
      ))}
    </>
  );
};

export default Home;
