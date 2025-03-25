import { useState } from "react";
import supabase from "../lib/supabase";

const useAddArticle = () => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const addArticle = async (article: {
    title: string;
    author: string;
    category: string;
    short_title: string;
    short_description: string;
    lead: string;
    image: string;
    content: string;
  }): Promise<boolean> => {
    setLoading(true);
    setError(false);

    const { error } = await supabase.from("ArticlesList").insert([article]);

    if (error) {
      setError(true);
      setLoading(false);
      return false;
    }

    setLoading(false);
    return true;
  };

  return { addArticle, error, loading };
};

export default useAddArticle;
