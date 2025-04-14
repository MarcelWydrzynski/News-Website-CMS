import { Button, Modal, ModalBody, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import ErrorCMS from "./ErrorCMS";

type Props = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
};

const AddCategoryForm = ({ openModal, setOpenModal }: Props) => {
  const [newCategory, setNewCategory] = useState<string>("");
  const [error, setError] = useState({
    errorstate: false,
    errorMessage: "",
  });

  console.log(newCategory);

  const validateForm = () => {
    if (newCategory.trim().length === 0) {
      setError({
        errorstate: true,
        errorMessage: "Category input cannot be empty",
      });
    } else {
      alert("Category added!");
      setOpenModal(false);
    }
  };
  return (
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
      <ModalBody className="flex justify-center items-center flex-col gap-4">
        {error.errorstate ? <ErrorCMS errorMessage={error.errorMessage} /> : null}
        <Label htmlFor="categoryName" className="self-start">
          Type in the name of the new category
        </Label>
        <TextInput id="categoryName" type="text" className="w-full" onChange={(e) => setNewCategory(e.target.value)} />
        <Button onClick={validateForm}>Proceed</Button>
      </ModalBody>
    </Modal>
  );
};

export default AddCategoryForm;
