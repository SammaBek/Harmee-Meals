import Vehicles from "../Filters/Vehicles";
import SearchResult from "./SearchResult";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SignActions } from "../store/SignIn-slice";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import Cookies from "js-cookie";
import VehiclesSpecification from "../productSpecification/VehiclesSpecification";
import ElectronicsSpecification from "../productSpecification/ElectronicsSpecification";
import ApproveBid from "../user/ApproveBid";

const ProductDetailPage = (props) => {
  const [specification, setSpecification] = useState();
  const [catagories, setCatagories] = useState();
  const [finalSpec, setFinalSpec] = useState();

  const [data, setData] = useState([]);
  const searchInput = useRef();

  console.log(props.prodId);
  const prodId = useSelector((state) => state.sign.prodId);
  const userId = useSelector((state) => state.sign.userId);
  const Dispatch = useDispatch();

  const [search, setSearch] = useState();

  let specs = {};
  const [key, setKeys] = useState();
  const [show, setSHow] = useState(false);

  const history = useHistory();

  const searchHandler = (event) => {
    event.preventDefault();
    console.log("searched", searchInput.current.value);
    Dispatch(SignActions.setSearched(searchInput.current.value));
    setSearch(searchInput.current.value);
  };

  console.log(props.search);
  console.log(search);

  const chatHandler = () => {
    setSHow(true);
  };
  const make = () => {
    setSHow(false);
  };
  useEffect(() => {
    const getData = async () => {
      if (props.search) {
        setSearch(props.search);
        console.log(props.search);
      }

      if (props.prodId) {
        console.log(specs);
        try {
          const Data = await axios({
            method: "GET",
            url: `http://localhost:8000/api/meals/${props.prodId}`,
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          });
          console.log(Data);
          setData(Data.data.meal);
          const key = Object.keys(Data.data.meal.specs);

          setKeys(key);
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
        history.push("/productDetailPage");
      }
    };
    getData();
  }, [search]);

  console.log(data);
  console.log(key);
  return (
    <div className="grid p-2 mb-2">
      <div className="flex h-20 mx-auto mt-5">
        <div>
          <input
            ref={searchInput}
            className="flex h-10 px-3 py-1 text-lg border border-gray-300 rounded-lg w-72 lg:w-96 lg:h-14"
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
            className="w-5 h-5 text-green-300 transform -translate-x-10 translate-y-3 lg:w-6 lg:h-6 lg:translate-y-4"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>
      <div className="gap-10 sm:gap-0 sm:flex ">
        <div className="grid grid-flow-row sm:h-screen md:w-[65%] ">
          <div className="text-lg font-bold text-center sm:ml-4 sm:text-2xl sm:mt-5 ">
            {` ${
              data.length === 0
                ? "We have no result for your search"
                : "Here are some Results for your Search"
            } `}
          </div>
          {data.length !== 0 && (
            <div className="flex h-64 gap-2  mt-2 overflow-x-auto sm:overflow-x-hidden md:w-[100%]  sm:w-[100%] sm:h-screen sm:grid sm:ml-2  sm:overflow-y-auto">
              <SearchResult
                key={data.id}
                price={data.price}
                name={data.name}
                description={data.description}
                image={data.image}
                status={data.status}
              />

              {show && (
                <div className={`absolute `}>
                  <ApproveBid
                    make={make}
                    name={data.owner.userName}
                    bidder={data.id}
                    userId={userId}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {key && (
          <div
            className={` p-2 mt-3 sm:p-0 sm:ml-[1%] sm:mt-20 h-2/3 sm:border sm:border-gray-300 sm:border-l-0 sm:border-b-0 sm:border-t-0 md:w-[35%] lg:w-[25%] xl:w-[30%]   sm:w-[40%]`}
          >
            <div className={`flex gap-7  ${show ? "mt-16 sm:mt-0" : ""}`}>
              <div>
                {key.map((k) => {
                  return (
                    <div className="mt-2">
                      <label className="text-lg ">{k}:</label>
                    </div>
                  );
                })}
              </div>

              <div>
                {key.map((k) => {
                  return (
                    <div className="mt-2">
                      <label className="text-lg ">{data.specs[k]}</label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-8 mt-4">
              <button className="px-10 py-1 text-white bg-green-600 rounded-lg hover:bg-green-700 ">
                Call
              </button>

              <button
                onClick={chatHandler}
                className="px-10 py-1 text-white bg-green-600 rounded-lg hover:bg-green-700 "
              >
                Chat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
