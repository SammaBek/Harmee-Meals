import { useEffect, useReducer } from "react";
import Select from "react-select";
const TvSpecification = (props) => {
  console.log(props);
  const Brand = [
    { value: "Sony", label: "Sony" },
    { value: "LG", label: "LG" },
    { value: "Samsung", label: "Samsung" },
    { value: "Hisense", label: "Hisense" },
    { value: "Panasonic", label: "Panasonic" },
  ];

  const ScreenSize = [
    { value: "32", label: "32-Inch" },
    { value: "42", label: "42-Inch" },
    { value: "50", label: "50-Inch" },
    { value: "55", label: "55-Inch" },
    { value: "65", label: "65-Inch" },
    { value: "75", label: "75-Inch" },
  ];

  const Resolution = [
    { value: "FHD", label: "FHD" },
    { value: "4K", label: "4K" },
    { value: "6K", label: "6K" },
    { value: "8K", label: "8K" },
  ];

  const DefaultState = {
    tvScreenSize: null,
    tvResolution: null,
    tvBrand: null,
    tvModel: null,
    ElectronicType: "TV",
  };

  const StateReducer = (state, action) => {
    if (action.type === "BRAND") {
      return {
        tvBrand: action.item,
        tvResolution: state.tvResolution,
        tvScreenSize: state.tvScreenSize,
        tvModel: state.tvModel,
        ElectronicType: state.ElectronicType,
      };
    }
    if (action.type === "RESOLUTION") {
      return {
        tvResolution: action.item,
        tvBrand: state.tvBrand,
        tvScreenSize: state.tvScreenSize,
        tvModel: state.tvModel,
        ElectronicType: state.ElectronicType,
      };
    }
    if (action.type === "SCREENSIZE") {
      return {
        tvScreenSize: action.item,
        tvResolution: state.tvResolution,
        tvBrand: state.tvBrand,
        tvModel: state.tvModel,
        ElectronicType: state.ElectronicType,
      };
    }
    if (action.type === "MODEL") {
      return {
        tvModel: action.item,
        tvResolution: state.tvResolution,
        tvBrand: state.tvBrand,
        tvScreenSize: state.tvScreenSize,
        ElectronicType: state.ElectronicType,
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

  const resolutionHandler = (inputValue, { action, prevInputValue }) => {
    console.log(inputValue);
    if (action === "clear") {
      dispatch({ type: "RESOLUTION", item: null });
    } else {
      dispatch({ type: "RESOLUTION", item: inputValue.value });
    }
  };

  useEffect(() => {
    if (props.editTV) {
      dispatch({ type: "BRAND", item: props.editTV.tvBrand });
      dispatch({ type: "MODEL", item: props.editTV.tvModel });
      dispatch({ type: "RESOLUTION", item: props.editTV.tvResolution });
      dispatch({ type: "SCREENSIZE", item: props.editTV.tvScreenSize });
    }
  }, []);

  useEffect(() => {
    if (props.type === "filter") {
      props.getSpec(state);
    } else {
      if (
        state.tvBrand &&
        state.tvModel &&
        state.tvResolution &&
        state.tvScreenSize
      ) {
        console.log("TV");
        props.getSpec(state);
      }
    }
  }, [state, props]);

  return (
    <div className="grid grid-flow-row gap-2 ">
      <div className="grid">
        <div className="lg:text-lg">Brand:</div>
        <div className="ml-0 ">
          <Select
            className="w-40 h-10 ml-0 text-base text-center text-red-500 md:w-48 "
            options={Brand}
            onChange={brandHandler}
            isClearable
            defaultValue={{
              value: `${props.editTV ? props.editTV.tvBrand : null}`,
              label: `${props.editTV ? props.editTV.tvBrand : null}`,
            }}
          />
        </div>
      </div>

      <div className="grid gap-0">
        <div className="lg:text-lg">Model</div>
        <div className="ml-0">
          <input
            onChange={modelHandler}
            className="w-40 p-1 ml-0 text-sm border rounded-md md:w-48 h-9 border-slate-300"
            defaultValue={`${
              props.editTV.tvModel ? props.editTV.tvModel : null
            }`}
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
              value: `${props.editTV ? props.editTV.tvScreenSize : null}`,
              label: `${props.editTV ? props.editTV.tvScreenSize : null}`,
            }}
          />
        </div>
      </div>

      <div className="grid">
        <div className="lg:text-lg">Resolution: </div>
        <div className="ml-0">
          <Select
            className="w-40 text-base text-center text-red-500 md:w-48"
            options={Resolution}
            onChange={resolutionHandler}
            isClearable
            defaultValue={{
              value: `${props.editTV ? props.editTV.tvResolution : null}`,
              label: `${props.editTV ? props.editTV.tvResolution : null}`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TvSpecification;
