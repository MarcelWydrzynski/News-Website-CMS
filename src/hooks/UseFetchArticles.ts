import { useState, useEffect } from "react";
import supabase from "../lib/supabase";
import Article from "../types/article";

const UseFetchArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [fetchingArticlesError, setFetchingArticlesError] = useState<string>("");
  const [fetchingArticlesLoading, setFetchingArticlesLoading] = useState<boolean>(false);

  const fetchArticles = async () => {
    setFetchingArticlesLoading(true);

    const { data, error } = await supabase.from("ArticlesList").select("*").order("date_created", { ascending: false });

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
