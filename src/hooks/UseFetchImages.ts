import { useState, useEffect } from "react";
import supabase from "../lib/supabase";
import Image from "../types/Image";

const CDNURL = "https://vhdzgbgquqmnfgcynhno.supabase.co/storage/v1/object/public/cmsstorage//";

const UseFetchImages = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getImages = async () => {
    const { data, error } = await supabase.storage.from("cmsstorage").list("");

    if (error) {
      setLoading(false);
      setError(error.message);
      console.log("New error:", error);
      return;
    }

    if (data) {
      const formattedData = data
        .map((file) => {
          const timestampMatch = file.name.match(/^(\d+)_/);
          const timestamp = timestampMatch ? parseInt(timestampMatch[1]) : 0;

          return {
            name: file.name,
            id: file.id,
            url: CDNURL + file.name,
            timestamp,
          };
        })
        .sort((a, b) => b.timestamp - a.timestamp);

      setImages(formattedData);
      setError(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return { images, error, loading };
};

export default UseFetchImages;
