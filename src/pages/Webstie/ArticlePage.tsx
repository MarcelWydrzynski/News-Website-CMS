import ReturnButton from "../../components/Website/ReturnButton";
import UseFetchSingleArticle from "../../hooks/UseFetchSingleArticle";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import { Suspense, lazy } from "react";
import { useParams } from "react-router";
import { Button } from "flowbite-react";
import { useAuth } from "../../Context/AuthContext";

const ShowRelatedArticles = lazy(() => import("../../components/Website/ShowRelatedArticles"));

const renderHtmlContent = (htmlString: string) => {
  return <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

const ArticlePage = () => {
  const { idSlug } = useParams();
  const articleId = parseInt(idSlug?.split("-")[0] || "", 10);
  const { article, loading, error } = UseFetchSingleArticle(articleId);
  const { addArticleToUser, userFavoriteArticles, user } = useAuth();
  const isFavorite = userFavoriteArticles.includes(articleId);

  return (
    <div className="w-full">
      <div className="w-full flex justify-between">
        <ReturnButton />
        {user && (
          <Button
            onClick={() => addArticleToUser(articleId)}
            className="!bg-transparent text-black border w-fit self-end mt-auto hover:!bg-white focus:!ring-transparent hover:cursor-pointer select-none hover:scale-105 transition-all"
          >
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </Button>
        )}
      </div>

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
          <img src={article.image} alt={article.title} className="w-full h-auto rounded mb-8" loading="lazy" />
          {renderHtmlContent(article.content)}

          <Suspense fallback={<Loader textDark={true} />}>
            <ShowRelatedArticles selectedArticle={article} />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default ArticlePage;
