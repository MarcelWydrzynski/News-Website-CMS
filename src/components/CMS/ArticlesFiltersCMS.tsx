import { TextInput, Button, Label } from "flowbite-react";
import { Link } from "react-router";
import { useAuth } from "../../Context/AuthContext";

type ArticlesFiltersCMSProps = {
  selectedArticles: number[];
  onSearch: (query: string) => void;
  onDelete: () => void;
};

const ArticlesFiltersCMS = ({ selectedArticles, onSearch, onDelete }: ArticlesFiltersCMSProps) => {
  const { user } = useAuth();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const handleDelete = () => {
    if (user?.user_metadata.admin === false) {
      alert("Only admins can delete articles.");
      return;
    }
    onDelete();
  };

  return (
    <div className="flex flex-wrap gap-y-4 gap-x-4">
      <div>
        <Label className="mb-2 block" htmlFor="search-title">
          Search for article by title
        </Label>
        <TextInput id="search-title" type="text" className="mr-0 w-sm max-[410px]:w-auto" onChange={handleSearchChange} placeholder="Type title..." />
      </div>
      <Link to={"add-article"} className="self-end">
        <Button>Add article</Button>
      </Link>
      <div className="ml-auto max-[800px]:m-0 self-end">
        <Button onClick={() => handleDelete()} disabled={selectedArticles.length === 0}>
          Delete selected article/articles
        </Button>
      </div>
    </div>
  );
};

export default ArticlesFiltersCMS;
