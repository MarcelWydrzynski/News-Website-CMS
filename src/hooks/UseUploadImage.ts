import { ChangeEvent, useState } from "react";
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

  if (error) {
    console.error("Upload Error", error.message);
    alert("Failed to upload image");
    return;
  }

};

export default uploadImage;
