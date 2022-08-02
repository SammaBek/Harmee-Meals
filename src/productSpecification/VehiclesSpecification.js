import { useEffect, useReducer, useState } from "react";
import Select from "react-select";
import ElectronicsSpecification from "./ElectronicsSpecification";
import { Slider } from "@material-ui/core";
const VehiclesSpecification = (props) => {
  console.log(props);
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
    if (props.editSpecs) {
      console.log(props.editSpecs);
      dispatch({ type: "MAKE", item: props.editSpecs.specs.make });
      dispatch({ type: "FUEL", item: props.editSpecs.specs.fuel });
      dispatch({
        type: "TRANSMISSION",
        item: props.editSpecs.specs.transmission,
      });
      dispatch({ type: "MILAGE", item: props.editSpecs.specs.milage });
      dispatch({ type: "ENGINE", item: props.editSpecs.specs.engineSize });
    }
  }, []);

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

        if (props.editSpecs) {
          props.fetchUpdate(state);
        } else {
          props.getData(state);
        }
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
    { value: "Tesla", label: "Tesla" },
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
          : "rounded-lg shadow-2xl border w-80 sm:w-[90%] sm:px-2 sm:p-4 md:px-8 md:w-[85%] lg:w-[80%] lg:px-10 xl:w-[70%] "
      } `}
    >
      <div className="mx-auto mt-2 font-bold text-center lg:text-lg">
        Vehicle Specification
      </div>
      <div className="grid grid-flow-row gap-2 p-1 px-3  mt-4 sm:mt-1 mb-2 overflow-y-auto sm:p-1 sm:gap-3 h-96 sm:h-[100%]">
        <div className="grid gap-7">
          <div className="my-auto lg:text-lg">Engine Size(cc): </div>
          <div className="w-40 mt-1 ml-3 text-blue-400 sm:w-32 md:w-48">
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
        <div className="grid ">
          <div className="my-auto lg:text-lg">Make: </div>
          <div className="ml-0">
            <Select
              className="w-40 h-10 ml-0 text-base text-center text-red-500 sm:w-44 md:w-48"
              options={options}
              onChange={makeHandler}
              isClearable
              defaultValue={{
                value: `${props.editSpecs ? props.editSpecs.specs.make : null}`,
                label: `${props.editSpecs ? props.editSpecs.specs.make : null}`,
              }}
            />
          </div>
        </div>

        <div className="grid">
          <div className="my-auto lg:text-lg">Fuel: </div>
          <div className="ml-0 ">
            <Select
              className="w-40 h-10 ml-0 text-base text-center text-red-500 sm:w-44 md:w-48"
              options={Fuel}
              isClearable
              // closeMenuOnSelect
              onChange={fuelHandler}
              // onInputChange={fuelHandler}

              defaultValue={{
                value: `${props.editSpecs ? props.editSpecs.specs.fuel : null}`,
                label: `${props.editSpecs ? props.editSpecs.specs.fuel : null}`,
              }}
            />
          </div>
        </div>

        <div className="grid">
          <div className="my-auto lg:text-lg">Transmission: </div>
          <div className="ml-0">
            <Select
              className="w-40 h-10 text-base text-center text-red-500 sm:w-44 md:w-48"
              options={Transmission}
              onChange={transmissionHandler}
              isClearable
              defaultValue={{
                value: `${
                  props.editSpecs ? props.editSpecs.specs.transmission : null
                }`,
                label: `${
                  props.editSpecs ? props.editSpecs.specs.transmission : null
                }`,
              }}
            />
          </div>
        </div>
        <div className="grid ">
          <div className="my-auto lg:text-lg">Milage(KM)</div>
          <div className="flex ml-0">
            <input
              type="number"
              onChange={milageHandler}
              defaultValue={
                props.editSpecs ? props.editSpecs.specs.milage : null
              }
              className="w-40 h-8 px-2 py-2 text-sm border rounded-md sm:w-32 md:w-48 border-slate-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclesSpecification;
