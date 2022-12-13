import { Slider, makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useRef, useState, useReducer } from "react";
import Select from "react-select";
import useHttp from "../hooks/Use-Http";
import SearchResult from "../products/SearchResult";
import PhoneSpecification from "../productSpecification/PhoneSpecification";
const Electronics = () => {
  const defaultSpec = {
    make: null,
    status: null,
    engineSize: null,
    fuel: null,
    transmission: null,
  };

  const [elecType, setElecType] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const Data = await axios({
          method: "GET",
          url: `${
            process.env.NODE_ENV === "production"
              ? process.env.REACT_APP_BACKEND_URL
              : "http://localhost:8000/api"
          }/meals/filterProducts/`,
          params: { productCatagory: "Electronics" },
        });

        setProduct(Data.data.products);
      } catch (err) {
        console.log(err);
      }
    };
    getData();

    console.log(product);
  }, []);

  const [product, setProduct] = useState([]);

  let specs = {};

  let spec = [];

  const classes = makeStyles({
    className: "text-red-400",
  });
  const ElecType = [
    { value: "Laptop", label: "Laptop" },
    { value: "Phone", label: "Phone" },
    { value: "TV", label: "TV" },
  ];

  const elecTypeHandler = (event) => {
    setElecType(event.value);
  };
  const statusHandler = (event) => {
    console.log(event.target.value);
    setStatus(event.target.value);
  };

  const saveHandler = async (event) => {
    event.preventDefault();

    specs["productCatagory"] = "Electronics";

    if (elecType) {
      specs["specs.ElectronicType"] = elecType;
    }

    if (status) {
      specs["status"] = status;
    }

    try {
      const Data = await axios({
        method: "GET",
        url: `${
          process.env.NODE_ENV === "production"
            ? process.env.REACT_APP_BACKEND_URL
            : "http://localhost:8000/api"
        }/meals/filterProducts/`,
        params: specs,
      });

      setProduct(Data.data.products);
    } catch (err) {
      console.log(err);
    }

    console.log(specs);
  };

  const getSpec = (data) => {
    console.log(data);
    const key = Object.keys(data);

    if (key.length > 0) {
      key.map((k) => {
        if (data[k]) {
          console.log(data[k]);
          return (specs[`specs.${k}`] = data[k]);
        }
      });
    }
  };

  return (
    <div className="">
      <div className="grid h-screen grid-flow-col">
        <div className="grid grid-flow-row p-2 mt-16 ml-5 overflow-y-auto border border-gray-100 w-96 h-2/3">
          <div className="grid h-32 grid-flow-row">
            <div className="flex mt-4">
              <label>Electronics Type: </label>
              <div className="ml-3 ">
                <Select
                  className="w-40 text-base text-center text-red-500"
                  options={ElecType}
                  onChange={elecTypeHandler}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div>
                <label>Status:</label>
              </div>

              <div className="flex gap-1 ml-16">
                <div className="flex gap-1 ml-2">
                  <div className="transform translate-y-1 ">
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
                  <div className="">
                    <label>New</label>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="transform translate-y-1">
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
                  <div className="">
                    <label>Used</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            {elecType === "Phone" && (
              <div className="">
                <PhoneSpecification getSpec={getSpec} type="filter" />
              </div>
            )}
          </div>
          <div className="mb-1">
            <button
              onClick={saveHandler}
              className="px-3 py-1 bg-red-400 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
        <div className="w-5/6 px-6 mt-4 overflow-y-auto h-5/6">
          {product.length !== 0 &&
            product.map((item) => {
              return (
                <SearchResult
                  key={item.id}
                  price={item.price}
                  name={item.name}
                  description={item.description}
                  image={item.image}
                  status={item.status}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Electronics;
