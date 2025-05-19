import { useLocation } from "react-router-dom";
import ReturnButton from "../../components/Website/ReturnButton";
import ShowRelatedArticles from "../../components/Website/ShowRelatedArticles";

type Article = {
  id: number;
  author: string;
  category: string;
  title: string;
  description: string;
  lead: string;
  image: string;
  content: string;
  date_created: string;
};

const Article = () => {
  const { state } = useLocation();
  const article = state?.article as Article;
  const allArticles = state?.allArticles as Article[];

  return (
    <>
      <div className="w-full">
        <ReturnButton path={"/"}/>
        {!article ? (
          <p>Article not found please return to homepage</p>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-4 select-none">{article.title}</h1>
            <p className="text-gray-600 mb-6 select-none">
              By {article.author} | Category: {article.category}
            </p>
            <img src={article.image} alt={article.title} className="w-full h-auto rounded mb-8" />
            <p className="text-lg">{article.content}</p>
          </>
        )}
      </div>
      <ShowRelatedArticles articlesFromSameCategory={allArticles} selectedArticle={article} />
    </>
  );
};

export default Article;
