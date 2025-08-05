import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- import useNavigate
import supabase from "../lib/supabase";
import Article from "../types/article";

const useUpdateArticle = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const updateArticle = async (updatedArticle: Article) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const { error } = await supabase
      .from("ArticlesList")
      .update({
        title: updatedArticle.title,
        author: updatedArticle.author,
        category: updatedArticle.category,
        lead: updatedArticle.lead,
        image: updatedArticle.image,
        content: updatedArticle.content,
        description: updatedArticle.description,
      })
      .eq("id", updatedArticle.id);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      alert("The article has been updated. You will now be taken to the articles page :)");
      navigate("/cms"); 
    }

    setLoading(false);
  };

  return { updateArticle, loading, error, success };
};

export default useUpdateArticle;
