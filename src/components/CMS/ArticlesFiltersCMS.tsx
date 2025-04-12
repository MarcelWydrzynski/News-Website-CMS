import { TextInput, Button, Label } from "flowbite-react";
import { Link } from "react-router";

interface ArticlesFiltersCMSProps {
  selectedIds: number[];
  onDelete: () => void;
}

const ArticlesFiltersCMS = ({ onDelete }: ArticlesFiltersCMSProps) => {
  return (
    <div className="flex flex-wrap gap-y-4 gap-x-4 max-[800px]:justify-center">
      <div>
        <Label className="mb-2 block" htmlFor="img-search">
          Search for article
        </Label>
        <TextInput id="imgname" type="text" className="mr-0 w-sm max-[410px]:w-auto" />
      </div>
      <Link to="/CMS/add-article" className="self-end">
        <Button>Add article</Button>
      </Link>
      <div className="ml-auto max-[800px]:m-0 self-end">
        <Button onClick={onDelete}>Delete selected article/articles</Button>
      </div>
    </div>
  );
};

export default ArticlesFiltersCMS;
