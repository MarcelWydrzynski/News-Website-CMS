import { Button, Modal, ModalBody, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import ErrorCMS from "../ErrorCMS.tsx";
import uploadAuthor from "../../hooks/UseUploadAuthors.ts";

type Props = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
};

const AddAuthorForm = ({ openModal, setOpenModal }: Props) => {
  const [newAuthor, setNewAuthor] = useState<string>("");
  const [error, setError] = useState({
    errorstate: false,
    errorMessage: "",
  });

  const validateForm = () => {
    if (newAuthor.trim().length === 0) {
      setError({
        errorstate: true,
        errorMessage: "Author input cannot be empty",
      });
    } else {
      const newAuthorObj = {
        name: newAuthor,
        id: 0,
        created_at: new Date(),
      };
      uploadAuthor(newAuthorObj);
    }
  };
  return (
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
      <ModalBody className="flex justify-center items-center flex-col gap-4">
        {error.errorstate ? <ErrorCMS errorMessage={error.errorMessage} /> : null}
        <Label htmlFor="categoryName" className="self-start">
          Type in the name of the new category
        </Label>
        <TextInput id="categoryName" type="text" className="w-full" onChange={(e) => setNewAuthor(e.target.value)} />
        <Button onClick={validateForm}>Proceed</Button>
      </ModalBody>
    </Modal>
  );
};

export default AddAuthorForm;
