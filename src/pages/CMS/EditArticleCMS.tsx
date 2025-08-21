import { useParams } from "react-router";
import UseFetchSingleArticle from "../../hooks/UseFetchSingleArticle";
import EditArticleForm from "../../components/CMS/EditArticleForm";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

const EditArticle = () => {
  const { idSlug } = useParams();
  const { article, loading, error } = UseFetchSingleArticle(idSlug);

  return (
    <div className="w-full flex justify-center">
      {/* Loading */}
      {loading && <Loader textDark={false} />}

      {/* Error */}
      {error && <Error errorMessage="Cound not fetch article data. Please try again later" />}

      {/* Render content */}
      {!loading && !error && article && <EditArticleForm article={article}/>}
    </div>
  );
};

export default EditArticle;
