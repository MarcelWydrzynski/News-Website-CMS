import { useState, useEffect } from "react";
import supabase from "../lib/supabase";

type Author = {
  id: number;
  name: string;
  created_at: string;
};

const UseFetchAuthors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [fetchingAuthorsError, setFetchingAuthorsError] = useState<string | null>(null);
  const [fetchingAuthorsLoading, setFetchingAuthorsLoading] = useState<boolean>(true);

  const fetchAuthors = async () => {
    setFetchingAuthorsLoading(true);

    const { data, error } = await supabase.from("authors").select("*");

    if (error) {
      setFetchingAuthorsError(error.message);
      return;
    } else {
      setAuthors(data.reverse());
    }

    setFetchingAuthorsLoading(false);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return { authors, fetchingAuthorsError, fetchingAuthorsLoading };
};

export default UseFetchAuthors;
