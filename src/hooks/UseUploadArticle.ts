// hooks/useUploadArticle.ts
import supabase from "../lib/supabase";
import Article from "../types/ArticleType";

const generateRandomID = () => Math.floor(Math.random() * 1_000_000_000);

const useUploadArticle = () => {
  const uploadArticle = async (article: Article) => {
    const articleWithIdplusDate = {
      ...article,
      id: generateRandomID(),
      date_created: new Date().toISOString(),
    };

    const { error } = await supabase.from("ArticlesList").insert([articleWithIdplusDate]);

    if (error) {
      console.error("Upload Error", error.message);
      throw new Error("Failed to upload article: " + error.message);
    }

    return true;
  };

  return { uploadArticle };
};

export default useUploadArticle;
