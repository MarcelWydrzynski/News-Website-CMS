import { useState, useEffect } from "react";
import supabase from "../lib/supabase";

type Image = {
  name: string;
  id: string;
  url: string;
};

const CDNURL = "https://vhdzgbgquqmnfgcynhno.supabase.co/storage/v1/object/public/cmsstorage//";

const UseFetchImages = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [fetchingImagesLoading, setFetchingImagesLoading] = useState<boolean>(true);
  const [fetchingImagesError, setFetchingImagesError] = useState<string | null>(null);

  const getImages = async () => {
    const { data, error } = await supabase.storage.from("cmsstorage").list("");

    if (error) {
      setFetchingImagesLoading(false);
      setFetchingImagesError(error.message);
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
      setFetchingImagesError(null);
      setFetchingImagesLoading(false);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return { images, fetchingImagesError, fetchingImagesLoading };
};

export default UseFetchImages;
