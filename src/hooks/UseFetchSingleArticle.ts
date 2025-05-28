import { useState, useEffect } from "react";
import supabase from "../lib/supabase";

interface Article {
  id: number;
  author: string;
  category: string;
  title: string;
  description: string;
  lead: string;
  image: string;
  content: string;
  date_created: string;
}

const UseFetchSingleArticle = (id: number) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchArticle = async () => {
    setLoading(true);

    const { data, error } = await supabase.from("ArticlesList").select("*").eq("id", id).single();

    if (error) {
      setError(error.message);
    } else {
      setArticle(data || null);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  return { article, error, loading };
};

export default UseFetchSingleArticle;
