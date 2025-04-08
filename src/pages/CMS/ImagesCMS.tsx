import { useState } from "react";
import { Button, Card, Checkbox } from "flowbite-react";
import UseFetchImages from "../../hooks/UseFetchImages";
import ErrorCMS from "../../components/CMS/ErrorCMS";
import LoaderCMS from "../../components/CMS/LoaderCMS";
import ImagesFiltersCMS from "../../components/CMS/ImagesFiltersCMS";
import { ChangeEvent } from "react";

type Image = {
  id: string;
  url: string;
  name: string;
};

const ImagesCMS = () => {
  const [selectedImages, setSelectedImages] = useState<Image[]>([]);
  const { images, fetchingImagesError, fetchingImagesLoading } =
    UseFetchImages();

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    image: Image
  ) => {
    if (event.target.checked) {
      setSelectedImages((prev) => [...prev, image]);
    } else {
      setSelectedImages((prev) => prev.filter((img) => img.id !== image.id));
    }
  };

  return (
    <>
      <div className="flex gap-y-10 flex-col w-full">
        <ImagesFiltersCMS selectedImages={selectedImages} />

        {fetchingImagesLoading ? <LoaderCMS /> : null}
        {fetchingImagesError ? (
          <ErrorCMS errorMessage={fetchingImagesError} />
        ) : null}
        <div className="flex gap-y-8 gap-x-6 flex-wrap">
          {images.length === 0 ? (
            <p className="text-2xl text-white">No images stored in database</p>
          ) : (
            images.map((image) => (
              <Card
                className="max-w-sm relative hover:scale-105 transition-all" 
                imgSrc={image.url}
                imgAlt={image.name}
              >
                <Checkbox
                  className="absolute top-3 left-3 w-6 h-6"
                  onChange={(e) => handleCheckboxChange(e, image)}
                />
                <Button className="w-fit">Show Image</Button>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ImagesCMS;
