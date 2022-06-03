import shopper1 from "../img/shopper1.png";
import shopper3 from "../img/shopper3.png";
import vehicle from "../img/vehicle.png";
import electronics from "../img/electronics.png";
import clothing from "../img/Clothing.png";
import homeFurniture from "../img/homeFurniture.png";
import Gym from "../img/GymEquipment.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ErrorAction } from "../store/Error-Slice";
import Cookies from "js-cookie";
import ProductDetail from "./ProductDetail";

import { Fragment, useEffect, useRef, useState } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ProductDetailPage from "./ProductDetailPage";
import { SignActions } from "../store/SignIn-slice";
const LandingPage = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const search = useRef();

  const ss = "sam";

  useEffect(() => {
    const getData = async () => {
      try {
        // ${localStorage.getItem("token")}
        const Req = await axios({
          method: "GET",
          url: "http://localhost:8000/api/meals",
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });
        setProducts(Req.data.meal);
      } catch (err) {
        console.log(err.response.data.message);
        dispatch(
          ErrorAction.setError({ errorMessage: err.response.data.message })
        );
      }
    };

    getData();
  }, []);

  console.log(products);

  const searchHandler = (event) => {
    event.preventDefault();

    console.log(search.current.value);
    dispatch(SignActions.setSearched({ search: search.current.value }));
    history.push("/productDetailPage");
  };
  return (
    <div className="w-full min-h-screen ">
      <div className="grid h-20 grid-flow-col bg-green-600 md:h-60 lg:h-72 xl:h-80 sm:h-40">
        <div>
          <img
            className="transform translate-y-0.5 sm:translate-y-1 sm:h-40 h-20 md:translate-y-1.5 md:h-60 md:w-72 lg:h-72 xl:h-80 xl:w-80"
            src={shopper1}
            alt="pic"
          />
        </div>

        <div className="flex my-auto">
          <div>
            <input
              ref={search}
              className="flex w-64 h-8 px-3 py-1 text-sm rounded-lg sm:mx-auto sm:text-xs sm:h-9 sm:w-72 md:text-base lg:h-16 md:w-80 md:h-14 lg:w-96"
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
              className="w-4 h-4 text-green-300 transform -translate-x-10 translate-y-2 md:translate-y-4 sm:w-5 sm:h-5 sm:translate-y-2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>

        <div>
          <img
            className="h-20 xl:h-80 lg:h-72 sm:h-40 md:w-72 lg:w-80 md:h-60"
            src={shopper3}
            alt="pic"
          />
        </div>
      </div>

      <div className="h-full gap-5 mb-10 sm:mt-10 sm:ml-2 sm:flex lg:ml-6">
        <div className="bg-gray-200 rounded-md h-36 md:w-1/4 lg:w-1/5 xl:w-1/4 sm:h-96">
          <h1 className="p-1 text-center sm:p-2 md:text-lg lg:text-xl">
            Filter By Catagory
          </h1>
          <div className="flex w-full gap-8 ml-1 overflow-x-auto text-sm sm:text-base sm:gap-0 sm:grid sm:grid-flow-row">
            <div className="sm:flex sm:gap-2 sm:hover:bg-gray-300">
              <img
                className="w-16 h-16 md:w-12 md:h-12"
                src={vehicle}
                alt="pic"
              />
              <span className="my-auto md:text-base">Vehicles</span>
            </div>
            <div className="sm:flex sm:gap-2 sm:hover:bg-gray-300">
              <img
                className="w-16 h-16 md:w-12 md:h-12"
                src={electronics}
                alt="pic"
              />
              <span className="my-auto md:text-base">Electronics</span>
            </div>
            <div className="sm:flex sm:gap-2 sm:hover:bg-gray-300">
              <img
                className="w-16 h-16 md:w-12 md:h-12"
                src={clothing}
                alt="pic"
              />
              <span className="my-auto md:text-base">Clothing</span>
            </div>
            <div className="sm:flex sm:gap-2 sm:hover:bg-gray-300">
              <img
                className="w-16 h-16 md:w-12 md:h-12"
                src={homeFurniture}
                alt="pic"
              />
              <span className="my-auto md:text-base">Home Furnitures</span>
            </div>
            <div className="sm:flex sm:gap-2 sm:hover:bg-gray-300">
              <img className="w-16 h-16 md:w-12 md:h-12" src={Gym} alt="pic" />
              <span className="my-auto md:text-base">Gym Equipments</span>
            </div>
          </div>
        </div>
        <div className="grid  md:w-[75%] sm:w-[75%] p-1 xl:w-[70%] h-screen sm:grid-cols-3 gap-1 overflow-y-auto sm:bg-gray-200 xl:p-2 mt-3 sm:mt-0 grid-flow-row w-[100%]">
          {products.map((p) => {
            return (
              <ProductDetail image={p.image} name={p.name} price={p.price} />
            );
          })}
        </div>
      </div>

      <div className="">
        <footer className="h-56 bg-gray-700 "></footer>
      </div>
    </div>
  );
};

export default LandingPage;
