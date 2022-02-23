import React, { useRef, useState, useEffect } from "react";

const ImageUploader = (props) => {
  const filePickerRef = useRef();
  const [file, setFile] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImageUrl(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile, valid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      valid = isValid;
    } else {
      setIsValid(false);
      valid = false;
    }

    props.onGetImage(pickedFile, valid);
    console.log(pickedFile);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="flex justify-center justify-items-center">
      <div className="grid grid-flow-row gap-5 ">
        <input
          type="file"
          accept=".jpeg,.png,.jpg"
          className="hidden "
          ref={filePickerRef}
          onChange={pickedHandler}
        />

        <img
          alt="preview"
          src={`${imageUrl ? imageUrl : ""}`}
          className="p-8 border-2"
        />
        <button
          onClick={pickImageHandler}
          className="h-8 mb-5 ml-5 bg-red-400 rounded-lg w-28 hover:bg-red-500"
        >
          Add Image
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
