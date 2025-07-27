import ReturnButton from "../../components/Website/ReturnButton";
import ShowRelatedArticles from "../../components/Website/ShowRelatedArticles";
import { useParams } from "react-router";
import UseFetchSingleArticle from "../../hooks/UseFetchSingleArticle";

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

const renderHtmlContent = (htmlString: string) => {
  return <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

const Article = () => {
  const { idSlug } = useParams();
  const articleId = parseInt(idSlug?.split("-")[0] || "", 10);

  const { article, loading, error } = UseFetchSingleArticle(articleId);

  return (
    <>
      <div className="w-full">
        <ReturnButton path={"/"} />
        {!loading && !error && article && (
          <>
            <h1 className="text-4xl font-bold mb-4 select-none">{article.title}</h1>
            <p className="text-gray-600 mb-6 select-none">
              By {article.author} | Category: {article.category}
            </p>
            <img src={article.image} alt={article.title} className="w-full h-auto rounded mb-8" />
            {renderHtmlContent(article.content)}

            <ShowRelatedArticles allArticles={[article]} selectedArticle={article} />
          </>
        )}
      </div>
      <ShowRelatedArticles allArticles={allArticles} selectedArticle={article} />
    </>
  );
};

export default Article;
