import { useRef, useState, useContext } from "react";
import ImageUploader from "../utils/ImageUploader";
import img2 from "../img/img2.jpeg";
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
  const [image, setImage] = useState();
  const [status, setStatus] = useState();
  const [catagories, setCatagories] = useState("HomeAppliance");

  let header;
  const { sendRequest } = useHttp();
  console.log(catagories);

  const submitHandler = async (event) => {
    event.preventDefault();

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

      const form = new FormData();

      form.append("name", productInput.current.value);
      form.append("description", detailInput.current.value);
      form.append("price", priceInput.current.value);
      form.append("productCatagory", catagories);
      form.append("image", image);
      form.append("status", status);

      for (var key in specs) {
        form.append(key, specs[key]);
      }

      console.log(product, detail, image, price, catagories);

      sendRequest(
        {
          method: "POST",
          url: "http://localhost:8000/api/meals/addproduct",
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

  const getImage = (imgs, valid) => {
    console.log(imgs, valid);

    setImage(imgs);
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
    <div className="grid min-h-screen bg-gradient-to-r from-slate-700 via-blue-500 to-black">
      {isError && <ErrorModal />}
      <form onSubmit={submitHandler}>
        <div className="h-auto mb-10 w-[80%]">
          <h1 className="mt-5 text-lg text-center text-white sm:text-xl md:mt-10">
            ADD YOUR PRODUCT
          </h1>

          <div className="w-full h-auto gap-5 mt-7 sm:mt-10 sm:flex">
            <div className="grid w-1/3 grid-flow-row gap-2 ml-6 sm:gap-3 ">
              <div>
                <label className="hidden text-base text-white sm:block md:text-xl ">
                  Product Name
                </label>
              </div>
              <div>
                <textarea
                  ref={productInput}
                  rows="1"
                  cols="36"
                  placeholder="Product Name"
                  className="p-1 px-2 bg-transparent border border-white rounded-md "
                />
              </div>

              <div>
                <label className="hidden text-base text-white sm:block md:text-xl ">
                  Product Detail
                </label>
              </div>
              <div>
                <textarea
                  rows="1"
                  cols="36"
                  ref={detailInput}
                  placeholder="Product Detail"
                  className="p-1 px-2 bg-transparent border border-white rounded-md"
                />
              </div>
              <div>
                <label className="hidden text-base text-white sm:block md:text-xl ">
                  Price
                </label>
              </div>
              <div>
                <input
                  ref={priceInput}
                  type="number"
                  max="900000000"
                  placeholder="Price"
                  className="w-1/4 px-2 text-base text-white bg-transparent border border-white rounded-md md:text-xl"
                />
              </div>
              <div className="flex gap-3">
                <label className="text-base text-white md:text-xl">
                  Status:
                </label>
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
                    <label className="text-base text-white md:text-lg">
                      New
                    </label>
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
                    <label className="text-base text-white md:text-lg">
                      Used
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-4/6 mt-5 mb-5 sm:grid-flow-col sm:grid">
              <div className="flex gap-3 ml-6 sm:ml-0">
                <div className="transform translate-y-1 ">Catagory*</div>
                <div>
                  <Select
                    options={CatagoriesList}
                    onChange={listHandler}
                    className="absolute w-40 bg-transparent"
                  />
                </div>
              </div>

              <div className="mt-5 ml-6 transform -translate-y-5 sm:ml-0 ">
                {specification === "Vehicles" && (
                  <VehiclesSpecification getData={getSpec} />
                )}

                {specification === "Electronics" && (
                  <ElectronicsSpecification getData={getSpec} />
                )}
              </div>
            </div>

            <div>
              <ImageUploader
                cssClass="rounded-lg w-36 h-36 md:w-24 md:h-24 lg:w-36 lg:h-36"
                cssClassAfter="rounded-lg w-52 h-52 md:w-24 md:h-24 lg:w-52 lg:h-52"
                img={img2}
                onGetImage={getImage}
              />
            </div>

            <div className="mb-5 ">
              <button className="px-4 py-1 text-gray-100 bg-blue-500 rounded-lg hover:bg-blue-600">
                Add Product
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddMeal;
