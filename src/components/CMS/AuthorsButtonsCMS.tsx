import {  Button, } from "flowbite-react";
import deleteAuthors from "../../hooks/UseDeleteAuthors";

type Props = {
  handleModal: () => void;
  selectedAuthors: number[];
};

const AuthorsButtonsCMS = ({ handleModal, selectedAuthors }: Props) => {
  const handleDelete = () => {
    if (selectedAuthors.length === 0) {
      alert("Please select author/authors to delete");
      return;
    } else {
      deleteAuthors(selectedAuthors);
      return;
    }
  };

  return (
    <div className="flex flex-wrap items-end gap-y-4 gap-x-4 w-full max-[800px]:justify-center">
      <Button className="self-end max-[800px]:m-0" onClick={handleModal}>
        Add author
      </Button>

      <div className="ml-auto max-[800px]:m-0">
        <Button className="self-end max-[800px]:m-0" onClick={handleDelete}>
          Delete selected author/authors
        </Button>
      </div>
    </div>
  );
};

export default AuthorsButtonsCMS;
