import { useState, useEffect } from "react";
import supabase from "../lib/supabase";

interface Image {
  url: string;
  id: string;
}

const CDNURL =
  "https://vhdzgbgquqmnfgcynhno.supabase.co/storage/v1/object/public/cmsstorage//";

const UseFetchArticlesImages = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getImages = async () => {
    setLoading(true);

    const { data, error } = await supabase.storage.from("cmsstorage").list("");

    if (error) {
      console.error("Supabase error:", error);
      setError(true);
      setLoading(false);
      return;
    }

    if (data) {
      const imageData: Image[] = data.map((file) => ({
        url: `${CDNURL}${file.name}`,
        id: file.id,
      }));

      setImages(imageData);
    }

    setLoading(false);
    console.log("Data from Supabase:", data);
  };

  useEffect(() => {
    getImages(); 
  }, []);

  return { images, error, loading };
};

export default UseFetchArticlesImages;
