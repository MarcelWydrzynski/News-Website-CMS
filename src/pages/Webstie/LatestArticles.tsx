import React from "react";
import { Card } from "flowbite-react";
import UseFetchArticles from "../../hooks/UseFetchArticles";

const LatestArticles = () => {
  const { articles } = UseFetchArticles(); // ✅ Inside component

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article) => (
        <Card key={article.id}>
          <h5>{article.title}</h5>
        </Card>
      ))}
    </div>
  );
};

export default LatestArticles;
