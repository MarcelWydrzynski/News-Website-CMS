import { useState, useEffect } from "react";
import supabase from "../lib/supabase";
import Article from "../types/ArticleType";

const UseFetchArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchArticles = async () => {
    setLoading(true);

    const { data, error } = await supabase.from("ArticlesList").select("*").order("date_created", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setArticles(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return { articles, error, loading };
};

export default UseFetchArticles;
