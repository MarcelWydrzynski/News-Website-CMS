import { useState } from "react";
import UseFetchArticles from "../../hooks/UseFetchArticles";
import AddArticleForm from "../../components/CMS/AddArticleForm";

const Homepage = () => {
  const { articles, error, loading } = UseFetchArticles();
  const [article, setArticle] = useState({
    title: "",
    author: "",
    category: "",
    short_title: "",
    short_description: "",
    lead: "",
    image: "",
    content: "",
  });

  return (
    <div className="">
      <p className="text-bold"></p>

      <ul>
        {articles.map((article) => (
          <li>
            {article.title} {article.author}
          </li>
        ))}
      </ul>
      <AddArticleForm />
    </div>
  );
};

export default Homepage;
