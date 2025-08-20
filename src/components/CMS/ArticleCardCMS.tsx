import React, { ChangeEvent } from "react";
import { Card, Checkbox, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import Article from "../../types/article";

type ArticleCardCMSProps = {
  article: Article;
  setSelectedArticle: (article: Article) => void;
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>, article: Article) => void;
  handleModal: (article: Article) => void;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ArticleCardCMS = ({ article, handleCheckboxChange, handleModal }: ArticleCardCMSProps) => {
  return (
    <Card
      key={article.id}
      className="max-w-sm relative flex flex-col justify-between break-words"
      imgAlt={article.title}
      imgSrc={article.image}
    >
      <Checkbox className="absolute top-3 left-3 w-6 h-6" onChange={(event) => handleCheckboxChange(event, article)} />

      <div className="flex flex-col gap-2 flex-grow overflow-hidden">
        <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
          <div className="flex gap-1 flex-wrap">
            <span className="font-thin">By:</span> {article.author}
            <span className="font-thin ml-2">Category:</span> {article.category}
          </div>
        </h5>
        <h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{article.title}</h4>
        <p className="font-normal text-gray-700 dark:text-gray-400">{article.description}</p>
      </div>

      <div className="flex justify-between flex-wrap gap-6 max-[365px]:justify-center">
        <Button className="mt-auto w-fit hover:scale-105 transition-all cursor-pointer" onClick={() => handleModal(article)}>
          Display article
        </Button>
        <Link to={`edit-article`} state={article.id}>
          <Button className="mt-auto w-fit hover:scale-105 transition-all cursor-pointer">Edit Article</Button>
        </Link>
      </div>
    </Card>
  );
};

export default ArticleCardCMS;
