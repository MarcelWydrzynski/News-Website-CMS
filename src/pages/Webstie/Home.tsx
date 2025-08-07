import LatestArticles from "../../components/Website/LatestArticles";
import ArticlesCategoryDisplay from "../../components/Website/ArticlesCategoryDisplay";
import Seperator from "../../components/Website/Separator";

const Home = () => {
  return (
    <>
      <LatestArticles />
      <Seperator />
      <ArticlesCategoryDisplay />
    </>
  );
};

export default Home;
