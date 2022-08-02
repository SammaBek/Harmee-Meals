import { useEffect, useReducer, useState } from "react";
import Select from "react-select";
const PhoneSpecification = (props) => {
  const DefaultState = {
    phoneModel: null,
    phoneCamera: null,
    phoneRam: null,
    phoneStorage: null,
    phoneBrand: null,
    ElectronicType: "Phone",
  };

  const StateReducer = (state, action) => {
    if (action.type === "MODEL") {
      return {
        phoneModel: action.item,
        phoneCamera: state.phoneCamera,
        phoneRam: state.phoneRam,
        phoneStorage: state.phoneStorage,
        phoneBrand: state.phoneBrand,
        ElectronicType: state.ElectronicType,
      };
    }
    if (action.type === "CAMERA") {
      return {
        phoneCamera: action.item,
        phoneModel: state.phoneModel,
        phoneRam: state.phoneRam,
        phoneStorage: state.phoneStorage,
        phoneBrand: state.phoneBrand,
        ElectronicType: state.ElectronicType,
      };
    }
    if (action.type === "RAM") {
      return {
        phoneRam: action.item,
        phoneCamera: state.phoneCamera,
        phoneModel: state.phoneModel,
        phoneStorage: state.phoneStorage,
        phoneBrand: state.phoneBrand,
        ElectronicType: state.ElectronicType,
      };
    }
    if (action.type === "STORAGE") {
      return {
        phoneStorage: action.item,
        phoneCamera: state.phoneCamera,
        phoneRam: state.phoneRam,
        phoneModel: state.phoneModel,
        phoneBrand: state.phoneBrand,
        ElectronicType: state.ElectronicType,
      };
    }
    if (action.type === "BRAND") {
      return {
        phoneBrand: action.item,
        phoneCamera: state.phoneCamera,
        phoneRam: state.phoneRam,
        phoneModel: state.phoneModel,
        phoneStorage: state.phoneStorage,
        ElectronicType: state.ElectronicType,
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

  const storage = [
    { value: 4, label: "4GB" },
    { value: 6, label: "6GB" },
    { value: 8, label: "8GB" },
    { value: 16, label: "16GB" },
    { value: 32, label: "32GB" },
    { value: 64, label: "64GB" },
    { value: 128, label: "128GB" },
    { value: 256, label: "256GB" },
    { value: 512, label: "512GB" },
    { value: 1012, label: "1TB" },
  ];

  const phonesHandler = (inputValue, { action, prevInputValue }) => {
    console.log(inputValue);
    if (action === "clear") {
      dispatch({ type: "BRAND", item: null });
      setPhone(null);
    } else {
      dispatch({ type: "BRAND", item: inputValue.value });
      setPhone(inputValue.value);
    }
  };

  const modelHandler = (inputValue, { action, prevInputValue }) => {
    console.log(inputValue);
    if (action === "clear") {
      dispatch({ type: "MODEL", item: null });
    } else {
      dispatch({ type: "MODEL", item: inputValue.value });
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
  const cameraHandler = (event) => {
    console.log(event.target.value);
    dispatch({ type: "CAMERA", item: event.target.value });
  };

  useEffect(() => {
    if (props.editPhone) {
      setPhone(props.editPhone.phoneBrand);
      dispatch({ type: "BRAND", item: props.editPhone.phoneBrand });
      dispatch({ type: "MODEL", item: props.editPhone.phoneModel });
      dispatch({ type: "STORAGE", item: props.editPhone.phoneStorage });
      dispatch({ type: "RAM", item: props.editPhone.phoneRam });
      dispatch({ type: "CAMERA", item: props.editPhone.phoneCamera });
    }
  }, []);

  useEffect(() => {
    if (props.type === "filter") {
      props.getSpec(state);
    } else {
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
    }
  }, [state, props]);

  return (
    <div className="grid grid-flow-row gap-2 sm:gap-2 ">
      <div className="grid gap-0 ">
        <label className="lg:text-lg">Phone Type</label>
        <Select
          className="ml-0 w-44 md:w-48"
          options={phones}
          isClearable
          onChange={phonesHandler}
          defaultValue={{
            value: `${props.editPhone ? props.editPhone.phoneBrand : null}`,
            label: `${props.editPhone ? props.editPhone.phoneBrand : null}`,
          }}
        />
      </div>

      <div className="grid">
        {phone && <label className="lg:text-lg">Model</label>}

        <div className="ml-0 ">
          {phone === "Iphone" && (
            <Select
              className="ml-0 w-44 md:w-48"
              options={IphoneModel}
              isClearable
              onChange={modelHandler}
              defaultValue={{
                value: `${props.editPhone ? props.editPhone.phoneModel : null}`,
                label: `${props.editPhone ? props.editPhone.phoneModel : null}`,
              }}
            />
          )}

          {phone === "Samsung" && (
            <Select
              className="ml-0 w-44 md:w-48"
              options={SamsungModel}
              isClearable
              onChange={modelHandler}
              defaultValue={{
                value: `${props.editPhone ? props.editPhone.phoneModel : null}`,
                label: `${props.editPhone ? props.editPhone.phoneModel : null}`,
              }}
            />
          )}

          {phone === "Huawei" && (
            <Select
              className="ml-0 w-44 md:w-48"
              options={HuaweiModel}
              isClearable
              onChange={modelHandler}
              defaultValue={{
                value: `${props.editPhone ? props.editPhone.phoneModel : null}`,
                label: `${props.editPhone ? props.editPhone.phoneModel : null}`,
              }}
            />
          )}
        </div>
      </div>

      <div className="grid gap-0 ">
        <label className="my-auto lg:text-lg">Storage(GB)</label>

        <Select
          options={storage}
          isClearable
          onChange={storageHandler}
          className="ml-0 w-44 md:w-48"
          defaultValue={{
            value: `${props.editPhone ? props.editPhone.phoneStorage : null}`,
            label: `${props.editPhone ? props.editPhone.phoneStorage : null}`,
          }}
        />
      </div>

      <div className="grid gap-0 ">
        <label className="my-auto lg:text-lg">RAM(GB)</label>
        <input
          min="1"
          max="32"
          type="number"
          className="h-8 p-1 ml-0 border border-gray-300 rounded-md w-44 md:w-48"
          onChange={ramHandler}
          defaultValue={props.editPhone ? props.editPhone.phoneRam : null}
        />
      </div>

      <div className="grid gap-0 ">
        <label className="my-auto lg:text-lg">Camera(MP)</label>
        <input
          min="1"
          max="120"
          type="number"
          className="h-8 p-1 ml-0 border border-gray-300 rounded-md w-44 md:w-48"
          onChange={cameraHandler}
          defaultValue={props.editPhone ? props.editPhone.phoneCamera : null}
        />
      </div>
    </div>
  );
};

export default PhoneSpecification;
