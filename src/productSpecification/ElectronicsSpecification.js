import { useState } from "react";
import Select from "react-select";
import PhoneSpecification from "./PhoneSpecification";
import TvSpecification from "./TvSpecification";
import LaptopSpecification from "./LaptopSpecification";
const ElectronicsSpecification = (props) => {
  console.log(props.type);
  const [elecType, setElecType] = useState();
  const products = [
    { value: "Phone", label: "Phone" },
    { value: "TV", label: "TV" },
    { value: "Laptop", label: "Laptop" },
  ];

  const productHandler = (inputValue, { action, prevInputValue }) => {
    const finalSpec = {};
    if (action === "clear") {
      setElecType(null);
      finalSpec["ElectronicType"] = null;
    } else {
      console.log(inputValue.value);
      setElecType(inputValue.value);
      finalSpec["ElectronicType"] = inputValue.value;
    }

    props.getData(finalSpec);
  };

  const getSpecification = (specs) => {
    console.log(specs);

    props.getData(specs);
  };

  return (
    <div
      className={`grid grid-flow-row   ${
        props.type === "filter" ? "w-80 sm:w-80" : "  shadow-2xl w-96"
      } `}
    >
      <div className="mx-auto mt-2 text-center">Electronics Specification</div>
      <div className="flex py-2">
        <div>Electronics Type: </div>
        <div className="ml-3 ">
          <Select
            className="w-40 text-base text-center text-red-500"
            options={products}
            onChange={productHandler}
            isClearable
          />
        </div>
      </div>
      <div
        className={`grid grid-flow-row ${
          elecType ? "block" : "hidden"
        }  mt-4 mb-2 overflow-y-auto h-80`}
      >
        <div>
          {elecType === "Phone" && (
            <div>
              <PhoneSpecification
                type={props.type}
                getSpec={getSpecification}
              />
            </div>
          )}
          {elecType === "TV" && (
            <div>
              <TvSpecification type={props.type} getSpec={getSpecification} />
            </div>
          )}
          {elecType === "Laptop" && (
            <div>
              <LaptopSpecification
                type={props.type}
                getSpec={getSpecification}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElectronicsSpecification;
