import { Button, Card, Spinner } from "flowbite-react";
import ErrorCMS from "../CMS/ErrorCMS";

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

type LatestArticlesProps = {
  data: Article[];
  loading: boolean;
  error: string | null;
};
const LatestArticles = ({ data, loading, error }: LatestArticlesProps) => {
  const fiveLatestArticles = data.slice(0, 5);

  return (
    <div className="min-w-full flex flex-col items-center gap-y-5">
      <h1 className="text-3xl font-serif self-start">Latest articles</h1>
      <div className="w-full flex flex-wrap gap-y-4">
        {error ? <ErrorCMS errorMessage={error} /> : null}

        {loading ? (
          <div>
            Loading... <Spinner color="success" aria-label="Success spinner example" className="m-4" size="lg" />
          </div>
        ) : null}

        {fiveLatestArticles.length === 0 ? <p>No articles in database</p> : null}

        {loading === false && data.length > 0 && (
          <>
            <div className="flex flex-wrap w-full justify-around gap-4">
              {fiveLatestArticles.slice(0, 2).map((article) => (
                <Card
                  key={article.id}
                  className="w-[48%] max-[800px]:w-full text-black bg-transparent! hover:scale-105 transition-all break-words"
                  imgAlt={article.title}
                  imgSrc={article.image}
                >
                  <div className="flex flex-col gap-2 flex-grow">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>By: {article.author}</span>
                      <span className="ml-2">Category: {article.category}</span>
                    </div>
                    <h5 className="text-2xl font-bold">{article.title}</h5>
                    <p className="text-gray-900">{article.description}</p>
                    <Button className="bg-transparent! text-black border w-fit self-end mt-auto hover:bg-white focus:ring-transparent! hover:cursor-pointer">
                      view article
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex flex-wrap w-full justify-around gap-4 mt-4">
              {fiveLatestArticles.slice(2).map((article) => (
                <Card
                  key={article.id}
                  className="w-[30%] max-[800px]:w-full text-black bg-transparent! hover:scale-105 transition-all break-words"
                  imgAlt={article.title}
                  imgSrc={article.image}
                >
                  <div className="flex flex-col gap-2 flex-grow">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>By: {article.author}</span>
                      <span className="ml-2">Category: {article.category}</span>
                    </div>
                    <h5 className="text-2xl font-bold">{article.title}</h5>
                    <p className="text-gray-900">{article.description}</p>
                    <Button className="bg-transparent! text-black border w-fit self-end mt-auto hover:bg-white focus:ring-transparent! hover:cursor-pointer">
                      view article
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LatestArticles;
