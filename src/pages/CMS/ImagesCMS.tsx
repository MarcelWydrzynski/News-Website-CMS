import { useState, ChangeEvent } from "react";
import { Button, Card, Checkbox } from "flowbite-react";
import UseFetchImages from "../../hooks/UseFetchImages";
import ErrorCMS from "../../components/ErrorCMS";
import LoaderCMS from "../../components/CMS/LoaderCMS";
import ImagesFiltersCMS from "../../components/CMS/ImagesFiltersCMS";
import ImageModalCMS from "../../components/CMS/ImageModalCMS";
import Image from "../../types/image";

const ImagesCMS = () => {
  const [selectedImages, setSelectedImages] = useState<Image[]>([]);
  const { images, fetchingImagesError, fetchingImagesLoading } = UseFetchImages();
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, image: Image) => {
    if (event.target.checked) {
      setSelectedImages((prev) => [...prev, image]);
    } else {
      setSelectedImages((prev) => prev.filter((img) => img.id !== image.id));
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleModal = (image: Image) => {
    setSelectedImage(image);
    setOpenModal(true);
  };

  const filteredImages = searchQuery.trim().length === 0 ? images : images.filter((image) => image.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <div className="flex flex-col gap-y-10 w-full ">
        <ImagesFiltersCMS selectedImages={selectedImages} onSearch={handleSearch} />

        {openModal ? <ImageModalCMS selectedImage={selectedImage} setOpenModal={setOpenModal} /> : null}

        {fetchingImagesLoading && <LoaderCMS textDark={false} />}
        {fetchingImagesError && <ErrorCMS errorMessage={fetchingImagesError} />}

        <div className="flex flex-wrap gap-y-8 gap-x-6 justify-center items-stretch">
          {filteredImages.length === 0 && fetchingImagesLoading === false ? (
            <p className="text-2xl text-white">No images stored in database</p>
          ) : (
            filteredImages.map((image) => (
              <Card key={image.id} className="max-w-sm relative hover:scale-105 transition-all" imgSrc={image.url} imgAlt={image.name}>
                <Checkbox className="absolute top-3 left-3 w-6 h-6" onChange={(e) => handleCheckboxChange(e, image)} />
                <h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{image.name}</h4>
                <Button className="w-fit self-end mt-auto" onClick={() => handleModal(image)}>
                  Show Image
                </Button>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ImagesCMS;
