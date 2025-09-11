import supabase from "../lib/supabase";

const deleteArticles = async (articleIds: number[]) => {


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
