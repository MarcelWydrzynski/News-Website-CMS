import Article from "../../types/article";
import ArticleCard from "./ArticleCard";

type ArticlesCategoryDisplayProps = {
  articles: Article[];
};

const ArticlesCategoryDisplay = ({ articles }: ArticlesCategoryDisplayProps) => {
  const allCategories = new Set(articles.map((article) => article.category));
  const allCategoriesArray = [...allCategories];

  return (
    <>
      {allCategoriesArray.map((category) => {
        const formattedArticles = articles.filter((article) => article.category === category).slice(0, 5);

        if (formattedArticles.length < 4) return null;

        return (
          <div key={category} className="w-full flex flex-col my-15">
            <h2 className="text-3xl font-serif mb-6 select-none">Latest articles from {category}</h2>

            <div className="flex justify-around max-[1000px]:flex-col max-[1000px]:gap-8 gap-2">
              {/* First full-width article */}
              <div className="w-full max-w-[50%] max-[1000px]:max-w-full">
                <ArticleCard article={formattedArticles[0]} width="100%" horizontal={false} />
              </div>

              {/* Next 3 articles, responsive width */}
              <div className="flex flex-col gap-4 items-center w-full max-[1000px]:gap-6">
                {formattedArticles.slice(1, 4).map((article: Article) => (
                  <ArticleCard key={article.id} article={article} horizontal={true} width="100%" />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ArticlesCategoryDisplay;
