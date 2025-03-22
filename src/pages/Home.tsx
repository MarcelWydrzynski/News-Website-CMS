import UseFetchArticles from "../hooks/UseFetchArticles";

const Homepage = () => {
  const { articles, error, loading } = UseFetchArticles();
  console.log(articles, error, loading);
  return (
    <div>
      <h1 className="font-sans">hello, i am the homepage</h1>
      <ul>
        {articles.map((article) => (
          <li>
            {article.title} {article.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
