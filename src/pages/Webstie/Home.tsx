import UseFetchArticles from "../../hooks/UseFetchArticles";
import ArticleCard from "./ArticleCard";
import FileUpload from "../CMS/FileUpload";

const Homepage = () => {
  const { articles, error, loading } = UseFetchArticles();

  return (
    <div className="bg-slate-600 w-screen h-screen text-white flex justify-center items-center flex-col">
      <h1 className="text-bold text-5xl absolute top-5">
        I am the homepage of this website
      </h1>
      <div className="max-w-[1440px] border-4 border-black">
        {loading && <p>Loading...</p>}
        {error && <p>Something went wrong!</p>}
        {!loading && !error && (
          <ul className="flex flex-wrap gap-8 justify-center border-2 border-purple-800">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </ul>
        )}
      </div>
      <FileUpload />
    </div>
  );
};

export default Homepage;
