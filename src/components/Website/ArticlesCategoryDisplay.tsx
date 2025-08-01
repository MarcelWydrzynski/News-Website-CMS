import { Card, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import slugify from "../../utils/slugify";
import LoaderCMS from "../Loader";
import Article from "../../types/article";
import Error from "../Error";

type ArticlesCategoryDisplayProps = {
  data: Article[];
  loading: boolean;
  error: string;
  title: string;
};

const ArticlesCategoryDisplay = ({ data, loading, error, title }: ArticlesCategoryDisplayProps) => {
  const formattedArticles = data.filter((article) => article.category === title).slice(0, 5);

  if (formattedArticles.length < 4) return null;

  return (
    <div className="w-full flex flex-col my-15">
      <h2 className="text-3xl font-serif mb-6 select-none">Latest articles from {title}</h2>
      {loading && <LoaderCMS textDark={true} />}
      {error && <Error errorMessage="Error fetching articles, please try again later" />}

      {!error && (
        <div className="flex justify-around max-[1000px]:flex-col max-[1000px]:gap-8 gap-2">
          <div className="w-[50%] flex max-[1000px]:w-full">
            {formattedArticles.slice(0, 1).map((article) => (
              <Card
                key={article.id}
                className="!bg-[#ececec] text-black hover:scale-105 transition-all max-[1000px]:hover:scale-100"
                imgAlt={article.title}
                imgSrc={article.image}
              >
                <div className="flex flex-col justify-around gap-3 h-full">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>By: {article.author}</span>
                    <span>Category: {article.category}</span>
                  </div>
                  <h5 className="text-2xl font-bold">{article.title}</h5>
                  <p className="text-gray-700">{article.description}</p>
                  <Link to={`/article/${article.id}-${slugify(article.title)}`}>
                    <Button className="bg-transparent! text-black border w-fit self-end mt-auto hover:bg-white focus:ring-transparent! hover:cursor-pointer select-none">
                      view article
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex-stretch max-[1000px]:w-full max-[1000px]:gap-8 flex flex-col gap-2 justify-center items-center">
            {formattedArticles.slice(1, 4).map((article) => (
              <Card
                key={article.id}
                className="!bg-transparent text-black hover:scale-105 transition-all max-[1000px]:hidden max-[1000px]:hover:scale-100"
                imgAlt={article.title}
                imgSrc={article.image}
                horizontal
              >
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>By: {article.author}</span>
                    <span>Category: {article.category}</span>
                  </div>
                  <h5 className="text-xl font-bold">{article.title}</h5>
                  <p className="text-gray-700">{article.description}</p>
                  <Link to={`/article/${article.id}-${slugify(article.title)}`}>
                    <Button className="bg-transparent! text-black border w-fit self-end mt-auto hover:bg-white focus:ring-transparent! hover:cursor-pointer select-none">
                      view article
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
            {formattedArticles.slice(1, 4).map((article) => (
              <Card
                key={article.id}
                className="!bg-transparent text-black hover:scale-105 transition-all maw-w-xl min-[1000px]:hidden max-[1000px]:hover:scale-100"
                imgAlt={article.title}
                imgSrc={article.image}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>By: {article.author}</span>
                    <span>Category: {article.category}</span>
                  </div>
                  <h5 className="text-xl font-bold">{article.title}</h5>
                  <p className="text-gray-700">{article.description}</p>
                  <Link to={`/article/${article.id}-${slugify(article.title)}`}>
                    <Button className="bg-transparent! text-black border w-fit self-end mt-auto hover:bg-white focus:ring-transparent! hover:cursor-pointer select-none">
                      view article
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlesCategoryDisplay;
