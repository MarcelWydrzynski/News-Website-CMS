import { TextInput, Button, FileInput, Label } from "flowbite-react";

type Props = {
  handleModal: () => void;
};

const CategoryButtonsCMS = ({ handleModal }: Props) => {
  return (
    <div className="flex flex-wrap items-end gap-y-4 gap-x-4 w-full max-[800px]:justify-center">
      <Button className="self-end max-[800px]:m-0" onClick={handleModal}>
        Add category
      </Button>

      <div className="ml-auto max-[800px]:m-0">
        <Button className="self-end max-[800px]:m-0">Delete selected Category/Categories</Button>
      </div>
    </div>
  );
};

export default CategoryButtonsCMS;
