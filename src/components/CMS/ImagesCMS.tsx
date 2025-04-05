import { Button, Card } from "flowbite-react";
import UseFetchImages from "../../hooks/UseFetchImages";
import ErrorCMS from "../../components/CMS/ErrorCMS";
import LoaderCMS from "./LoaderCMS";

const ImagesCMS = () => {
  const { images, fetchingImagesError, fetchingImagesLoading } =
    UseFetchImages();

  if (fetchingImagesLoading) {
    return <LoaderCMS />;
  }

  if (fetchingImagesError) {
    return <ErrorCMS errorMessage={fetchingImagesError} />;
  }

  return (
    <div className="flex gap-8 flex-wrap justify-center items-center">
      {images.map((image) => (
        <Card className="max-w-lg" imgSrc={image.url} imgAlt={image.name}>
          <Button className="w-fit">Show Image</Button>
        </Card>
      ))}
    </div>
  );
};

export default ImagesCMS;
