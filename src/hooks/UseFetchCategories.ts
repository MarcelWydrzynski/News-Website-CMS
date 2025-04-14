import { useState, useEffect } from "react";
import supabase from "../lib/supabase";

type Category = {
  id: number;
  name: string;
  created_at: string;
};

const UseFetchCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [fetchingCategoriesError, setFetchingCategoriesError] = useState<string | null>(null);
  const [fetchingCategoriesLoading, setFetchingCategoriesLoading] = useState<boolean>(true);

  const fetchCategories = async () => {
    setFetchingCategoriesLoading(true);

    const { data, error } = await supabase.from("categories").select("*");

    if (error) {
      setFetchingCategoriesError(error.message);
      return;
    } else {
      setCategories(data);
    }

    setFetchingCategoriesLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, fetchingCategoriesError, fetchingCategoriesLoading };
};

export default UseFetchCategories;
