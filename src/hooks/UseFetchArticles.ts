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
}

const UseFetchArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [fetchingArticlesError, setFetchingArticlesError] = useState<
    string | null
  >(null);
  const [fetchingArticlesLoading, setFetchingArticlesLoading] =
    useState<boolean>(true);

  const fetchArticles = async () => {
    setFetchingArticlesLoading(true);

    let { data, error } = await supabase.from("ArticlesList").select("*");

    if (error) {
      setFetchingArticlesError(error.message);
    } else {
      setArticles(data || []);
    }
    setFetchingArticlesLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return { articles, fetchingArticlesError, fetchingArticlesLoading };
};

export default UseFetchArticles;
