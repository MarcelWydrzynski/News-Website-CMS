import {
  Button,
  select,
  Label,
  TextInput,
  Textarea,
  Select,
} from "flowbite-react";

const AddArticleForm = () => {
  return (
    <form className="flex w-4/5 flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="articleTitle">Title</Label>
        </div>
        <TextInput id="articleTitle" type="text" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1">author</Label>
        </div>
        <TextInput id="articleAuthor" type="text" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="articleDescription">description</Label>
        </div>
        <TextInput id="articleDescription" type="text" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="articleLead">lead</Label>
        </div>
        <Textarea id="articleLead" rows={10} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="articleContent">Content</Label>
        </div>
        <Textarea id="articleContent" rows={20} />
      </div>
      <div className="flex gap-4 justify-end">
        <Button className="self-end">Select Image</Button>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="articleAuthor">Select your Author</Label>
          </div>
          <Select id="authors" required>
            <option>United States</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </Select>
        </div>
      </div>
      <Button className="w-fit self-end">Submit</Button>
    </form>
  );
};

export default AddArticleForm;
