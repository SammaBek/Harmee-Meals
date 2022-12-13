import { useRef, useState } from "react";
import Select, { InputActionMeta } from "react-select";
import PhoneSpecification from "./PhoneSpecification";
import TvSpecification from "./TvSpecification";
import LaptopSpecification from "./LaptopSpecification";
import { useSelector } from "react-redux";
const ElectronicsSpecification = (props) => {
  console.log(props.type);

  let count;
  const [elecType, setElecType] = useState(
    `${props.editSpecs ? props.editSpecs.specs.ElectronicType : null}`
  );

  const products = [
    { value: "Phone", label: "Phone" },
    { value: "TV", label: "TV" },
    { value: "Laptop", label: "Laptop" },
  ];

  const productHandler = (inputValue, { action, prevInputValue }) => {
    const finalSpec = {};

    console.log(action);
    if (action === "clear") {
      setElecType(null);
      finalSpec["ElectronicType"] = null;
    } else {
      console.log(inputValue.value);
      setElecType(inputValue.value);
      finalSpec["ElectronicType"] = inputValue.value;
    }

    // props.getData(finalSpec);
  };

  const getSpecification = (specs) => {
    if (props.editSpecs) {
      console.log(specs);
      props.fetchUpdate(specs);
    } else {
      props.getData(specs);
    }
  };

  return (
    <div
      className={`grid grid-flow-row   ${
        props.type === "filter"
          ? "w-80 sm:w-80"
          : " border  shadow-2xl w-80 sm:w-[90%] p-3 sm:p-4 md:px-8 md:w-[85%] lg:w-[80%] lg:px-10 xl:px-14 xl:w-[70%]"
      } `}
    >
      <div className="mt-2 mb-2 text-base font-bold sm:text-base md:mx-auto md:text-center lg:text-lg">
        Electronics Specification
      </div>
      <div className="grid py-1 sm:mt-2">
        <div className="text-base sm:text-base lg:text-lg">
          Electronics Type:{" "}
        </div>
        <div className="ml-0 ">
          <Select
            className="text-sm text-center text-red-500 w-44 sm:text-base md:w-48"
            options={products}
            onChange={productHandler}
            // onInputChange={productHandler}
            isClearable
            defaultValue={
              !props.type === "filter"
                ? {
                    value: `${
                      props.editSpecs
                        ? props.editSpecs.specs.ElectronicType
                        : products[0]
                    }`,
                    label: `${
                      props.editSpecs
                        ? props.editSpecs.specs.ElectronicType
                        : products[0]
                    }`,
                  }
                : ""
            }
          />
        </div>
      </div>
      <div
        className={`grid grid-flow-row ${
          elecType ? "block" : "hidden"
        }  mt-4 mb-2 overflow-y-auto  h-auto sm:w-[80%]`}
      >
        <div>
          {elecType === "Phone" && (
            <div>
              <PhoneSpecification
                type={props.type}
                getSpec={getSpecification}
                editPhone={props.editSpecs ? props.editSpecs.specs : null}
              />
            </div>
          )}
          {elecType === "TV" && (
            <div>
              <TvSpecification
                type={props.type}
                getSpec={getSpecification}
                editTV={props.editSpecs ? props.editSpecs.specs : null}
              />
            </div>
          )}
          {elecType === "Laptop" && (
            <div>
              <LaptopSpecification
                type={props.type}
                getSpec={getSpecification}
                editLaptop={props.editSpecs ? props.editSpecs.specs : null}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElectronicsSpecification;
