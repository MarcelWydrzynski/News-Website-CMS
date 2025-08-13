import ArticleCard from "./ArticleCard";
import Article from "../../types/article";

type LatestArticlesProps = {
  articles: Article[];
};

const LatestArticles = ({ articles }: LatestArticlesProps) => {
  const fiveLatestArticles = articles.slice(0, 5);

  return (
    <div className="min-w-full flex flex-col items-center gap-y-5">
      <h2 className="text-3xl font-serif self-start select-none">Latest articles</h2>
      <div className="w-full flex flex-wrap gap-y-4 justify-center">
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
      </div>
    </div>
  );
};

export default LatestArticles;
