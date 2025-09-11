import { Button } from "flowbite-react";
import { useAuth } from "../../Context/AuthContext";
import deleteAuthors from "../../hooks/UseDeleteAuthors";
import UseFetchArticles from "../../hooks/UseFetchArticles";
import Author from "../../types/Author";

type Props = {
  handleModal: () => void;
  selectedAuthors: Author[];
};

const AuthorsButtonsCMS = ({ handleModal, selectedAuthors }: Props) => {
  const { articles } = UseFetchArticles();
  const { user } = useAuth();

  const handleDelete = () => {
    if (selectedAuthors.length === 0) {
      alert("Please select author/authors to delete");
      return;
    }

    const authorsWithArticles = selectedAuthors.filter((author) => articles.some((article) => article.author === author.name));

    if (authorsWithArticles.length > 0) {
      alert(`Cannot delete author(s) with existing articles: ${authorsWithArticles.map((a) => a.name).join(", ")}`);
      return;
    }
    if (user?.user_metadata.admin === false) {
      alert("Only admins can delete authors");
      return;
    }
    deleteAuthors(selectedAuthors.map((author) => author.id));
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
