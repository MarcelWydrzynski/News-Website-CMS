import { useState, ChangeEvent } from "react";
import { Button, Label, TextInput, Textarea, Select } from "flowbite-react";
import ImagesModalCMS from "./ImagesModalCMS";
import UseFetchAuthors from "../../hooks/UseFetchAuthors";
import ErrorCMS from "../Error";
import RichTextEditor from "./RichTextEditor";
import useUpdateArticle from "../../hooks/UseUpdateArticle";
import Image from "../../types/Image";
import Article from "../../types/Article";

const EditArticleForm: React.FC<{ article: Article }> = ({ article }) => {
  const [editedArticle, setEditedArticle] = useState<Article>(article);
  const [error, setError] = useState({ errorstate: false, errorMessage: "" });
  const { authors } = UseFetchAuthors();
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleCheckboxChecked = (event: ChangeEvent<HTMLInputElement>, image: Image) => {
    if (event.target.checked) {
      setSelectedImage(image);
      setEditedArticle({ ...editedArticle, image: image.url });
    } else {
      setSelectedImage(null);
      setEditedArticle({ ...editedArticle, image: "" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { updateArticle } = useUpdateArticle();

  const handleFormValidation = () => {
    if (!editedArticle) return;

    let errorMessage = "";
    if (editedArticle.title.length === 0) {
      errorMessage = "Title cannot be empty";
    } else if (editedArticle.title.length < 20) {
      errorMessage = "Title must be at least 20 characters";
    } else if (editedArticle.title.length > 70) {
      errorMessage = "Title must be less than 70 characters";
    } else if (editedArticle.description.trim().length === 0) {
      errorMessage = "Description cannot be empty";
    } else if (editedArticle.description.trim().length >= 100) {
      errorMessage = "Description cannot be longer than 100 characters";
    } else if (editedArticle.lead.length < 100) {
      errorMessage = "Lead must be at least 100 characters";
    } else if (editedArticle.content.replace(/<[^>]+>/g, "").length < 500) {
      errorMessage = "Content must be at least 500 characters";
    } else if (editedArticle.image.length === 0) {
      errorMessage = "Please select an image";
    } else if (editedArticle.category.length === 0) {
      errorMessage = "Category must be selected";
    } else if (editedArticle.author.length === 0) {
      errorMessage = "Author cannot be empty";
    }

    if (errorMessage) {
      setError({ errorstate: true, errorMessage });
      scrollToTop();
      return false;
    }

    setError({ errorstate: false, errorMessage: "" });
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedArticle) return;

    const isValid = handleFormValidation();
    if (!isValid) return;

    await updateArticle(editedArticle);
  };

  return (
    <>
      {openModal && (
        <ImagesModalCMS
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleCheckboxChecked={handleCheckboxChecked}
          selectedImage={selectedImage}
          setEditedArticle={setEditedArticle}
        />
      )}

      <form className="flex w-4/5 flex-col gap-4 mx-auto" onSubmit={handleSubmit}>
        {error.errorstate ? <ErrorCMS errorMessage={error.errorMessage} /> : <p className="opacity-0 text-xl">Error placeholder</p>}

        <div>
          <Label htmlFor="articleTitle">Title</Label>
          <TextInput
            id="articleTitle"
            type="text"
            value={editedArticle.title}
            color={error.errorMessage.includes("Title") ? "failure" : "gray"}
            onChange={(e) => setEditedArticle({ ...editedArticle, title: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="articleDescription">Description</Label>
          <TextInput
            id="articleDescription"
            type="text"
            value={editedArticle.description}
            color={error.errorMessage.includes("Description") ? "failure" : "gray"}
            onChange={(e) => setEditedArticle({ ...editedArticle, description: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="articleLead">Lead</Label>
          <Textarea
            id="articleLead"
            rows={4}
            value={editedArticle.lead}
            color={error.errorMessage.includes("Lead") ? "failure" : "gray"}
            onChange={(e) => setEditedArticle({ ...editedArticle, lead: e.target.value })}
          />
        </div>

        <div>
          <Label>Content</Label>
          <RichTextEditor value={editedArticle.content} onChange={(html) => setEditedArticle({ ...editedArticle, content: html })} />
        </div>

        <div className="flex gap-4 justify-end flex-wrap max-[800px]:justify-center">
          <Button type="button" className="self-end" color={error.errorMessage.includes("image") ? "failure" : "gray"} onClick={() => setOpenModal(true)}>
            {selectedImage === null ? "Select your image" : selectedImage.name}
          </Button>

          <div className="max-w-md">
            <Label htmlFor="categories">Select your Category</Label>
            <Select
              id="categories"
              value={editedArticle.category}
              color={error.errorMessage.includes("Category") ? "failure" : "gray"}
              onChange={(e) => setEditedArticle({ ...editedArticle, category: e.target.value })}
            >
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
            <Select
              id="authors"
              value={editedArticle.author}
              color={error.errorMessage.includes("Author") ? "failure" : "gray"}
              onChange={(e) => setEditedArticle({ ...editedArticle, author: e.target.value })}
            >
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
