import { useState } from "react";
import { Button, Card, Checkbox } from "flowbite-react";
import UseFetchImages from "../../hooks/UseFetchImages";
import ErrorCMS from "../../components/CMS/ErrorCMS";
import LoaderCMS from "./LoaderCMS";
import ImagesFiltersCMS from "./ImagesFiltersCMS";
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
      <div className="flex gap-4 flex-col w-full">
        {fetchingImagesLoading ? <LoaderCMS /> : null}
        {fetchingImagesError ? (
          <ErrorCMS errorMessage={fetchingImagesError} />
        ) : null}
        <ImagesFiltersCMS selectedImages={selectedImages} />
        <div className="flex gap-y-8 gap-x-6 flex-wrap">
          {images.map((image) => (
            <Card
              className="max-w-lg relative"
              imgSrc={image.url}
              imgAlt={image.name}
            >
              <Checkbox
                className="absolute top-3 left-3"
                onChange={(e) => handleCheckboxChange(e, image)}
              />
              <Button className="w-fit">Show Image</Button>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImagesCMS;
