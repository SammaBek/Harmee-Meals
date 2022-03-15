import { useRef, useState, useContext } from "react";
import ImageUploader from "../utils/ImageUploader";
import img2 from "../img/img2.jpeg";
import useHttp from "../hooks/Use-Http";
import Cookies from "js-cookie";
import ErrorContext from "../store/Error-Context";
import ErrorModal from "../modal/ErrorModal";
import { useSelector } from "react-redux";
const AddMeal = () => {
  const isLoggedIn = useSelector((state) => state.sign.isLoggedIn);
  console.log(isLoggedIn);
  const ctx = useContext(ErrorContext);
  const productInput = useRef();
  const detailInput = useRef();
  const priceInput = useRef();
  const inputDeadline = useRef();
  const [image, setImage] = useState();
  const [type, setType] = useState();
  const [catagories, setCatagories] = useState("HomeAppliance");

  let header;
  const { sendRequest } = useHttp();
  console.log(catagories);
  const submitHandler = async (event) => {
    event.preventDefault();
    const product = productInput.current.value;
    const detail = detailInput.current.value;
    const price = priceInput.current.value;
    const deadline = inputDeadline.current.value;
    const form = new FormData();

    form.append("name", productInput.current.value);
    form.append("description", detailInput.current.value);
    form.append("price", priceInput.current.value);
    form.append("productDeadline", inputDeadline.current.value);
    form.append("productType", type);
    form.append("productCatagory", catagories);
    form.append("image", image);

    console.log(product, detail, image, price, deadline, catagories);

    sendRequest(
      {
        method: "POST",
        url: "http://localhost:8000/api/meals/addproduct",
        data: form,
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      },
      applyData
    );
  };

  const applyData = (User) => {
    console.log(User);
  };

  const getImage = (imgs, valid) => {
    console.log(imgs, valid);

    setImage(imgs);
  };

  const listHandler = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    if (event.target.value) {
      setCatagories(event.target.value);
    }
  };

  const radioHandler = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setType(event.target.value);
  };
  return (
    <div className="grid bg-gradient-to-r from-cyan-300 via-blue-500 to-cyan-500">
      {ctx.isError && <ErrorModal />}
      <form onSubmit={submitHandler}>
        <div className="w-7/12 h-auto mx-auto mb-10 w- bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl">
          <h1 className="mt-10 text-3xl text-center text-gray-200 ">
            GABAA AUCTION ADD YOUR PRODUCTS
          </h1>

          <div className="w-full h-auto mx-auto bg-transparent border-1">
            <div className="grid grid-flow-row mt-5 ml-6 mr-6 ">
              <div>
                <label className="text-xl text-gray-200 ">Product Name</label>
              </div>
              <div>
                <input
                  ref={productInput}
                  className="w-5/12 py-2 bg-transparent border-2 rounded-md border-fuchsia-200"
                />
              </div>

              <div>
                <label className="text-xl text-gray-200 ">Product Detail</label>
              </div>
              <div>
                <textarea
                  rows="5"
                  cols="40"
                  ref={detailInput}
                  className="bg-transparent border-2 rounded-md border-fuchsia-200 "
                />
              </div>
              <div>
                <label className="text-xl text-gray-200 ">Starting Price</label>
              </div>
              <div>
                <input
                  ref={priceInput}
                  type="number"
                  max="10000000"
                  className="w-1/4 py-1 text-xl bg-transparent border-2 rounded-md border-fuchsia-200"
                />
              </div>

              <div onChange={radioHandler} className="flex gap-3 mt-4 mb-3">
                <label className="flex ">
                  <input
                    value="New"
                    name="prod-type"
                    type="radio"
                    className="absolute hidden peer"
                  />
                  <span className=" peer-checked:rounded-full peer-checked:bg-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-400 feather feather-circle"
                    >
                      <circle cx="12" cy="12" r="8"></circle>
                    </svg>
                  </span>
                  Brand New
                </label>
                <label className="flex ">
                  <input
                    valu="SlightlyUsed"
                    name="prod-type"
                    type="radio"
                    className="absolute hidden peer"
                  />
                  <span className=" peer-checked:rounded-full peer-checked:bg-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-400 feather feather-circle"
                    >
                      <circle cx="12" cy="12" r="8"></circle>
                    </svg>
                  </span>
                  Slightly Used
                </label>

                <label className="flex ">
                  <input
                    value="Used"
                    name="prod-type"
                    type="radio"
                    className="absolute hidden peer"
                  />
                  <span className=" peer-checked:rounded-full peer-checked:bg-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-400 feather feather-circle "
                    >
                      <circle cx="12" cy="12" r="8"></circle>
                    </svg>
                  </span>
                  Used
                </label>
              </div>

              <div className="flex mb-5">
                <select
                  defaultValue="HomeAppliance"
                  onChange={listHandler}
                  className="text-lg text-gray-200 bg-transparent border-2 border-gray-400 rounded-lg"
                >
                  <option className="text-sm " value="Cars">
                    Cars
                  </option>
                  <option className="text-sm " value="HomeAppliance">
                    Home-Appliance
                  </option>
                  <option className="text-sm " value="Other">
                    Other
                  </option>
                </select>
                <div>
                  <label className="ml-16 text-lg text-gray-200 ">
                    Auction Deadline
                  </label>
                </div>

                <div>
                  <input
                    ref={inputDeadline}
                    type="date"
                    className="ml-5 text-gray-200 bg-transparent border-2 border-gray-400 rounded-lg"
                  ></input>
                </div>
              </div>

              <ImageUploader
                cssClass="rounded-lg w-36 h-36 md:w-24 md:h-24 lg:w-36 lg:h-36"
                cssClassAfter="rounded-lg w-52 h-52 md:w-24 md:h-24 lg:w-52 lg:h-52"
                img={img2}
                onGetImage={getImage}
              />

              <div className="mb-5 ">
                <button className="px-4 py-1 text-gray-100 bg-blue-500 rounded-lg hover:bg-blue-600">
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddMeal;
