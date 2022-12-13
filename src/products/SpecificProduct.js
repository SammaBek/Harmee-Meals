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
import { ErrorAction } from "../store/Error-Slice";
import ErrorModal from "../modal/ErrorModal";

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
  const isError = useSelector((state) => state.error.isError);

  const history = useHistory();

  const searchHandler = (event) => {
    if (event.key === "Enter") {
      console.log("searched", searchInput.current.value);
      Dispatch(SignActions.setSearched({ search: searchInput.current.value }));
      setSearch(searchInput.current.value);
    }
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
            url: `${
              process.env.NODE_ENV === "production"
                ? process.env.REACT_APP_BACKEND_URL
                : "http://localhost:8000/api"
            }/meals/${props.prodId}`,
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          });
          console.log(Data);
          setData(Data.data.meal);
          const key = Object.keys(Data.data.meal.specs);

          setKeys(key);
        } catch (err) {
          console.log(err.response.data);
          Dispatch(
            ErrorAction.setError({
              errorMessage:
                "Either you are not Authorized or your session expired. Sign In Again",
            })
          );

          Dispatch(ErrorAction.setPageTo({ pageTo: "signin" }));
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
      {isError && <ErrorModal />}
      <div className="flex h-20 mx-auto mt-5">
        <div>
          <input
            ref={searchInput}
            className="flex h-10 px-3 py-1 text-lg border border-gray-300 rounded-lg w-72 lg:w-96 lg:h-14 text-cyan-900 md:mt-2 focus:ring-blue-slate-400 focus:outline focus:outline-slate-400"
            placeholder="What are you looking for?"
            onKeyPress={searchHandler}
          />
        </div>
      </div>
      <div className="grid gap-2 sm:gap-0">
        <div className="grid max-h-80 md:h-auto  sm:h-72 md:w-[70%] lg:w-[63%]">
          <div className="text-lg font-bold text-center sm:ml-4 sm:text-2xl sm:mt-5 ">
            {` ${
              data.length === 0
                ? "We have no result for your search"
                : "Here are some Results for your Search"
            } `}
          </div>
          {data.length !== 0 && (
            <div className="  md:h-auto lg:h-auto h-auto gap-2 w-[100%]  mt-2  md:w-[100%] lg:w-[100%]  sm:w-[74%]  sm:grid sm:ml-2  ">
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
                    bidder={data.owner.id}
                    userId={userId}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {key && (
          <div
            className={` p-2 mt-3 sm:p-0 sm:ml-20 w-[80%]  sm:mt-10 h-2/3  md:w-[35%] lg:w-[35%] xl:w-[30%]   sm:w-[40%]`}
          >
            <div className={`flex gap-7  ${show ? "mt-16 sm:mt-0" : ""}`}>
              <div>
                {key.map((k) => {
                  return (
                    <div className="mt-2">
                      <label className="text-base lg:text-lg ">{k}:</label>
                    </div>
                  );
                })}
              </div>

              <div>
                {key.map((k) => {
                  return (
                    <div className="mt-2">
                      <label className="text-base lg:text-lg ">
                        {data.specs[k]}
                      </label>
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
