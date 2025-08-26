import { Button, Label, TextInput, Textarea, Select } from "flowbite-react";
import UseFetchAuthors from "../../hooks/UseFetchAuthors";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import ArticleType from "../../types/ArticleType";
import RichTextEditor from "../CMS/RichTextEditor";
import ImagesModalCMS from "../CMS/ImagesModalCMS";
import { useState } from "react";
import useUpdateArticle from "../../hooks/UseUpdateArticle";

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
  const [openModal, setOpenModal] = useState(false);

  const { updateArticle, loading, error } = useUpdateArticle();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      title: article.title,
      description: article.description,
      lead: article.lead,
      category: article.category,
      author: article.author,
      content: article.content,
      image: article.image,
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const updatedArticle = { ...data, id: article.id };
    await updateArticle(updatedArticle);
  };

  console.log(article.author);
  return (
    <>
      <form className="flex w-4/5 flex-col gap-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <div>
          <Label htmlFor="articleTitle">Title</Label>
          <TextInput
            id="articleTitle"
            type="text"
            {...register("title", {
              required: "Title is required",
              minLength: { value: 30, message: "Must be at least 30 characters" },
              maxLength: { value: 70, message: "Cannot exceed 70 characters" },
            })}
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="articleDescription">Description</Label>
          <TextInput
            id="articleDescription"
            type="text"
            {...register("description", {
              required: "Description is required",
              minLength: { value: 150, message: "Description must be at least 150 characters" },
            })}
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        {/* Lead */}
        <div>
          <Label htmlFor="articleLead">Lead</Label>
          <Textarea
            id="articleLead"
            rows={4}
            {...register("lead", {
              required: "Lead is required",
              maxLength: { value: 300, message: "Lead cannot be longer then 300 characters" },
               minLength: { value: 100, message: "Lead must be at least 100 characters" },
            })}
          />
          {errors.lead && <p className="text-red-500">{errors.lead.message}</p>}
        </div>

        {/* Content */}
        <div>
          <Label htmlFor="articleContent">Content</Label>
          <Controller
            control={control}
            name="content"
            rules={{
              required: "Content is required",
              validate: (val) => {
                const plain = val.replace(/<[^>]+>/g, "").trim();
                if (!plain) return "Content cannot be empty";
                if (plain.length > 3000) return "Max 3000 characters";
                return true;
              },
            }}
            render={({ field }) => <RichTextEditor value={field.value} onChange={field.onChange} />}
          />
          {errors.content && <p className="text-red-500">{errors.content.message}</p>}
        </div>

        {/* Category */}
        <div className="flex gap-4 justify-end flex-wrap max-[800px]:justify-center">
          <div className="max-w-md">
            <Label htmlFor="categories">Select Category</Label>
            <Select id="categories" {...register("category", { required: "Category is required" })}>
              <option value="">Select category</option>
              <option value="Tech">Tech</option>
              <option value="Politics">Politics</option>
              <option value="Business">Business</option>
              <option value="Sports">Sports</option>
              <option value="Crypto">Crypto</option>
            </Select>
            {errors.category && <p className="text-red-500">{errors.category.message}</p>}
          </div>

          {/* Author*/}
          <div className="max-w-md">
            <Label htmlFor="authors">Select Author</Label>
            <Select id="authors" {...register("author", { required: "Author is required" })}>
              <option> {article.author}</option>
              {authors.map((author) => (
                <option key={author.name} value={author.name}>
                  {author.name}
                </option>
              ))}
            </Select>
            {errors.author && <p className="text-red-500">{errors.author.message}</p>}
          </div>

          {/* Image */}
          <div className="max-w-md">
            \<Label htmlFor="authors">Select Author</Label>
            <Button type="button" onClick={() => setOpenModal(true)} className="self-end">
              {watch("image") ? watch("image").split("/").pop() : "Select Image"}
            </Button>
          </div>
        </div>

        {/* Errors */}
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
        {error && <p className="text-red-500">{error}</p>}

        <Button disabled={loading} type="submit" className="cursor-pointer select-none w-fit self-end max-[800px]:self-center">
          {loading ? "Updating..." : "Update article"}
        </Button>
      </form>

      {/* Images Modal */}
      <Controller
        control={control}
        name="image"
        rules={{ required: "Image is required" }}
        render={({ field }) => <ImagesModalCMS openModal={openModal} setOpenModal={setOpenModal} value={field.value} onChange={field.onChange} />}
      />
    </>
  );
};

export default EditArticleForm;
