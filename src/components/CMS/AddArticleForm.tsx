import { useState } from "react";
import { Button, Label, TextInput, Textarea, Select } from "flowbite-react";
import { useNavigate } from "react-router";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import RichTextEditor from "./RichTextEditor";
import useUploadArticle from "../../hooks/UseUploadArticle";
import ImagesModalCMS from "./ImagesModalCMS";
import UseFetchAuthors from "../../hooks/UseFetchAuthors";

type FormFiels = {
  id: number;
  title: string;
  description: string;
  lead: string;
  category: string;
  author: string;
  content: string;
  image: string;
};
const AddArticleForm = () => {
  const navigate = useNavigate();
  const { uploadArticle } = useUploadArticle();
  const { user } = useAuth();

  const { authors } = UseFetchAuthors();
  const [openModal, setOpenModal] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormFiels>({});

  const onSubmit: SubmitHandler<FormFiels> = async (data) => {
    if (user?.user_metadata.admin === false) {
      alert("Only admins can add new articles");
      return;
    } else {
      await uploadArticle(data);
      alert("The article has been uploaded. You will now be taken back to the articles page");
      navigate("/cms");
    }
  };

  return (
    <>
      <form className="flex w-4/5 flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <div>
          <Label htmlFor="articleTitle">Title</Label>
          <TextInput
            id="articleTitle"
            type="text"
            {...register("title", {
              required: "Title is required",
              minLength: { value: 30, message: "Must be at least 30 character" },
              maxLength: { value: 70, message: "Title cannot exceed 70 cahrcters" },
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
              minLength: { value: 50, message: "Description must be at least 50 characters" },
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
                if (plain.length < 300) return "Content should have min 300 characters";
                if (plain.length > 3000) return "Content should have max 3000 characters";
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
              <option></option>
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
            \<Label htmlFor="authors">Select Image</Label>
            <Button type="button" onClick={() => setOpenModal(true)} className="self-end">
              {watch("image") ? watch("image").split("/").pop() : "Select Image"}
            </Button>
            {errors.image && <p className="text-red-500">{errors.image.message}</p>}
          </div>
        </div>

        <div className="self-end flex gap-x-4 max-[800px]:self-center">
          <Button type="submit" className="cursor-pointer select-none w-fit self-end max-[800px]:self-center">
            Upload Article
          </Button>
          <Link to={"/cms"}>
            <Button className="cursor-pointer select-none w-fit self-end max-[800px]:self-center">Cancel</Button>
          </Link>
        </div>

        {/* Images Modal */}
        <Controller
          control={control}
          name="image"
          rules={{ required: "Image is required" }}
          render={({ field }) => <ImagesModalCMS openModal={openModal} setOpenModal={setOpenModal} value={field.value} onChange={field.onChange} />}
        />
      </form>
    </>
  );
};

export default AddArticleForm;
