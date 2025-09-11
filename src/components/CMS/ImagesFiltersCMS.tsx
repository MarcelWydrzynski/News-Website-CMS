import React, { ChangeEvent, useState } from "react";
import { TextInput, Button, FileInput, Label } from "flowbite-react";
import { useAuth } from "../../Context/AuthContext";
import uploadImage from "../../hooks/UseUploadImage";
import deleteImages from "../../hooks/UseDeleteImages";
import Image from "../../types/Image";

type ImagesFiltersCMSProps = {
  selectedImages: Image[];
  onSearch: (query: string) => void;
};

const ImagesFiltersCMS: React.FC<ImagesFiltersCMSProps> = ({ selectedImages, onSearch }) => {
  const [file, setFile] = useState<File>();

  const { user } = useAuth();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const handleUpload = () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a jpg/jpeg/png image");
      return;
    }

    if (user?.user_metadata.admin === false) {
      alert("Only admins can upload new images.");
      return;
    }
    uploadImage(file);
  };

  const handleDelete = () => {
    if (user?.user_metadata.admin === false) {
      alert("Only admins can delete images.");
      return;
    }
    if (selectedImages.length > 0) {
      deleteImages(selectedImages.map((image) => image.name));
    } else {
      alert("No images selected for deletion.");
    }
  };

  return (
    <div className="flex flex-wrap items-end gap-y-4 gap-x-4 w-full max-[800px]:justify-center">
      <div>
        <Label className="mb-2 block" htmlFor="img-search">
          Search for image by name
        </Label>
        <TextInput id="imgname" type="text" className="mr-0 w-sm max-[410px]:w-auto" onChange={(e) => onSearch(e.target.value)} />
      </div>

      <div>
        <Label className="mb-2 block" htmlFor="file-upload">
          Upload file
        </Label>
        <FileInput className="w-sm max-[410px]:w-auto" id="file-upload" onChange={onChange} accept="image/jpg" lang="en" />
      </div>

      <div>
        <Button className="self-end" onClick={handleUpload}>
          Upload
        </Button>
      </div>

      <div className="ml-auto max-[800px]:m-0">
        <Button className="self-end max-[800px]:m-0" onClick={handleDelete}>
          Delete selected image/images
        </Button>
      </div>
    </div>
  );
};

export default ImagesFiltersCMS;
