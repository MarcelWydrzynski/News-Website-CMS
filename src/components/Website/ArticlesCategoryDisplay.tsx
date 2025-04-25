import ErrorCMS from "../CMS/ErrorCMS";
import { Spinner } from "flowbite-react";

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

type ArticlesCategoryDisplayProps = {
  data: Article[];
  loading: boolean;
  error: string | null;
  title: string;
};

const ArticlesCategoryDisplay = ({ data, loading, error, title }: ArticlesCategoryDisplayProps) => {
  const formattedArticles = data.filter((article) => article.category === title).slice(0, 5);

  console.log(formattedArticles);
  return (
    <>
      {formattedArticles.length >= 4 ? (
        <div className="min-w-full flex flex-col items-center gap-y-5">
          <h1 className="text-3xl font-serif self-start">Latest articles from {title}</h1>
          <div className="w-full flex flex-wrap gap-y-4">
            <div className="flex flex-wrap w-full justify-around gap-4"></div>

            {error ? <ErrorCMS errorMessage={error} /> : null}

            {loading ? (
              <div>
                Loading... <Spinner color="success" aria-label="Success spinner example" className="m-4" size="lg" />
              </div>
            ) : null}

            {formattedArticles.length}

            <div className="flex flex-wrap w-full justify-around gap-4 mt-4"></div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ArticlesCategoryDisplay;
