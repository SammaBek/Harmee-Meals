import Vehicles from "../Filters/Vehicles";
import SearchResult from "./SearchResult";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Select from "react-select";
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

  const [data, setData] = useState([]);
  const searchInput = useRef();

  const [search, setSearch] = useState();

  let specs = {};

  const searchHandler = (event) => {
    event.preventDefault();
    console.log("searched", searchInput.current.value);
    setSearch(searchInput.current.value);
  };

  console.log(props.search);
  console.log(search);

  useEffect(() => {
    const getData = async () => {
      setSearch(props.search);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        console.log(props.search);
        console.log(search);
        const Data = await axios({
          method: "GET",
          url: `http://localhost:8000/api/meals/getByName/${search}`,
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });
        console.log(Data);
        setData(Data.data.meal);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [search, props.search]);

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
        url: `http://localhost:8000/api/meals/filterProducts/`,
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
            className="flex h-10 px-3 py-1 text-lg border border-gray-300 rounded-lg w-72"
            placeholder="What are you looking for?"
          />
        </div>

        <div onClick={searchHandler} className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-green-300 transform -translate-x-10 translate-y-3"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>
      <div className="gap-10 sm:gap-0 sm:flex ">
        <div className="grid grid-flow-row sm:h-screen ">
          <div className="text-lg font-bold text-center sm:ml-4 sm:text-2xl sm:mt-5 ">
            {` ${
              data.length === 0
                ? "We have no result for your search"
                : "Here are some Results for your Search"
            } `}
          </div>
          {data.length !== 0 && (
            <div className="flex h-64 gap-2  mt-2 overflow-x-auto sm:overflow-x-hidden sm:border sm:border-gray-300 sm:w-[92%] sm:h-screen sm:grid sm:ml-0 sm:border-l-0 sm:border-b-0 sm:border-t-0  sm:overflow-y-auto">
              {data.length !== 0 &&
                data.map((item) => {
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
          )}
        </div>

        <div className="gap-3 p-2 mt-20 sm:p-0 sm:mt-20 h-2/3 sm:-translate-x-1">
          <div className="flex sm:w-72">
            <div className="my-auto text-base ">Catagory:</div>
            <div className="ml-1 ">
              <Select
                options={CatagoriesList}
                onChange={listHandler}
                className="absolute w-48 h-8"
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
              className="w-20 px-3 py-1 bg-red-400 rounded-md "
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
