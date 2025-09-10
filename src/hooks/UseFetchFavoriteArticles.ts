import { useEffect, useState } from "react";
import ArticleType from "../types/ArticleType";
import supabase from "../lib/supabase";

const useFetchFavoriteArticles = (ids: number[]) => {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ids || ids.length === 0) {
      setArticles([]);
      setLoading(false);
      return; 
    }

    const fetchArticles = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("ArticlesList").select("*").in("id", ids);

      if (error) {
        setError(error.message);
        setArticles([]);
      } else {
        setArticles(data || []);
      }
      setLoading(false);
    };

    fetchArticles();
  }, [ids]);

  return { articles, loading, error };
};

export default useFetchFavoriteArticles;
