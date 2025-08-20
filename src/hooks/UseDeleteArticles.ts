import supabase from "../lib/supabase";

const deleteArticles = async (articleIds: number[]) => {
  if (articleIds.length === 0) {
    alert("Please select article/articles to delete");
    return;
  }

  const {} = await supabase
    .from("ArticlesList") //
    .delete()
    .in("id", articleIds);

  alert("The article/articles has been deleted, the page will now reload");
  location.reload();

  return {
    deleteArticles,
  };
};

export default deleteArticles;
