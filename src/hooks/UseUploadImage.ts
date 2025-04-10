import supabase from "../lib/supabase";

const uploadImage = async (file: File) => {
  if (!file) {
    alert("Please select a file to upload");
    return;
  }

  const fileName = `${Date.now()}_${file.name}`;

  const { data, error } = await supabase.storage
    .from("cmsstorage")
    .upload(fileName, file);
    alert("The image has been uploaded. The page will no reload.");
    location.reload();

  if (error) {
    console.error("Upload Error", error.message);
    alert("Failed to upload image");
    return;
  }
};

export default uploadImage;
