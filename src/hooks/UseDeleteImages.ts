import supabase from "../lib/supabase";

const DeleteImages = async (images: string[]) => {
  if (!images || images.length === 0) {
    alert("Please select image/images to be deleted.");
    return;
  }

  const { data, error } = await supabase.storage
    .from("cmsstorage")
    .remove(images);

  alert("The image/images have been deleted. The page will no reload.");
  location.reload();

  if (error) {
    console.error("Delete Error", error.message);
    return;
  }

  console.log("Delete successful", data);
};

export default DeleteImages;
