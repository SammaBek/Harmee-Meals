import { useEffect, useReducer, useState } from "react";
import Select from "react-select";
import ElectronicsSpecification from "./ElectronicsSpecification";
import { Slider } from "@material-ui/core";
const VehiclesSpecification = (props) => {
  const defaultState = {
    fuel: null,
    transmission: null,
    make: null,
    milage: null,
    engineSize: null,
  };

  const stateReducer = (state, action) => {
    if (action.type === "FUEL") {
      return {
        fuel: action.item,
        transmission: state.transmission,
        make: state.make,
        milage: state.milage,
        engineSize: state.engineSize,
      };
    }
    if (action.type === "TRANSMISSION") {
      return {
        transmission: action.item,
        make: state.make,
        fuel: state.fuel,
        milage: state.milage,
        engineSize: state.engineSize,
      };
    }
    if (action.type === "MAKE") {
      return {
        make: action.item,
        fuel: state.fuel,
        transmission: state.transmission,
        milage: state.milage,
        engineSize: state.engineSize,
      };
    }

    if (action.type === "MILAGE") {
      return {
        milage: action.item,
        fuel: state.fuel,
        transmission: state.transmission,
        make: state.make,
        engineSize: state.engineSize,
      };
    }

    if (action.type === "ENGINE") {
      return {
        engineSize: action.item,
        fuel: state.fuel,
        transmission: state.transmission,
        make: state.make,
        milage: state.milage,
      };
    }

    return defaultState;
  };

  const [state, dispatch] = useReducer(stateReducer, defaultState);

  useEffect(() => {
    if (props.type === "filter") {
      props.getData(state);
    } else {
      if (
        state.fuel &&
        state.transmission &&
        state.make &&
        state.milage &&
        state.engineSize
      ) {
        console.log("hello");
        props.getData(state);
      }
    }
  }, [state, props]);

  const makeHandler = (inputValue, { action, prevInputValue }) => {
    console.log(inputValue);
    console.log(prevInputValue);
    console.log(action);
    if (action === "clear") {
      dispatch({ type: "MAKE", item: null });
      console.log("hello clear");
    } else {
      dispatch({ type: "MAKE", item: inputValue.value });
    }
  };

  const fuelHandler = (inputValue, { action, prevInputValue }) => {
    console.log(inputValue);
    if (action === "clear") {
      dispatch({ type: "FUEL", item: null });
      console.log("hello clear");
    } else {
      dispatch({ type: "FUEL", item: inputValue.value });
    }
  };

  const transmissionHandler = (inputValue, { action, prevInputValue }) => {
    console.log(inputValue);
    if (action === "clear") {
      dispatch({ type: "TRANSMISSION", item: null });
      console.log("hello clear");
    } else {
      dispatch({ type: "TRANSMISSION", item: inputValue.value });
    }
  };

  const milageHandler = (event) => {
    console.log(event.target.value);
    dispatch({ type: "MILAGE", item: event.target.value });
  };

  const engineSizeHandler = (index, value) => {
    console.log(value);
    dispatch({ type: "ENGINE", item: value });
  };

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
  return (
    <div
      className={`grid h-auto grid-flow-row  ${
        props.type === "filter"
          ? "w-80 sm:w-72 "
          : "rounded-lg shadow-xl w-96 sm:w-72 "
      } `}
    >
      <div className="mx-auto mt-2 text-center">Vehicle Specification</div>
      <div className="grid grid-flow-row gap-5 p-4 mt-4 mb-2 overflow-y-auto sm:p-1 sm:gap-8 h-80">
        <div className="flex mt-6">
          <div className="my-auto ">Engine Size(cc): </div>
          <div className="w-40 ml-4 text-blue-400 sm:w-32">
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
          <div className="my-auto ">Make: </div>
          <div className="ml-16 ">
            <Select
              className="w-40 h-10 ml-3 text-base text-center text-red-500 sm:w-32"
              options={options}
              onChange={makeHandler}
              isClearable
            />
          </div>
        </div>

        <div className="flex ">
          <div className="my-auto ">Fuel: </div>
          <div className="ml-20 ">
            <Select
              className="w-40 h-10 ml-1 text-base text-center text-red-500 sm:w-32"
              options={Fuel}
              isClearable
              // closeMenuOnSelect
              onChange={fuelHandler}
              // onInputChange={fuelHandler}
            />
          </div>
        </div>

        <div className="flex ">
          <div className="my-auto ">Transmission: </div>
          <div className="ml-5">
            <Select
              className="w-40 h-10 text-base text-center text-red-500 sm:w-32"
              options={Transmission}
              onChange={transmissionHandler}
              isClearable
            />
          </div>
        </div>
        <div className="flex gap-2 ">
          <div className="my-auto ">Milage(KM)</div>
          <div className="flex gap-2 ml-7">
            <input
              type="number"
              onChange={milageHandler}
              className="w-40 h-8 px-2 py-2 text-sm border rounded-md sm:w-32 border-slate-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclesSpecification;
