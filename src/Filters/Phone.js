import { useEffect, useReducer, useState } from "react";
import Select from "react-select";
const Phone = (props) => {
  const DefaultState = {
    phoneModel: null,
    phoneCamera: null,
    phoneRam: null,
    phoneStorage: null,
    phoneBrand: null,
  };

  const StateReducer = (state, action) => {
    if (action.type === "MODEL") {
      return {
        phoneModel: action.item,
        phoneCamera: state.phoneCamera,
        phoneRam: state.phoneRam,
        phoneStorage: state.phoneStorage,
        phoneBrand: state.phoneBrand,
      };
    }
    if (action.type === "CAMERA") {
      return {
        phoneCamera: action.item,
        phoneModel: state.phoneModel,
        phoneRam: state.phoneRam,
        phoneStorage: state.phoneStorage,
        phoneBrand: state.phoneBrand,
      };
    }
    if (action.type === "RAM") {
      return {
        phoneRam: action.item,
        phoneCamera: state.phoneCamera,
        phoneModel: state.phoneModel,
        phoneStorage: state.phoneStorage,
        phoneBrand: state.phoneBrand,
      };
    }
    if (action.type === "STORAGE") {
      return {
        phoneStorage: action.item,
        phoneCamera: state.phoneCamera,
        phoneRam: state.phoneRam,
        phoneModel: state.phoneModel,
        phoneBrand: state.phoneBrand,
      };
    }
    if (action.type === "BRAND") {
      return {
        phoneBrand: action.item,
        phoneCamera: state.phoneCamera,
        phoneRam: state.phoneRam,
        phoneModel: state.phoneModel,
        phoneStorage: state.phoneStorage,
      };
    }
  };

  const [state, dispatch] = useReducer(StateReducer, DefaultState);

  const [phone, setPhone] = useState();

  const phones = [
    { value: "Iphone", label: "Iphone" },
    { value: "Samsung", label: "Samsung" },
    { value: "Huawei", label: "Huawei" },
  ];

  const IphoneModel = [
    { value: "Iphone-13", label: "Iphone-13" },
    { value: "Iphone-12", label: "Iphone-12" },
    { value: "Iphone-11", label: "Iphone-11" },
    { value: "Iphone-X", label: "Iphone-X" },
    { value: "Iphone-8", label: "Iphone-8" },
  ];

  const SamsungModel = [
    { value: "Samsung-S22", label: "Samsung-S22" },
    { value: "Samsung-S20", label: "Samsung-S20" },
    { value: "Samsung-A20", label: "Samsung-A20" },
    { value: "Galaxy-Note20", label: "Galaxy-Note20" },
    { value: "Galaxy-Tab-S7", label: "Galaxy-Tab-S7" },
  ];

  const HuaweiModel = [
    { value: "Huawei-p50", label: "Huawei-p50" },
    { value: "Huawei-Mate40", label: "Huawei-Mate40" },
    { value: "Huawei-NovaY60", label: "Huawei-NovaY60" },
  ];

  const phonesHandler = (event) => {
    dispatch({ type: "BRAND", item: event.value });
    setPhone(event.value);
  };

  const modelHandler = (event) => {
    console.log(event.value);
    dispatch({ type: "MODEL", item: event.value });
  };
  const storageHandler = (event) => {
    console.log(event.target.value);
    dispatch({ type: "STORAGE", item: event.target.value });
  };

  const ramHandler = (event) => {
    console.log(event.target.value);
    dispatch({ type: "RAM", item: event.target.value });
  };
  const cameraHandler = (event) => {
    console.log(event.target.value);
    dispatch({ type: "CAMERA", item: event.target.value });
  };

  useEffect(() => {
    if (
      state.phoneBrand &&
      state.phoneCamera &&
      state.phoneModel &&
      state.phoneRam &&
      state.phoneStorage
    ) {
      console.log("PhoneSpecs");
      props.getSpec(state);
    }
  }, [state, props]);

  return (
    <div className="grid grid-flow-row gap-4">
      <div className="flex gap-4">
        <label>Phone Type</label>
        <Select
          className="w-40 ml-9"
          options={phones}
          onChange={phonesHandler}
        />
      </div>

      <div className="flex">
        <label>Model</label>
        <div className="ml-20 ">
          {phone === "Iphone" && (
            <Select
              className="w-40 ml-3"
              options={IphoneModel}
              onChange={modelHandler}
            />
          )}

          {phone === "Samsung" && (
            <Select
              className="w-40 ml-3"
              options={SamsungModel}
              onChange={modelHandler}
            />
          )}

          {phone === "Huawei" && (
            <Select
              className="w-40 ml-3"
              options={HuaweiModel}
              onChange={modelHandler}
            />
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <label className="my-auto ">Storage(GB)</label>
        <input
          type="number"
          className="w-20 h-8 p-1 border-2 border-gray-300 rounded-md"
          onChange={storageHandler}
        />
      </div>

      <div className="flex gap-10">
        <label className="my-auto ">RAM(GB)</label>
        <input
          type="number"
          className="w-20 h-8 p-1 border-2 border-gray-300 rounded-md"
          onChange={ramHandler}
        />
      </div>

      <div className="flex gap-4">
        <label className="my-auto ">Camera(MP)</label>
        <input
          type="number"
          className="w-20 h-8 p-1 border-2 border-gray-300 rounded-md"
          onChange={cameraHandler}
        />
      </div>
    </div>
  );
};

export default Phone;
