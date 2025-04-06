import React, { ChangeEvent, useState } from "react";
import { TextInput, Button, FileInput, Label } from "flowbite-react";
import uploadImage from "../../hooks/UseUploadImage";


const ImagesFiltersCMS = () => {
  const [file, setFile] = useState<File | null>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const onClick = () => {
    if (file) {
      uploadImage(file);
    } else {
      alert("Please select a file first.");
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

      <Button className="self-end" onClick={onClick}>
        Upload
      </Button>
    </div>
  );
};

export default ImagesFiltersCMS;
