import { Card, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import slugify from "../../utils/slugify";
import ArticleType from "../../types/ArticleType";

type ArticleCardProps = {
  article: ArticleType;
  width: string;
  horizontal: boolean;
};

const ArticleCard = ({ article, width, horizontal }: ArticleCardProps) => {
  return (
    <>
      {/* Desktop card */}
      <Card
        className={` h-content !bg-[#ececec] text-black ${width} max-[1000px]:hidden hover:scale-100`}
        imgAlt={article.title}
        imgSrc={article.image}
        horizontal={horizontal}
      >
        <div className="flex flex-col gap-3 h-full">
          <div className="flex justify-between text-sm text-gray-600">
            <span>By: {article.author}</span>
            <span>Category: {article.category}</span>
          </div>
          <h5 className="text-2xl font-bold">{article.title}</h5>
          <p className="text-gray-700">{article.description}</p>
          <Link to={`/article/${article.id}-${slugify(article.title)}`}>
            <Button className="!bg-transparent text-black border w-fit self-end mt-auto hover:!bg-white focus:!ring-transparent hover:cursor-pointer select-none hover:scale-110 transition-all">
              view article
            </Button>
          </Link>
        </div>
      </Card>

      {/* Mobile Card */}
      <Card
        className={` h-content !bg-[#ececec] text-black ${width} max-[1000px]:w-full min-[1000px]:hidden hover:scale-100`}
        imgAlt={article.title}
        imgSrc={article.image}
        horizontal={false}
      >
        <div className="flex flex-col gap-3 h-full">
          <div className="flex justify-between text-sm text-gray-600">
            <span>By: {article.author}</span>
            <span>Category: {article.category}</span>
          </div>
          <h5 className="text-2xl font-bold">{article.title}</h5>
          <p className="text-gray-700">{article.description}</p>
          <Link to={`/article/${article.id}-${slugify(article.title)}`}>
            <Button className="!bg-transparent text-black border w-fit self-end mt-auto hover:!bg-white focus:!ring-transparent hover:cursor-pointer select-none hover:scale-110 transition-all">
              view article
            </Button>
          </Link>
        </div>
      </Card>
    </>
  );
};

export default ArticleCard;
