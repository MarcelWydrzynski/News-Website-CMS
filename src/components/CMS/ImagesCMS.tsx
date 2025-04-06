import { Button, Card } from "flowbite-react";
import UseFetchImages from "../../hooks/UseFetchImages";
import ErrorCMS from "../../components/CMS/ErrorCMS";
import LoaderCMS from "./LoaderCMS";
import ImagesFiltersCMS from "./ImagesFiltersCMS";

const ImagesCMS = () => {
  const { images, fetchingImagesError, fetchingImagesLoading } =
    UseFetchImages();

  return (
    <>
      <div className="flex gap-4 flex-col w-full">
        {fetchingImagesLoading ? <LoaderCMS /> : null}
        {fetchingImagesError ? (
          <ErrorCMS errorMessage={fetchingImagesError} />
        ) : null}
        <ImagesFiltersCMS />
        <div className="flex gap-y-8 gap-x-6 flex-wrap">
          {images.map((image) => (
            <Card className="max-w-lg" imgSrc={image.url} imgAlt={image.name}>
              <Button className="w-fit">Show Image</Button>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImagesCMS;
