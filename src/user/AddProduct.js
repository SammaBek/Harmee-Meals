import { useRef, useState, useContext } from "react";
import ImageUploader from "../utils/ImageUploader";
import img2 from "../img/prodPicture.webp";
import useHttp from "../hooks/Use-Http";
import Cookies from "js-cookie";
import Select from "react-select";
import ElectronicsSpecification from "../productSpecification/ElectronicsSpecification";
import VehiclesSpecification from "../productSpecification/VehiclesSpecification";

import ErrorModal from "../modal/ErrorModal";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ErrorAction } from "../store/Error-Slice";
const AddMeal = () => {
  const CatagoriesList = [
    { value: "Home-Appliance", label: "Home-Appliance" },
    { value: "Vehicles", label: "Vehicles" },
    { value: "Electronics", label: "Electronics" },
    { value: "Clothing", label: "Clothing" },
    { value: "Home-Furniture", label: "Home-Furniture" },
    { value: "Gym-Equipment", label: "Gym-Equipment" },
  ];

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,

      color: state.selectProps.menuColor,
    }),
  };
  const isError = useSelector((state) => state.error.isError);
  const isLoggedIn = useSelector((state) => state.sign.isLoggedIn);
  const dispatch = useDispatch();
  const [specification, setSpecification] = useState();
  const [specs, setSpecs] = useState();
  const history = useHistory();
  console.log(isLoggedIn);

  const productInput = useRef();
  const detailInput = useRef();
  const priceInput = useRef();
  const inputDeadline = useRef();
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [status, setStatus] = useState();
  const [catagories, setCatagories] = useState("HomeAppliance");

  let header;
  const { sendRequest } = useHttp();
  console.log(catagories);

  const submitHandler = async (event) => {
    event.preventDefault();

    let images = [];

    const form = new FormData();

    console.log(image1, image2, image3);

    if (
      !productInput.current.value ||
      !detailInput.current.value ||
      !priceInput.current.value ||
      !specs
    ) {
      dispatch(
        ErrorAction.setError({
          errorMessage: "Some Fields are left unfilled, Please fill",
        })
      );
    } else {
      const product = productInput.current.value;
      const detail = detailInput.current.value;
      const price = priceInput.current.value;

      form.append("name", productInput.current.value);
      form.append("description", detailInput.current.value);
      form.append("price", priceInput.current.value);
      form.append("productCatagory", catagories);

      if (image1 || image2 || image3) {
        if (image1) images.push(image1);
        if (image2) images.push(image2);
        if (image3) images.push(image3);
      }

      form.append("status", status);
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          form.append("images", images[i]);
        }
      }

      for (var key in specs) {
        form.append(key, specs[key]);
      }

      console.log(product, detail, images, price, catagories);

      sendRequest(
        {
          method: "POST",
          url: `${
            process.env.NODE_ENV === "production"
              ? process.env.REACT_APP_BACKEND_URL
              : "http://localhost:8000/api"
          }/meals/addproduct`,
          data: form,
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        },
        applyData
      );
    }
  };

  const applyData = (User) => {
    console.log(User);
    history.push("/userpage");
  };

  const getImage1 = (imgs, valid) => {
    console.log(imgs, valid);

    setImage1(imgs);
  };
  const getImage2 = (imgs, valid) => {
    console.log(imgs, valid);

    setImage2(imgs);
  };
  const getImage3 = (imgs, valid) => {
    console.log(imgs, valid);

    setImage3(imgs);
  };
  const listHandler = (event) => {
    console.log(event);
    if (event.value) {
      setCatagories(event.value);
      setSpecification(event.value);
    }
  };

  const getSpec = (data) => {
    console.log(data);
    setSpecs(data);
  };
  const statusHandler = (event) => {
    console.log(event.target.value);
    setStatus(event.target.value);
  };

  return (
    <div className="grid min-h-screen">
      {isError && <ErrorModal />}
      <form onSubmit={submitHandler}>
        <div className="w-full gap-5 mt-4 sm:mt-10 sm:flex">
          <div className="grid grid-flow-row gap-2 ml-6 sm:gap-2 sm:h-[90%]  sm:w-[55%] md:w-[60%] lg:w-[60%]">
            <h1 className="mt-5 text-lg text-center sm:text-xl md:mt-10">
              ADD YOUR PRODUCT
            </h1>
            <div>
              <label className="hidden text-base text-black sm:block md:text-xl ">
                Product Name
              </label>
            </div>
            <div>
              <textarea
                ref={productInput}
                rows="1"
                cols="30"
                placeholder="Product Name"
                className="p-2 px-2 bg-transparent border border-gray-500 rounded-md "
              />
            </div>

            <div>
              <label className="hidden text-base sm:block md:text-xl ">
                Product Detail
              </label>
            </div>
            <div>
              <textarea
                rows="1"
                cols="30"
                ref={detailInput}
                placeholder="Product Detail"
                className="p-2 px-2 bg-transparent border border-gray-500 rounded-md gray-500"
              />
            </div>
            <div>
              <input
                ref={priceInput}
                type="number"
                max="900000000"
                placeholder="Price"
                className="px-2 py-1 text-base bg-transparent border border-gray-500 rounded-md w-28 md:text-xl"
              />
            </div>

            <div className="flex gap-3">
              <label className="text-base md:text-xl">Status:</label>
              <div className="flex gap-1">
                <div className="my-auto ">
                  <label className="flex">
                    <input
                      name="car-type"
                      value="New"
                      className="hidden peer"
                      type="radio"
                      onChange={statusHandler}
                    />
                    <span className=" peer-checked:rounded-full peer-checked:bg-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-400 "
                      >
                        <circle cx="12" cy="12" r="9"></circle>
                      </svg>
                    </span>
                  </label>
                </div>
                <div className="my-auto ">
                  <label className="text-base md:text-lg">New</label>
                </div>
              </div>

              <div className="flex gap-1">
                <div className="my-auto ">
                  <label className="flex">
                    <input
                      name="car-type"
                      value="Used"
                      className="hidden peer"
                      type="radio"
                      onChange={statusHandler}
                    />
                    <span className=" peer-checked:rounded-full peer-checked:bg-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-400 "
                      >
                        <circle cx="12" cy="12" r="9"></circle>
                      </svg>
                    </span>
                  </label>
                </div>
                <div className="my-auto ">
                  <label className="text-base md:text-lg">Used</label>
                </div>
              </div>
            </div>

            <div className=" grid-flow-col grid gap-5 overflow-x-auto w-[100%] ">
              <div className=" lg:w-44 w-44">
                <ImageUploader
                  cssClass="rounded-lg w-44 h-36 md:w-44 md:h-36 lg:w-44 lg:h-36"
                  cssClassAfter="rounded-lg w-52 h-52 md:w-24 md:h-24 lg:w-52 lg:h-52"
                  img={img2}
                  onGetImage={getImage1}
                  type="multiple"
                />
              </div>

              <div className=" lg:w-44 w-44">
                <ImageUploader
                  cssClass="rounded-lg w-44 h-36 md:w-44 md:h-36 lg:w-44 lg:h-36"
                  cssClassAfter="rounded-lg w-52 h-52 md:w-24 md:h-24 lg:w-52 lg:h-52"
                  img={img2}
                  onGetImage={getImage2}
                  type="multiple"
                />
              </div>

              <div className="lg:w-44 w-44">
                <ImageUploader
                  cssClass="rounded-lg w-44 h-36 md:w-44 md:h-36 lg:w-44 lg:h-36"
                  cssClassAfter="rounded-lg w-52 h-52 md:w-24 md:h-24 lg:w-52 lg:h-52"
                  img={img2}
                  onGetImage={getImage3}
                  type="multiple"
                />
              </div>
            </div>

            <div className="hidden mb-5 sm:block">
              <button className="px-3 py-1 ml-5 text-gray-100 bg-blue-500 rounded-lg hover:bg-blue-600">
                Add Product
              </button>
            </div>
          </div>

          <div className="w-4/6 mt-5 mb-5 sm:mt-16 sm:ml-2 ">
            <div className="flex gap-3 mb-3 ml-6 sm:ml-0">
              <div className="transform translate-y-1 lg:text-lg">
                Catagory*
              </div>
              <div>
                <Select
                  options={CatagoriesList}
                  onChange={listHandler}
                  className="w-40 bg-transparent "
                />
              </div>
            </div>

            <div className="mt-2 ml-5 sm:ml-0 ">
              {specification === "Electronics" && (
                <ElectronicsSpecification getData={getSpec} />
              )}
              {specification === "Vehicles" && (
                <VehiclesSpecification getData={getSpec} />
              )}
            </div>
          </div>

          <div className="mb-5 sm:hidden">
            <button className="px-3 py-1 ml-5 text-gray-100 bg-blue-500 rounded-lg hover:bg-blue-600">
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddMeal;
