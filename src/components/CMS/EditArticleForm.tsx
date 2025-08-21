import { Button, Label, TextInput, Textarea, Select } from "flowbite-react";
import UseFetchAuthors from "../../hooks/UseFetchAuthors";
import { SubmitHandler, useForm } from "react-hook-form";
import ArticleType from "../../types/ArticleType";

type FormFields = {
  title: string;
  description: string;
  lead: string;
  category: string;
  author: string;
  content: string;
  image: string;
};

type EditArticleFormProps = {
  article: ArticleType;
};

const EditArticleForm = ({ article }: EditArticleFormProps) => {
  const { authors } = UseFetchAuthors();

  const { register } = useForm<FormFields>()
  
  const onSubmit: SubmitHandler<FormFields> = (data) => {

    console.log(data);
  }

  return (
    <>
      <form className="flex w-4/5 flex-col gap-4 mx-auto" >
        <div>
          <Label htmlFor="articleTitle">Title</Label>
          <TextInput {...register("title")} id="articleTitle" type="text" />
        </div>

        <div>
          <Label htmlFor="articleDescription">Description</Label>
          <TextInput {...register("description")} id="articleDescription" type="text" />
        </div>

        <div>
          <Label htmlFor="articleLead">Lead</Label>
          <Textarea {...register("lead")}  id="articleLead" rows={4} />
        </div>

        <div className="flex gap-4 justify-end flex-wrap max-[800px]:justify-center">
          <div className="max-w-md">
            <Label htmlFor="categories">Select your Category</Label>
            <Select {...register("category")}  id="categories">
              <option value="" disabled>
                Select category
              </option>
              <option value="Tech">Tech</option>
              <option value="Politics">Politics</option>
              <option value="Business">Business</option>
              <option value="Sports">Sports</option>
              <option value="Crypto">Crypto</option>
            </Select>
          </div>

          <div className="max-w-md">
            <Label htmlFor="authors">Select your Author</Label>
            <Select {...register("author")} id="authors">
              <option value="" disabled>
                Select Author
              </option>
              {authors.map((author) => (
                <option key={author.name} value={author.name}>
                  {author.name}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <Button type="submit" className="w-fit self-end max-[800px]:self-center">
          Update article
        </Button>
      </form>
    </>
  );
};

export default EditArticleForm;
