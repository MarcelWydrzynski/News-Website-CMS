import { useState } from "react";
import { Card, Checkbox } from "flowbite-react";
import UseFetchAuthors from "../../hooks/UseFetchAuthors";
import AuthorsButtonsCMS from "../../components/CMS/AuthorsButtonsCMS";
import AddCategoryForm from "../../components/CMS/AddCategoryForm";

type Author = {
  id: number;
  name: string;
  created_at: string;
};

const CategoriesCMS = () => {
  const { authors, fetchingAuthorsError, fetchingAuthorsLoading } = UseFetchAuthors();
  const [selectedAuthors, setSelectedAuthors] = useState<number[]>([]);
  const [modal, setModal] = useState(false);

  const handleModal = () => setModal(true);

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>, author: Author) => {
    if (event.target.checked) {
      setSelectedAuthors((prev) => [...prev, author.id]);
    } else {
      setSelectedAuthors((prev) => [...prev.filter((id) => id === author.id)]);
    }
    console.log(selectedAuthors);
    return;
  };

  return (
    <div className="flex gap-y-10 flex-col w-full">
      <AuthorsButtonsCMS handleModal={handleModal} selectedAuthors={selectedAuthors} />
      <AddCategoryForm openModal={modal} setOpenModal={setModal} />
      <div className="flex gap-y-8 gap-x-6 flex-wrap max-[450px]:justify-center">
        {authors.length === 0 ? (
          <p className="text-2xl text-white">No authors stored in database</p>
        ) : (
          authors.map((author) => (
            <Card key={author.id} className="max-w-sm relative hover:scale-105 transition-all p-8">
              <Checkbox className="absolute top-3 left-3 w-6 h-6" onChange={(event) => handleCheckBox(event, author)} />
              <h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{author.name}</h4>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoriesCMS;
