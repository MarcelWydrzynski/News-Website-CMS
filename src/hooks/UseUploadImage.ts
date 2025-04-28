import supabase from "../lib/supabase";

const uploadImage = async (file: File) => {
  if (!file) {
    alert("Please select a file to upload");
    return;
  }

  const image = new Image();
  image.src = URL.createObjectURL(file);

  image.onload = async () => {
    const isCorrectSize = image.width === 1920 && image.height === 1080;

    if (!isCorrectSize) {
      alert("The image must be exactly 1920x1080 pixels.");
      return;
    }

    const fileName = `${Date.now()}_${file.name}`;

    const { error } = await supabase.storage.from("cmsstorage").upload(fileName, file);

    if (error) {
      console.error("Upload Error", error.message);
      alert("Failed to upload image");
      return;
    }

    alert("The image has been uploaded. The page will now reload.");
    location.reload();
  };
};

export default uploadImage;
