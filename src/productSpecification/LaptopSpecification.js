import { useEffect, useReducer } from "react";
import Select from "react-select";
const LaptopSpecification = (props) => {
  const Brand = [
    { value: "Apple", label: "Apple" },
    { value: "Dell", label: "Dell" },
    { value: "HP", label: "HP" },
    { value: "Lenovo", label: "Lenovo" },
    { value: "Asus", label: "Asus" },
    { value: "Microsoft Surface", label: "Microsoft Surface" },
    { value: "Acer", label: "Acer" },
  ];

  const ScreenSize = [
    { value: "14", label: "14-Inch" },
    { value: "15", label: "15-Inch" },
    { value: "16", label: "16-Inch" },
    { value: "17", label: "17-Inch" },
  ];

  const Processors = [
    { value: "Apple-M1", label: "Apple-M1" },
    { value: "Apple-M1-Pro", label: "Apple-M1-Pro" },
    { value: "Apple-M1-Max", label: "Apple-M1-Max" },
    { value: "Intel-Core-i9", label: "Intel-Core-i9" },
    { value: "Intel-Core-i7", label: "Intel-Core-i7" },
    { value: "Intel-Core-i5", label: "Intel-Core-i5" },
    { value: "Intel-Core-i3", label: "Intel-Core-i3" },
  ];

  const Year = [
    { value: "2015", label: "2015" },
    { value: "2016", label: "2016" },
    { value: "2017", label: "2017" },
    { value: "2018", label: "2018" },
    { value: "2019", label: "2019" },
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
  ];
  const Storage = [
    { value: "120", label: "120GB" },
    { value: "256", label: "256GB" },
    { value: "500", label: "500GB" },
    { value: "1TB", label: "1TB" },
    { value: "2TB", label: "2TB" },
  ];

  const DefaultState = {
    laptopScreenSize: null,
    laptopProcessor: null,
    laptopBrand: null,
    laptopModel: null,
    laptopRam: null,
    laptopStorage: null,
    ElectronicType: "Laptop",
  };

  const StateReducer = (state, action) => {
    if (action.type === "BRAND") {
      return {
        laptopBrand: action.item,
        laptopStorage: state.laptopStorage,
        laptopScreenSize: state.laptopScreenSize,
        laptopModel: state.laptopModel,
        laptopRam: state.laptopRam,
        ElectronicType: state.ElectronicType,
        laptopProcessor: state.laptopProcessor,
      };
    }
    if (action.type === "RAM") {
      return {
        laptopRam: action.item,
        laptopStorage: state.laptopStorage,
        laptopScreenSize: state.laptopScreenSize,
        laptopModel: state.laptopModel,
        laptopBrand: state.laptopBrand,
        ElectronicType: state.ElectronicType,
        laptopProcessor: state.laptopProcessor,
      };
    }
    if (action.type === "SCREENSIZE") {
      return {
        laptopScreenSize: action.item,
        laptopStorage: state.laptopStorage,
        laptopBrand: state.laptopBrand,
        laptopModel: state.laptopModel,
        laptopRam: state.laptopRam,
        ElectronicType: state.ElectronicType,
        laptopProcessor: state.laptopProcessor,
      };
    }
    if (action.type === "STORAGE") {
      return {
        laptopStorage: action.item,
        laptopBrand: state.laptopBrand,
        laptopScreenSize: state.laptopScreenSize,
        laptopModel: state.laptopModel,
        laptopRam: state.laptopRam,
        ElectronicType: state.ElectronicType,
        laptopProcessor: state.laptopProcessor,
      };
    }
    if (action.type === "MODEL") {
      return {
        laptopModel: action.item,
        laptopStorage: state.laptopStorage,
        laptopScreenSize: state.laptopScreenSize,
        laptopBrand: state.laptopBrand,
        laptopRam: state.laptopRam,
        ElectronicType: state.ElectronicType,
        laptopProcessor: state.laptopProcessor,
      };
    }
    if (action.type === "PROCESSOR") {
      return {
        laptopProcessor: action.item,
        laptopStorage: state.laptopStorage,
        laptopScreenSize: state.laptopScreenSize,
        laptopModel: state.laptopModel,
        laptopRam: state.laptopRam,
        ElectronicType: state.ElectronicType,
        laptopBrand: state.laptopBrand,
      };
    }
  };

  const [state, dispatch] = useReducer(StateReducer, DefaultState);

  const brandHandler = (inputValue, { action, prevInputValue }) => {
    console.log(inputValue);
    if (action === "clear") {
      dispatch({ type: "BRAND", item: null });
    } else {
      dispatch({ type: "BRAND", item: inputValue.value });
    }
  };

  const screenSizeHandler = (inputValue, { action, prevInputValue }) => {
    console.log(inputValue);
    if (action === "clear") {
      dispatch({ type: "SCREENSIZE", item: null });
    } else {
      dispatch({ type: "SCREENSIZE", item: inputValue.value });
    }
  };
  const modelHandler = (event) => {
    console.log(event.target.value);
    dispatch({ type: "MODEL", item: event.target.value });
  };

  const processorHandler = (inputValue, { action, prevInputValue }) => {
    console.log(inputValue);
    if (action === "clear") {
      dispatch({ type: "PROCESSOR", item: null });
    } else {
      dispatch({ type: "PROCESSOR", item: inputValue.value });
    }
  };

  const storageHandler = (inputValue, { action, prevInputValue }) => {
    console.log(inputValue);
    if (action === "clear") {
      dispatch({ type: "STORAGE", item: null });
    } else {
      dispatch({ type: "STORAGE", item: inputValue.value });
    }
  };

  const ramHandler = (event) => {
    console.log(event.target.value);
    dispatch({ type: "RAM", item: event.target.value });
  };

  useEffect(() => {
    if (props.type === "filter") {
      props.getSpec(state);
    } else {
      if (
        state.laptopBrand &&
        state.laptopModel &&
        state.laptopProcessor &&
        state.laptopRam &&
        state.laptopScreenSize &&
        state.laptopStorage
      ) {
        console.log("Laptop");
        props.getSpec(state);
      }
    }
  }, [state, props]);

  useEffect(() => {
    if (props.editLaptop) {
      dispatch({ type: "BRAND", item: props.editLaptop.laptopBrand });
      dispatch({ type: "MODEL", item: props.editLaptop.laptopModel });
      dispatch({ type: "PROCESSOR", item: props.editLaptop.laptopProcessor });
      dispatch({ type: "SCREENSIZE", item: props.editLaptop.laptopScreenSize });
      dispatch({ type: "RAM", item: props.editLaptop.laptopRam });
      dispatch({ type: "STORAGE", item: props.editLaptop.laptopStorage });
    }
  }, []);

  return (
    <div className="grid grid-flow-row gap-2 mt-1 sm:mt-1 sm:gap-2">
      <div className="grid">
        <div className="lg:text-lg">Brand: </div>
        <div className="ml-0">
          <Select
            className="w-40 h-10 ml-0 text-base text-center text-red-500 md:w-48 "
            options={Brand}
            onChange={brandHandler}
            isClearable
            defaultValue={{
              value: `${
                props.editLaptop ? props.editLaptop.laptopBrand : null
              }`,
              label: `${
                props.editLaptop ? props.editLaptop.laptopBrand : "select"
              }`,
            }}
          />
        </div>
      </div>

      <div className="grid">
        <div className="lg:text-lg">Screen Size:</div>
        <div className="ml-0 ">
          <Select
            className="w-40 h-10 ml-0 text-base text-center text-red-500 md:w-48"
            options={ScreenSize}
            onChange={screenSizeHandler}
            isClearable
            defaultValue={{
              value: `${
                props.editLaptop ? props.editLaptop.laptopScreenSize : null
              }`,
              label: `${
                props.editLaptop ? props.editLaptop.laptopScreenSize : "select"
              }`,
            }}
          />
        </div>
      </div>

      <div className="grid lg:text-lg">
        <div>Processors:</div>
        <div className="ml-0">
          <Select
            className="w-40 h-10 ml-0 text-base text-center text-red-500 md:w-48"
            options={Processors}
            onChange={processorHandler}
            isClearable
            defaultValue={{
              value: `${
                props.editLaptop ? props.editLaptop.laptopProcessor : null
              }`,
              label: `${
                props.editLaptop ? props.editLaptop.laptopProcessor : "select"
              }`,
            }}
          />
        </div>
      </div>

      <div className="grid">
        <div className="lg:text-lg">Storage:</div>
        <div className="ml-0">
          <Select
            className="w-40 h-10 ml-0 text-base text-center text-red-500 md:w-48 "
            options={Storage}
            onChange={storageHandler}
            isClearable
            defaultValue={{
              value: `${
                props.editLaptop ? props.editLaptop.laptopStorage : null
              }`,
              label: `${
                props.editLaptop ? props.editLaptop.laptopStorage : "select"
              }`,
            }}
          />
        </div>
      </div>

      <div className="grid gap-0 ">
        <label className="my-auto ml-0 lg:text-lg">RAM(GB)</label>
        <input
          type="number"
          className="w-40 h-8 p-1 ml-0 border-2 border-gray-300 rounded-md md:w-48"
          onChange={ramHandler}
          defaultValue={props.editLaptop ? props.editLaptop.laptopRam : null}
        />
      </div>

      <div className="grid gap-0 ">
        <label className="my-auto lg:text-lg">Model</label>
        <input
          type="text"
          className="w-40 h-8 p-1 ml-0 border-2 border-gray-300 rounded-md md:w-48"
          onChange={modelHandler}
          defaultValue={props.editLaptop ? props.editLaptop.laptopModel : null}
        />
      </div>
    </div>
  );
};

export default LaptopSpecification;
