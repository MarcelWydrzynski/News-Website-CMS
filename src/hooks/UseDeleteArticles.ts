import supabase from "../lib/supabase";

export function useDeleteArticles() {
  const deleteArticles = async (articleIds: number[]) => {
    if (articleIds.length === 0) {
      alert("Please select article/articles to delete");
      return;
    }

    const { data, error } = await supabase.from("ArticlesList").delete().in("id", articleIds);
    alert("The image/images have been deleted. The page will no reload.");
    location.reload();

    if (error) {
      console.error("Delete error:", error);
    }

    return data;
  };

  return {
    deleteArticles,
  };
}
