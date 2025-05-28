import { useLocation } from "react-router-dom";
import UseFetchSingleArticle from "../../hooks/UseFetchSingleArticle";
import EditArticleForm from "../../components/CMS/EditArticleForm";
import { Spinner } from "flowbite-react";

const EditArticle = () => {
  const location = useLocation();
  const articleId = location.state;
  const { article, loading, error } = UseFetchSingleArticle(articleId);

  if (loading) {
    return (
      <div className="w-full flex justify-center mt-10">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error || !article) {
    return <div className="w-full flex justify-center mt-10 text-red-600 font-semibold">Error loading article: {error || "Article not found."}</div>;
  }

  return (
    <div className="w-full flex justify-center">
      <EditArticleForm article={article} />
    </div>
  );
};

export default EditArticle;
