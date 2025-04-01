import React from "react";

interface ArticleCardProps {
  article: {
    id: number;
    title: string;
    author: string;
    category: string;
    short_title: string;
    short_description: string;
    lead: string;
    image: string;
    content: string;
  };
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="border-2 p-4 rounded-xl w-96">
      <h1 className="text-3xl">{article.title}</h1>
      <p className="font-bold text-xl">{article.author}</p>
      <p className="text-gray-400">{article.short_description}</p>
      <button className="p-4">View article</button>
    </div>
  );
};

export default ArticleCard;
