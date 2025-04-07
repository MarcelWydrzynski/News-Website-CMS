import React, { ChangeEvent, useState } from "react";
import { TextInput, Button, FileInput, Label } from "flowbite-react";
import uploadImage from "../../hooks/UseUploadImage";
import deleteImages from "../../hooks/UseDeleteImages";

type Image = {
  id: string;
  url: string;
  name: string;
};

type ImagesFiltersCMSProps = {
  selectedImages: Image[];
};

const ImagesFiltersCMS: React.FC<ImagesFiltersCMSProps> = ({
  selectedImages,
}) => {
  const [file, setFile] = useState<File | null>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      uploadImage(file);
    } else {
      alert("Please select a file first.");
    }
  };

  const handleDelete = () => {
    if (selectedImages.length > 0) {
      deleteImages(selectedImages.map((image) => image.name));
    } else {
      alert("No images selected for deletion.");
    }
  };

  return (
    <div className="flex flex-wrap gap-y-4 gap-x-4">
      <div>
        <Label className="mb-2 block" htmlFor="img-search">
          Search for image
        </Label>
        <TextInput id="imgname" type="text" className="mr-0 w-sm" />
      </div>

      <div>
        <Label className="mb-2 block" htmlFor="file-upload">
          Upload file
        </Label>
        <FileInput className="w-sm" id="file-upload" onChange={onChange} />
      </div>

      <Button className="self-end" onClick={handleUpload}>
        Upload
      </Button>
      <Button className="self-end" onClick={handleDelete}>
        Delete images
      </Button>
    </div>
  );
};

export default ImagesFiltersCMS;
