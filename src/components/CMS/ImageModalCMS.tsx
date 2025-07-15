import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import Image from "../../types/image";

type ImageModalCMSProps = {
  selectedImage: Image | null;
  setOpenModal: (open: boolean) => void;
};

const ImageModalCMS = ({ selectedImage, setOpenModal }: ImageModalCMSProps) => {
  return (
    <Modal show={true} dismissible size="7xl" onClose={() => setOpenModal(false)} popup>
      <ModalHeader />
      <ModalBody>
        <div className="flex flex-col gap-4 flex-grow items-center">
          <img src={selectedImage?.url} alt={selectedImage?.name} id={selectedImage?.id} />
          <p className="text-lg text-gray-700 dark:text-gray-200">{selectedImage?.name}</p>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ImageModalCMS;
