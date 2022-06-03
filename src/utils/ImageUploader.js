import React, { useRef, useState, useEffect } from "react";
import img from "../img/img.jpeg";

const ImageUploader = (props) => {
  const filePickerRef = useRef();
  const [file, setFile] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  let pickedFile, valid;

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
    event.preventDefault();

    console.log(event.target.files.length, event.target.files);
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      valid = true;
    } else {
      setIsValid(false);
      valid = false;
    }

    props.onGetImage(pickedFile, valid);
    console.log(pickedFile, valid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="flex justify-center justify-items-center">
      <div className="grid grid-flow-row gap-5 ">
        <input
          type="file"
          accept=".jpeg,.png,.jpg,.webp"
          className="hidden "
          ref={filePickerRef}
          onChange={pickedHandler}
        />

        <img
          alt="preview"
          src={`${imageUrl ? imageUrl : props.img}`}
          className={`p-1 border ${
            imageUrl ? `${props.cssClass}` : `${props.cssClass}`
          }`}
        />

        <div>
          <button
            type="button"
            onClick={pickImageHandler}
            className="w-24 mb-5 ml-5 text-gray-100 bg-blue-500 rounded-lg h-7 sm:w-24 lg:text-base sm:text-sm hover:bg-blue-600"
          >
            Add Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
