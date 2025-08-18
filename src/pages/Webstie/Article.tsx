import ReturnButton from "../../components/Website/ReturnToHomeButton";
import ShowRelatedArticles from "../../components/Website/ShowRelatedArticles";
import { useParams } from "react-router";
import UseFetchSingleArticle from "../../hooks/UseFetchSingleArticle";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

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
console.log(idSlug);
  const { article, loading, error } = UseFetchSingleArticle(articleId);

  return (
    <>
      <div className="w-full">
        <ReturnButton />
        {/* Loading */}
        {loading && <Loader textDark={true} />}

        {/* Error */}
        {error && <Error errorMessage="Failed to fetch article. Please try again later" />}

        {/* Render content */}
        {!loading && !error && article && (
          <>
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <p className="text-gray-600 mb-6">
              By {article.author} | Category: {article.category}
            </p>
            <img src={article.image} alt={article.title} className="w-full h-auto rounded mb-8" />
            {renderHtmlContent(article.content)}

            <ShowRelatedArticles selectedArticle={article} />
          </>
        )}
      </div>
    </>
  );
};

export default Article;
