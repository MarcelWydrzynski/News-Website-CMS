import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Card } from "flowbite-react";
import UseFetchImages from "../../hooks/UseFetchImages";
import LoaderCMS from "../Loader";
import ErrorCMS from "../Error";
import Image from "../../types/Image";

type ImagesModalCMSProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  value: string; // current selected image url
  onChange: (url: string) => void; // pass back to RHF
};

const ImagesModalCMS: React.FC<ImagesModalCMSProps> = ({ openModal, setOpenModal, value, onChange }) => {
  const { images, error, loading } = UseFetchImages();

  const handleProceed = () => {
    if (!value) {
      alert("Please select an image to proceed");
      return;
    }
    setOpenModal(false);
  };

  return (
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} size="7xl">
      <ModalHeader>Select an image for your article and hit proceed</ModalHeader>
      <ModalBody>
        {loading && <LoaderCMS textDark={false} />}
        {error && <ErrorCMS errorMessage={error} />}

        <div className="flex flex-wrap gap-x-4 gap-y-6 justify-center items-center">
          {images.length === 0 ? (
            <p className="text-2xl text-white">No images stored in database</p>
          ) : (
            images.map((image: Image) => (
              <Card
                key={image.id}
                className={`max-w-sm relative hover:scale-105 transition-all cursor-pointer 
                  ${value === image.url ? "ring-4 ring-blue-500" : ""}`}
                imgSrc={image.url}
                imgAlt={image.name}
                onClick={() => onChange(image.url)}
              >
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
