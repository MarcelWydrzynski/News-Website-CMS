import { Button, Modal, ModalBody, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import Error from "../Error.tsx";
import uploadAuthor from "../../hooks/UseUploadAuthors.ts";

type Props = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
};

const AddAuthorForm = ({ openModal, setOpenModal }: Props) => {
  const [input, setNewInput] = useState<string>("");
  const [error, setError] = useState({
    errorstate: false,
    errorMessage: "",
  });

  const validateForm = () => {
    if (input.trim().length === 0) {
      setError({
        errorstate: true,
        errorMessage: "Author input cannot be empty",
      });
    } else {
      uploadAuthor(input);
    }
  };
  return (
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
      <ModalBody className="flex justify-center items-center flex-col gap-4">
        {error.errorstate ? <Error errorMessage={error.errorMessage} /> : null}
        <Label htmlFor="categoryName" className="self-start">
          Type in the name of the new category
        </Label>
        <TextInput id="categoryName" type="text" className="w-full " onChange={(e) => setNewInput(e.target.value)} />
        <Button onClick={validateForm} className="cursor-pointer">
          Proceed
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default AddAuthorForm;
