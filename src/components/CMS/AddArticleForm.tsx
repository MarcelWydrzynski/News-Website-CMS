import { useState, ChangeEvent } from "react";
import { Button, Label, TextInput, Textarea, Select } from "flowbite-react";
import ImagesModalCMS from "./ImagesModalCMS";
import uploadArticle from "../../hooks/UseUploadArticle";
import UseFetchAuthors from "../../hooks/UseFetchAuthors";
import ErrorCMS from "./ErrorCMS";
import { useNavigate } from "react-router";
import RichTextEditor from "./RichTextEditor";

type Image = {
  id: string;
  url: string;
  name: string;
};

const AddArticleForm = () => {
  const [newArticle, setNewArticle] = useState({
    id: 0,
    title: "",
    author: "",
    category: "",
    lead: "",
    image: "",
    content: "",
    description: "",
  });
  const [error, setError] = useState({
    errorstate: false,
    errorMessage: "",
  });
  const { authors } = UseFetchAuthors();
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChecked = (event: ChangeEvent<HTMLInputElement>, image: Image) => {
    if (event.target.checked) {
      setSelectedImage(image);
      setNewArticle((prev) => ({ ...prev, image: image.url }));
    } else {
      setSelectedImage(null);
      setNewArticle((prev) => ({ ...prev, image: "" }));
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormValidation = () => {
    let errorMessage = "";
    if (newArticle.title.trim().length === 0) {
      errorMessage = "Title cannot be empty";
    } else if (newArticle.title.length < 20) {
      errorMessage = "Title must be at least 20 characters";
    } else if (newArticle.title.length > 70) {
      errorMessage = "Title must be less than 70 characters";
    } else if (newArticle.description.trim().length === 0) {
      errorMessage = "Description cannot be empty";
    } else if (newArticle.description.trim().length >= 100) {
      errorMessage = "Description cannot be longer than 100 characters";
    } else if (newArticle.lead.length < 100) {
      errorMessage = "Lead must be at least 100 characters";
    } else if (newArticle.content.replace(/<[^>]+>/g, "").length < 500) {
      errorMessage = "Content must be at least 500 characters";
    } else if (newArticle.image.length === 0) {
      errorMessage = "Please select an image";
    } else if (newArticle.category.length === 0) {
      errorMessage = "Category must be selected";
    } else if (newArticle.author.length === 0) {
      errorMessage = "Author cannot be empty";
    }

    if (errorMessage) {
      setError({ errorstate: true, errorMessage });
      scrollToTop();
      return;
    }

    setError({ errorstate: false, errorMessage: "" });
    uploadArticle(newArticle, navigate);
  };

  return (
    <>
      {openModal && (
        <ImagesModalCMS
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleCheckboxChecked={handleCheckboxChecked}
          selectedImage={selectedImage}
          setEditedArticle={setNewArticle}
        />
      )}
      <form
        className="flex w-4/5 flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleFormValidation();
        }}
      >
        {error.errorstate ? <ErrorCMS errorMessage={error.errorMessage} /> : <p className="opacity-0 text-xl">Error placeholder</p>}

        <div>
          <Label htmlFor="articleTitle">Title</Label>
          <TextInput
            id="articleTitle"
            type="text"
            value={newArticle.title}
            color={error.errorMessage.includes("Title") ? "failure" : "gray"}
            onChange={(e) =>
              setNewArticle((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <Label htmlFor="articleDescription">Description</Label>
          <TextInput
            id="articleDescription"
            type="text"
            value={newArticle.description}
            color={error.errorMessage.includes("Description") ? "failure" : "gray"}
            onChange={(e) =>
              setNewArticle((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <Label htmlFor="articleLead">Lead</Label>
          <Textarea
            id="articleLead"
            rows={4}
            value={newArticle.lead}
            color={error.errorMessage.includes("Lead") ? "failure" : "gray"}
            onChange={(e) =>
              setNewArticle((prev) => ({
                ...prev,
                lead: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <Label>Content</Label>
          <RichTextEditor
            value={newArticle.content}
            onChange={(html) =>
              setNewArticle((prev) => ({
                ...prev,
                content: html,
              }))
            }
          />
        </div>

        <div className="flex gap-4 justify-end flex-wrap max-[800px]:justify-center">
          <Button type="button" className="self-end" color={error.errorMessage.includes("image") ? "red" : "gray"} onClick={() => setOpenModal(true)}>
            {selectedImage === null ? "Select your image" : selectedImage.name}
          </Button>

          <div className="max-w-md">
            <Label htmlFor="categories">Select your Category</Label>
            <Select
              id="categories"
              value={newArticle.category}
              color={error.errorMessage.includes("Category") ? "failure" : "gray"}
              onChange={(e) =>
                setNewArticle((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
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
              value={newArticle.author}
              color={error.errorMessage.includes("Author") ? "failure" : "gray"}
              onChange={(e) =>
                setNewArticle((prev) => ({
                  ...prev,
                  author: e.target.value,
                }))
              }
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
          Submit
        </Button>
      </form>
    </>
  );
};

export default AddArticleForm;
