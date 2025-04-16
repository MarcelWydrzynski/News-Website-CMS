import supabase from "../lib/supabase";

type Article = {
  id: number;
  title: string;
  author: string;
  category: string;
  lead: string;
  image: string;
  content: string;
  description: string;
};
const generateRandomID = () => Math.floor(Math.random() * 1_000_000_000);

const uploadArticle = async (article: Article) => {
  const articleWithId = {
    ...article,
    id: generateRandomID(),
  };

  const { data, error } = await supabase.from("ArticlesList").insert([articleWithId]);
  alert("New article has been added. The page will now reload.");
  location.reload();

  if (error) {
    console.error("Upload Error", error.message);
    alert("Failed to upload article: " + error.message);
    return;
  }
};
export default uploadArticle;
