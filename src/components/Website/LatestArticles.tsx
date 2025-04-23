import React from "react";
import UseFetchArticles from "../../hooks/UseFetchArticles";
import { Card } from "flowbite-react";

const LatestArticles = () => {
  const { articles } = UseFetchArticles();
  return (
    <div className="min-w-full">
      {articles.map((article) => (
        <Card className="bg-white!">{article.title}</Card>
      ))}
    </div>
  );
};

export default LatestArticles;
