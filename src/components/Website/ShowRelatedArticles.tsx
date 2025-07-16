import Separator from "./Separator";
import { Card, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import slugify from "../../hooks/slugify";
import Article from "../../types/article";
import { all } from "axios";

type ShowRelatedArticlesProps = {
  allArticles: Article[];
  selectedArticle: Article;
};

const ShowRelatedArticles = ({ allArticles, }: ShowRelatedArticlesProps) => {
 
  return (
    <>
      <Separator />
      <h1 className="text-3xl font-bold select-none mb-10">Related articles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-15">
        {allArticles.map((article) => (
          <Card
            key={article.id}
            className="!bg-[#ececec] text-black hover:scale-105 transition-all flex flex-col h-full"
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
              <Link to={`/article/${slugify(article.title)}`} state={{ article, allArticles }}>
                <Button className="bg-transparent! text-black border w-fit hover:bg-white focus:ring-transparent! hover:cursor-pointer">View Article</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ShowRelatedArticles;
