import { Button, Card } from "flowbite-react";
import { data, Link } from "react-router-dom";
import slugify from "../../hooks/slugify";
import LoaderCMS from "../CMS/LoaderCMS";
import Article from "../../types/article";
import Error from "../Error";

type LatestArticlesProps = {
  data: Article[];
  loading: boolean;
  error: string | null;
};

const LatestArticles = ({ data, loading, error }: LatestArticlesProps) => {
  const fiveLatestArticles = data.slice(0, 5);
  console.log(data);

  return (
    <div className="min-w-full flex flex-col items-center gap-y-5">
      <h2 className="text-3xl font-serif self-start select-none">Latest articles</h2>
      <div className="w-full flex flex-wrap gap-y-4 justify-center">
        {error ? (
          <Error errorMessage="Failed to fetch article data. Please try again later." />
        ) : loading ? (
          <LoaderCMS textDark={true} />
        ) : fiveLatestArticles.length === 0 ? (
          <p className="text-black mt-10 mx-auto">No articles in database</p>
        ) : (
          <>
            <div className="flex flex-wrap w-full justify-around gap-4 max-[800px]:gap-8">
              {fiveLatestArticles.slice(0, 2).map((article) => (
                <Card
                  key={article.id}
                  className="w-[48%] max-[800px]:w-full text-black bg-transparent! hover:scale-105 transition-all break-words max-[800px]:hover:scale-100"
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
                    <Link to={`/article/${slugify(article.title)}`} state={{ article, data }}>
                      <Button className="bg-transparent! text-black border w-fit self-end mt-auto hover:bg-white focus:ring-transparent! hover:cursor-pointer select-none">
                        view article
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex flex-wrap w-full justify-around gap-4 mt-4 max-[800px]:gap-8">
              {fiveLatestArticles.slice(2).map((article) => (
                <Card
                  key={article.id}
                  className="w-[30%] max-[800px]:w-full text-black bg-transparent! hover:scale-105 transition-all break-words max-[800px]:hover:scale-100"
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
                 <Link to={`/article/${slugify(article.title)}`} state={{ article, data }}>
                      <Button className="bg-transparent! text-black border w-fit self-end mt-auto hover:bg-white focus:ring-transparent! hover:cursor-pointer select-none">
                        view article
                      </Button>
                    </Link>
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
