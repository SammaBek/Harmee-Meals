import { Slider, makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useRef, useState, useReducer } from "react";
import Select from "react-select";
import useHttp from "../hooks/Use-Http";
import SearchResult from "../products/SearchResult";
const Vehicles = () => {
  const defaultSpec = {
    make: null,
    status: null,
    engineSize: null,
    fuel: null,
    transmission: null,
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const Data = await axios({
          method: "GET",
          url: `http://localhost:8000/api/meals/filterProducts/`,
          params: { productCatagory: "Vehicles" },
        });

        setProduct(Data.data.products);
      } catch (err) {
        console.log(err);
      }
    };
    getData();

    console.log(product);
  }, []);

  const SpecReducer = (state, action) => {
    if (action.type === "FUEL") {
      return {
        fuel: action.item,
        transmission: state.transmission,
        make: state.make,
        engineSize: state.engineSize,
        status: state.status,
      };
    }
    if (action.type === "TRANSMISSION") {
      return {
        transmission: action.item,
        make: state.make,
        fuel: state.fuel,
        engineSize: state.engineSize,
        status: state.status,
      };
    }
    if (action.type === "MAKE") {
      return {
        make: action.item,
        fuel: state.fuel,
        transmission: state.transmission,
        engineSize: state.engineSize,
        status: state.status,
      };
    }

    if (action.type === "STATUS") {
      return {
        status: action.item,
        fuel: state.fuel,
        transmission: state.transmission,
        engineSize: state.engineSize,
        make: state.make,
      };
    }

    if (action.type === "ENGINE") {
      return {
        engineSize: action.item,
        fuel: state.fuel,
        transmission: state.transmission,
        status: state.status,
        make: state.make,
      };
    }
  };

  const [state, dispatch] = useReducer(SpecReducer, defaultSpec);

  const minMilageInput = useRef();
  const maxMilageInput = useRef();

  const minPriceInput = useRef();
  const maxPriceInput = useRef();

  const [product, setProduct] = useState([]);

  let specs = {};

  let spec = [];

  const classes = makeStyles({
    className: "text-red-400",
  });
  const options = [
    { value: "BMW", label: "BMW" },
    { value: "Nissan", label: "Nissan" },
    { value: "Ferrari", label: "Ferrari" },
    { value: "Ford", label: "Ford" },
    { value: "Toyota", label: "Toyota" },
  ];

  const Fuel = [
    { value: "Electric", label: "Electric" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "Diesel", label: "Diesel" },
    { value: "Petrol", label: "Petrol" },
  ];
  const Transmission = [
    { value: "Manual", label: "Manual" },
    { value: "Automatic", label: "Automatic" },
  ];

  const makeHandler = (event) => {
    dispatch({ type: "MAKE", item: event.value });
  };
  const statusHandler = (event) => {
    dispatch({ type: "STATUS", item: event.target.value });
  };

  const engineSizeHandler = (index, value) => {
    console.log(value);
    dispatch({ type: "ENGINE", item: value });
  };

  const fuelHandler = (event) => {
    dispatch({ type: "FUEL", item: event.value });
  };
  const transmissionHandler = (event) => {
    dispatch({ type: "TRANSMISSION", item: event.value });
  };

  const saveHandler = async (event) => {
    event.preventDefault();

    if (state.engineSize) {
      specs["specs.engineSize"] = state.engineSize;
    }
    if (state.fuel) {
      specs["specs.fuel"] = state.fuel;
    }
    if (state.transmission) {
      specs["specs.transmission"] = state.transmission;
    }

    if (minMilageInput.current.value && maxMilageInput.current.value) {
      specs["specs.milage"] = {
        $gte: Number(minMilageInput.current.value),
        $lte: maxMilageInput.current.value,
      };
    }

    if (minPriceInput.current.value && maxPriceInput.current.value) {
      specs.price = {
        $gte: minPriceInput.current.value,
        $lte: maxPriceInput.current.value,
      };
    }

    if (state.make) {
      specs["specs.make"] = state.make;
    }

    try {
      const Data = await axios({
        method: "GET",
        url: `http://localhost:8000/api/meals/filterProducts/`,
        params: specs,
      });

      setProduct(Data.data.products);
    } catch (err) {
      console.log(err);
    }

    console.log(specs);
  };

  // useEffect(() => {
  //   if (product) {
  //     console.log(product);
  //   }
  // }, [product]);
  return (
    <div className="flex h-screen gap-24">
      <div className="grid grid-flow-row gap-6 p-3 mt-10 ml-5 w-80 bg-slate-50">
        <div className="flex ">
          <div>Make: </div>
          <div className="ml-3 ">
            <Select
              className="w-40 h-10 text-base text-center text-red-500"
              options={options}
              onChange={makeHandler}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <label>Status:</label>
          <div className="flex gap-1">
            <div className="my-auto ">
              <label className="flex">
                <input
                  name="car-type"
                  value="New"
                  className="hidden peer"
                  type="checkbox"
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
              <label>New</label>
            </div>
          </div>

          <div className="flex gap-1">
            <div className="my-auto ">
              <label className="flex">
                <input
                  name="car-type"
                  value="Used"
                  className="hidden peer"
                  type="checkbox"
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
              <label>Used</label>
            </div>
          </div>
        </div>

        <div className="grid grid-flow-row gap-2 ">
          <label>Milage</label>
          <div className="flex gap-2">
            <label>
              <input
                ref={minMilageInput}
                className="w-24 h-12 text-sm border-2 rounded-md border-slate-600"
              />
              <span className="absolute text-sm text-gray-400 transform -translate-x-16 ">
                min
              </span>
            </label>
            <label>
              <input
                ref={maxMilageInput}
                className="w-24 h-12 text-sm border-2 rounded-md border-slate-600"
              />
              <span className="absolute text-sm text-gray-400 transform -translate-x-16 ">
                max
              </span>
            </label>
          </div>
        </div>
        <div className="grid grid-flow-row gap-2 ">
          <label>Price</label>
          <div className="flex gap-2">
            <label>
              <input
                ref={minPriceInput}
                className="w-24 h-12 text-sm border-2 rounded-md border-slate-600"
              />
              <span className="absolute text-sm text-gray-400 transform -translate-x-16 ">
                min
              </span>
            </label>
            <label>
              <input
                ref={maxPriceInput}
                className="w-24 h-12 text-sm border-2 rounded-md border-slate-600"
              />
              <span className="absolute text-sm text-gray-400 transform -translate-x-16 ">
                max
              </span>
            </label>
          </div>
        </div>

        <div className="flex mt-3">
          <div>Engine Size(cc): </div>
          <div className="w-40 ml-2 text-blue-400">
            <Slider
              aria-labelledby="range-slider"
              defaultValue={1000}
              step={100}
              min={1000}
              max={3000}
              valueLabelDisplay="on"
              className=""
              onChange={engineSizeHandler}
            />
          </div>
        </div>

        <div className="flex ">
          <div>Fuel: </div>
          <div className="ml-3 ">
            <Select
              className="w-40 h-10 text-base text-center text-red-500"
              options={Fuel}
              onChange={fuelHandler}
            />
          </div>
        </div>

        <div className="flex ">
          <div>Transmission: </div>
          <div className="ml-3 ">
            <Select
              className="w-40 h-10 text-base text-center text-red-500"
              options={Transmission}
              onChange={transmissionHandler}
            />
          </div>
        </div>

        <div>
          <button
            onClick={saveHandler}
            className="px-4 py-1 text-white bg-red-400 rounded-lg hover:bg-red-500 "
          >
            Save
          </button>
        </div>
      </div>

      <div className="w-4/6 px-6 mt-4 overflow-y-auto h-5/6">
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
  );
};

export default Vehicles;
