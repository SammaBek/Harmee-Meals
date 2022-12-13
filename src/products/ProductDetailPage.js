import Vehicles from "../Filters/Vehicles";
import SearchResult from "./SearchResult";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import VehiclesSpecification from "../productSpecification/VehiclesSpecification";
import ElectronicsSpecification from "../productSpecification/ElectronicsSpecification";
const ProductDetailPage = (props) => {
  const CatagoriesList = [
    { value: "Home-Appliance", label: "Home-Appliance" },
    { value: "Vehicles", label: "Vehicles" },
    { value: "Electronics", label: "Electronics" },
    { value: "Clothing", label: "Clothing" },
    { value: "Home-Furniture", label: "Home-Furniture" },
    { value: "Gym-Equipment", label: "Gym-Equipment" },
  ];
  const [specification, setSpecification] = useState();
  const [catagories, setCatagories] = useState();
  const [finalSpec, setFinalSpec] = useState();
  const showMessage = useSelector((state) => state.message.showMessage);

  const [data, setData] = useState([]);
  const searchInput = useRef();

  const [search, setSearch] = useState();

  let specs = {};

  const searchHandler = (event) => {
    if (event.key === "Enter") {
      console.log("searched", searchInput.current.value);
      setSearch(searchInput.current.value);
    }
  };

  console.log(props.search);
  console.log(search);

  useEffect(() => {
    const getData = async () => {
      if (props.search) {
        setSearch(props.search);
        console.log(props.search);
      }

      console.log(props.catagories);
      if (props.catagories) {
        specs["productCatagory"] = props.catagories;
        console.log(specs);
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

          setData(Data.data.products);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (search) {
        try {
          console.log(search);
          const Data = await axios({
            method: "GET",
            url: `${
              process.env.NODE_ENV === "production"
                ? process.env.REACT_APP_BACKEND_URL
                : "http://localhost:8000/api"
            }/meals/getByName/${search}`,
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          });
          console.log(Data);
          setData(Data.data.meal);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getData();
  }, [search]);

  const listHandler = (event) => {
    console.log(event);
    if (event.value) {
      setCatagories(event.value);
      setSpecification(event.value);
    }
  };

  const getSpec = (data) => {
    const sp = {};
    if (data) {
      console.log(data);
      const key = Object.keys(data);

      if (key.length > 0) {
        key.map((k) => {
          if (data[k]) {
            console.log(data[k]);
            return (sp[`specs.${k}`] = data[k]);
          }
        });
      }

      specs = { ...sp };
    }
  };

  const filterHandler = async (event) => {
    event.preventDefault();
    console.log(specs);

    if (catagories) {
      specs["productCatagory"] = catagories;
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

      setData(Data.data.products);
    } catch (err) {
      console.log(err);
    }

    console.log(specs);
  };

  console.log(data);
  return (
    <div className="grid p-2 mb-2">
      <div className="flex h-20 mx-auto mt-5">
        <div>
          <input
            ref={searchInput}
            className="flex h-10 px-3 py-1 text-lg border border-gray-300 rounded-lg w-72 lg:w-96 lg:h-14 focus:ring-blue-slate-400 focus:outline focus:outline-slate-400"
            placeholder="What are you looking for?"
            onKeyPress={searchHandler}
          />
        </div>
      </div>
      <div className="gap-10 sm:gap-0 sm:flex ">
        <div className="grid sm:h-screen md:w-[65%] sm:hidden ">
          <div className="text-lg font-bold text-center sm:ml-4 sm:text-2xl sm:mt-5 ">
            {` ${
              data.length === 0
                ? "We have no result for your search"
                : "Here are some Results for your Search"
            } `}
          </div>
          {data.length !== 0 && (
            <div className=" grid max-h-96 gap-2  w-[95%] mt-2 overflow-y-auto  md:w-[100%]  sm:w-[100%] sm:h-screen sm:grid sm:ml-2  sm:overflow-y-auto">
              {data.length !== 0 &&
                data.map((item) => {
                  return (
                    <SearchResult
                      key={item._id}
                      price={item.price}
                      name={item.name}
                      description={item.description}
                      image={item.image}
                      status={item.status}
                      prod={item}
                    />
                  );
                })}
            </div>
          )}
        </div>

        <div
          className={`gap-3 p-2 mt-3 sm:p-0 sm:ml-[1%] sm:mt-20 h-2/3 sm:border sm:border-gray-300 sm:border-l-0 sm:border-b-0 sm:border-t-0 md:w-[35%] lg:w-[30%] xl:w-[30%] sm:w-[40%] ${
            showMessage ? "hidden" : "block"
          } `}
        >
          <div className="flex sm:w-72 lg:w-80">
            <div className="my-auto text-base ">Catagory:</div>
            <div className="ml-1 ">
              <Select
                options={CatagoriesList}
                onChange={listHandler}
                className="absolute w-40 h-8"
              />
            </div>
          </div>

          {catagories && (
            <div className="mt-4 ">
              {specification === "Vehicles" && (
                <VehiclesSpecification type="filter" getData={getSpec} />
              )}

              {specification === "Electronics" && (
                <ElectronicsSpecification type="filter" getData={getSpec} />
              )}
            </div>
          )}

          <div className="mt-2 sm:mt-3">
            <button
              onClick={filterHandler}
              className="px-5 py-1 text-white rounded-md bg-cyan-900"
            >
              Save Search
            </button>
          </div>
        </div>
        <div className="grid grid-flow-row sm:h-screen md:w-[65%] sm:w-[90%] hidden sm:block">
          <div className="text-lg font-bold text-center sm:ml-4 sm:text-2xl sm:mt-5 ">
            {` ${
              data.length === 0
                ? "No result for your search"
                : "Results for your Search"
            } `}
          </div>
          {data.length !== 0 && (
            <div className="gap-2  mt-2 md:w-[100%]  sm:w-[100%] sm:h-screen  sm:ml-2  overflow-y-auto">
              {data.length !== 0 &&
                data.map((item) => {
                  return (
                    <SearchResult
                      prod={item}
                      key={item._id}
                      price={item.price}
                      name={item.name}
                      description={item.description}
                      image={item.image}
                      status={item.status}
                    />
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
