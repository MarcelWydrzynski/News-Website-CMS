import supabase from "../lib/supabase";
import Article from "../types/Article";

const generateRandomID = () => Math.floor(Math.random() * 1_000_000_000);

const uploadArticle = async (article: Article, navigate: Function) => {
  const articleWithIdplusDate = {
    ...article,
    id: generateRandomID(),
    date_created: new Date().toISOString(),
  };

  const { error } = await supabase.from("ArticlesList").insert([articleWithIdplusDate]);

  if (error) {
    console.error("Upload Error", error.message);
    alert("Failed to upload article: " + error.message);
    return;
  }

  alert("The article has been uploaded. You will now be taken to the articles page :)");
  navigate("/cms");
};

export default uploadArticle;
