import { useState, useEffect } from "react";
import supabase from "../lib/supabase";

interface Article {
  id: number;
  author: string;
  category: string;
  title: string;
  short_title: string;
  short_description: string;
  lead: string;
  image: string;
  content: string;
}

const UseFetchArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchArticles = async () => {
    setLoading(true);

    let { data, error } = await supabase.from("ArticlesList").select("*");

    if (error) {
      setError(true);
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
