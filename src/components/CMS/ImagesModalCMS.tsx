import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Card, Checkbox } from "flowbite-react";
import UseFetchImages from "../../hooks/UseFetchImages";
import LoaderCMS from "./LoaderCMS";
import ErrorCMS from "./ErrorCMS";
import type { ChangeEvent } from "react";

type Image = {
  id: string;
  url: string;
  name: string;
};

type ImagesModalCMSProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleCheckboxChecked: (event: ChangeEvent<HTMLInputElement>, image: Image) => void;
  selectedImage: Image | null;
  setNewArticle: React.Dispatch<React.SetStateAction<any>>;
};

const ImagesModalCMS: React.FC<ImagesModalCMSProps> = ({ openModal, setOpenModal, handleCheckboxChecked, selectedImage, setNewArticle }) => {
  const { images, fetchingImagesError, fetchingImagesLoading } = UseFetchImages();

  const handleProceed = () => {
    if (selectedImage) {
      setNewArticle((prev: object) => ({ ...prev, image: selectedImage.url }));
      setOpenModal(false);
    } else {
      alert("Please select a image to proceed with");
      return;
    }
  };

  return (
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} size="7xl">
      <ModalHeader>Select a image for you article and hit proceed</ModalHeader>
      <ModalBody className="flex justify-center items-center">
        {fetchingImagesLoading ? <LoaderCMS /> : null}
        {fetchingImagesError ? <ErrorCMS errorMessage={fetchingImagesError} /> : null}
        <div className="flex gap-y-8 gap-x-6 flex-wrap">
          {images.length === 0 ? (
            <p className="text-2xl text-white">No images stored in database</p>
          ) : (
            images.map((image) => (
              <Card key={image.id} className="max-w-sm relative hover:scale-105 transition-all" imgSrc={image.url} imgAlt={image.name}>
                <Checkbox
                  className="absolute top-3 left-3 w-6 h-6"
                  checked={selectedImage?.id === image.id}
                  onChange={(e) => handleCheckboxChecked(e, image)}
                />
                <p className="font-normal text-gray-700 dark:text-gray-400">{image.name}</p>
              </Card>
            ))
          )}
        </div>
      </ModalBody>
      <ModalFooter className="flex justify-end">
        <Button onClick={handleProceed}>Proceed</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ImagesModalCMS;
