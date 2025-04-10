import supabase from "../lib/supabase";
import { v4 as uuidv4 } from "uuid";

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
const uploadArticle = async (article: Article) => {
  if (!article) {
    return;
  }

  const articleWithId = { ...article, id: uuidv4() };
  const { data, error } = await supabase.from("ArticlesList").insert([articleWithId]);

  if (error) {
    alert(error.message);
  }
};
export default uploadArticle;
