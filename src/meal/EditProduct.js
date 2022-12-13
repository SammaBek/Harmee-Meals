import react, { useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ElectronicsSpecification from "../productSpecification/ElectronicsSpecification";
import VehiclesSpecification from "../productSpecification/VehiclesSpecification";
import Select from "react-select";
import axios from "axios";
import Cookies from "js-cookie";

import { ErrorAction } from "../store/Error-Slice";

const EditProduct = (props) => {
  console.log(props);
  const errorMessage = useSelector((state) => state.error.errorMessage);
  const myUser = useSelector((state) => state.sign.userId);

  const nameInput = useRef();
  const priceInput = useRef();
  const descriptionInput = useRef();
  const statusInput = useRef();

  let updateObj = {};

  const dispatch = useDispatch();

  const [catagories, setCatagories] = useState(props.product.productCatagory);

  const CatagoriesList = [
    { value: "Home-Appliance", label: "Home-Appliance" },
    { value: "Vehicles", label: "Vehicles" },
    { value: "Electronics", label: "Electronics" },
    { value: "Clothing", label: "Clothing" },
    { value: "Home-Furniture", label: "Home-Furniture" },
    { value: "Gym-Equipment", label: "Gym-Equipment" },
  ];

  const listHandler = (event) => {
    console.log(event);
    if (event.value) {
      setCatagories(event.value);
    }
  };

  const fetchUpdate = (updateData) => {
    console.log(updateData);
    console.log(nameInput.current.value);
    updateObj = {
      ...updateData,
    };

    console.log(updateObj);
  };

  const cancelHandler = () => {
    // dispatch(ErrorAction.cancelError());

    props.cancelHandler();
  };

  const saveHandler = async () => {
    let Req;
    console.log(updateObj);
    let finalObj = {
      specs: { ...updateObj },
      name: nameInput.current.value,
      price: priceInput.current.value,
      description: descriptionInput.current.value,
      status: statusInput.current.value,
    };

    console.log(finalObj);
    try {
      Req = await axios({
        method: "PATCH",
        url: `${
          process.env.NODE_ENV === "production"
            ? process.env.REACT_APP_BACKEND_URL
            : "http://localhost:8000/api"
        }/meals/${props.product.id}`,
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        data: finalObj,
      });
    } catch (err) {
      console.log(err.response.data.message);
      dispatch(
        ErrorAction.setError({ ErrorMessage: err.response.data.message })
      );
    }

    console.log(Req);
    props.updateData(Req.data.places);

    props.cancelHandler();
  };
  return (
    <div className="fixed inset-0 top-0 left-0 right-0 z-50 flex bg-black bg-opacity-60">
      <div className="grid h-[90%] mt-12 w-[98%]   sm:h-[90%] md:h-[90%] lg:h-[90%] overflow-y-auto sm:mt-14   px-3 sm:w-[85%] py-5 sm:py-10 mx-auto md:mt-14 bg-green-50 bg-opacity-70 rounded-lg shadow-2xl ">
        <div className=" sm:flex sm:gap-7">
          <div className=" w-[65%] sm:w-[70%]  md:w-[70%] lg:w-[55%] xl:w-[45%] mx-auto sm:ml-0">
            <div className=" aspect-w-3 aspect-h-2">
              <img
                className="object-cover rounded-lg"
                src={`${process.env.REACT_APP_AWS_S3_BUCKET}/${props.product.image[0]}`}
                alt="pic"
              ></img>
            </div>
          </div>

          <div className=" w-[100%] grid grid-flow-row gap-1 md:h-60 mt-5 sm:mt-0">
            <div className="flex gap-5 border border-t-0 border-l-0 border-r-0 sm:text-sm md:text-base">
              <div className="my-auto ">
                <label className="font-serif sm:font-bold ">Name:</label>
              </div>

              <input
                defaultValue={props.product.name}
                className="w-full font-serif bg-transparent"
                ref={nameInput}
              />
            </div>

            <div className="flex gap-5 border border-t-0 border-l-0 border-r-0 sm:text-sm md:text-base">
              <div className="my-auto ">
                <label className="font-serif sm:font-bold ">Price:</label>
              </div>
              <input
                defaultValue={props.product.price}
                className="w-full font-serif bg-transparent"
                ref={priceInput}
              />
            </div>

            <div className="flex gap-5 border border-t-0 border-l-0 border-r-0 sm:text-sm md:text-base">
              <div className="my-auto ">
                <label className="font-serif sm:font-bold ">Description:</label>
              </div>

              <input
                defaultValue={props.product.description}
                className="w-full font-serif bg-transparent"
                ref={descriptionInput}
              />
            </div>

            <div className="flex gap-5 border border-t-0 border-l-0 border-r-0 sm:text-sm md:text-base">
              <div className="my-auto ">
                <label className="font-serif sm:font-bold">Status:</label>
              </div>

              <input
                defaultValue={props.product.status}
                className="w-full font-serif bg-transparent"
                ref={statusInput}
              />
            </div>

            <div className="flex ">
              <button
                onClick={saveHandler}
                className="w-16 h-8 mt-2 mb-3 ml-10 bg-green-400 rounded-lg shadow-2xl"
              >
                Save
              </button>
              <button
                onClick={cancelHandler}
                className="w-16 h-8 mt-2 mb-3 ml-10 bg-red-400 rounded-lg shadow-2xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-3 ml-6 sm:ml-0 sm:mt-3">
          <div className="transform translate-y-1 lg:text-lg">Catagory*</div>
          <div>
            <Select
              options={CatagoriesList}
              onChange={listHandler}
              className="w-40 bg-transparent "
              // defaultValue={`${props.product.productCatagory}`}
              defaultValue={{
                value: `${
                  props.product.productCatagory
                    ? props.product.productCatagory
                    : CatagoriesList[0]
                }`,
                label: `${
                  props.product.productCatagory
                    ? props.product.productCatagory
                    : CatagoriesList[0]
                }`,
              }}
            />
          </div>
        </div>

        <div className="">
          {catagories === "Electronics" && (
            <ElectronicsSpecification
              fetchUpdate={fetchUpdate}
              editSpecs={props.product}
            />
          )}

          {catagories === "Vehicles" && (
            <VehiclesSpecification
              fetchUpdate={fetchUpdate}
              editSpecs={props.product}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
