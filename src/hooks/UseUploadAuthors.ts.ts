import supabase from "../lib/supabase";

type Author = {
  id: number;
  created_at: Date;
  name: string;
};
const generateRandomID = () => Math.floor(Math.random() * 1_000_000_000);

const uploadAuthor = async (author: Author) => {
  const authorWithId = {
    ...author,
    id: generateRandomID(),
    created_at: new Date(),
  };
  const { data, error } = await supabase.from("authors").insert([authorWithId]);
  alert("New author has been added the page will now reload");
  location.reload();

  if (error) {
    console.error("Upload Error", error.message);
    alert("Failed to upload article: " + error.message);
    return;
  }
};
export default uploadAuthor;
