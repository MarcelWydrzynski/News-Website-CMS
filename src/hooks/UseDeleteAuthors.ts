import supabase from "../lib/supabase";

const deleteAuthors = async (authorIDs: number[]) => {
  const { error } = await supabase.from("authors").delete().in("id", authorIDs);

  if (error) {
    console.log(error.message);
  }

  alert("The author/authors have been deleted. The page will now reload.");
  location.reload();

  return {
    deleteAuthors,
    error,
  };
};

export default deleteAuthors;
