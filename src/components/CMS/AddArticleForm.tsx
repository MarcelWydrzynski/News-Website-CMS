import { Button, Label, TextInput, Textarea, Select } from "flowbite-react";
import { ChangeEvent, useState } from "react";
import ImagesModalCMS from "./ImagesModalCMS";
import uploadArticle from "../../hooks/UseUploadArticle";
import UseFetchAuthors from "../../hooks/UseFetchAuthors";
import ErrorCMS from "./ErrorCMS";
import { useNavigate } from "react-router"; 

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
    } else {
      setSelectedImage(null);
    }
  };

  const handleFormValidation = () => {
    if (newArticle.title.trim().length === 0) {
      return setError({
        errorstate: true,
        errorMessage: "Title cannot be empty",
      });
    }
    if (newArticle.title.length < 20) {
      return setError({
        errorstate: true,
        errorMessage: "Title must be at least 20 characters",
      });
    }
    if (newArticle.title.length > 70) {
      return setError({
        errorstate: true,
        errorMessage: "Title must be less than 70 characters",
      });
    }

    if (newArticle.description.trim().length === 0) {
      return setError({
        errorstate: true,
        errorMessage: "Description cannot be empty",
      });
    }
    if (newArticle.description.trim().length >= 100) {
      return setError({
        errorstate: true,
        errorMessage: "Description cannot be longer than 100 characters",
      });
    }
    if (newArticle.lead.length < 100) {
      return setError({
        errorstate: true,
        errorMessage: "Lead must be at least 100 characters",
      });
    }
    if (newArticle.content.length < 500) {
      return setError({
        errorstate: true,
        errorMessage: "Content must be at least 500 characters",
      });
    }
    if (newArticle.image.length === 0) {
      return setError({
        errorstate: true,
        errorMessage: "Please select an image",
      });
    }
    if (newArticle.category.length === 0) {
      return setError({
        errorstate: true,
        errorMessage: "Category must be selected",
      });
    }
    if (newArticle.author.length === 0) {
      return setError({
        errorstate: true,
        errorMessage: "Author cannot be empty",
      });
    }

    setError({ errorstate: false, errorMessage: "" });
    uploadArticle(newArticle, navigate);
  };

  return (
    <>
      {openModal ? (
        <ImagesModalCMS
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleCheckboxChecked={handleCheckboxChecked}
          selectedImage={selectedImage}
          setNewArticle={setNewArticle}
        />
      ) : null}
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
          <Label htmlFor="articleContent">Content</Label>
          <Textarea
            id="articleContent"
            rows={10}
            value={newArticle.content}
            color={error.errorMessage.includes("Content") ? "failure" : "gray"}
            onChange={(e) =>
              setNewArticle((prev) => ({
                ...prev,
                content: e.target.value,
              }))
            }
          />
        </div>

        <div className="flex gap-4 justify-end">
          <Button type="button" className="self-end" color={error.errorMessage.includes("image") ? "red" : "gray"} onClick={() => setOpenModal(true)}>
            {selectedImage === null ? "Select your image" : selectedImage.name}
          </Button>

          <div className="max-w-md">
            <Label htmlFor="categories">Select your Category</Label>
            <Select
              id="catogries"
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

        <Button type="submit" className="w-fit self-end">
          Submit
        </Button>
      </form>
    </>
  );
};

export default AddArticleForm;
