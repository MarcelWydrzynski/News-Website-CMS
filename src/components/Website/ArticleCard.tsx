import Article from "../../types/article";
import { Card } from "flowbite-react";
import slugify from "../../utils/slugify";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

type ArticleCardProps = {
  article: Article;
  layout: "vertical" | "horizontal";
  className: string;
};

const ArticleCard = ({ article, layout, className = "" }: ArticleCardProps) => {
  return (
    <Card
      className={`${className} ${layout === "horizontal" ? "flex-row" : "flex-col"} bg-transparent! text-black`}
      imgAlt={article.title}
      imgSrc={article.image}
      horizontal={layout === "horizontal"}
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
  );
};

export default ArticleCard;
