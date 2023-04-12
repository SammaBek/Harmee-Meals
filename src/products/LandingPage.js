import shopper1 from "../img/shopper1.webp";
import shopper3 from "../img/shopper3.webp";
import vehicle from "../img/vehicle.webp";
import electronics from "../img/electronics.webp";
import clothing from "../img/Clothing.webp";
import homeFurniture from "../img/homeFurniture.webp";
import Gym from "../img/GymEquipment.webp";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ErrorAction } from "../store/Error-Slice";
import Cookies from "js-cookie";
import ProductDetail from "./ProductDetail";
import ErrorModal from "../modal/ErrorModal";

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
  const isError = useSelector((state) => state.error.isError);

  useEffect(() => {
    const getData = async () => {
      try {
        // ${localStorage.getItem("token")}
        const Req = await axios({
          method: "GET",
          url: `${
            process.env.NODE_ENV === "production"
              ? process.env.REACT_APP_BACKEND_URL
              : "http://localhost:8000/api"
          }/meals`,
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

  const searchKeyHandler = (event) => {
    if (event.key === "Enter") {
      dispatch(SignActions.setSearched({ search: search.current.value }));
      history.push("/productDetailPage");
    }
  };

  const filterHandler = (cat) => {
    dispatch(SignActions.setCatagories({ catagories: cat }));
    console.log(cat);
    history.push("/productDetailPage");
  };
  return (
    <div className="w-full min-h-screen ">
      <div className="grid h-20 grid-flow-col bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800 md:h-60 lg:h-72 xl:h-80 sm:h-40">
        <div className=" xl:mt-3 md:mt-4 lg:mt-0">
          <img
            className="object-contain h-20 xl:h-80 lg:h-72 sm:h-40 md:w-56 lg:w-80 md:h-60"
            src={shopper3}
            alt="pic"
          />
        </div>

        <div className="flex my-auto ">
          <div className="flex">
            <input
              ref={search}
              className="flex w-64 h-10 px-3 py-2 text-sm text-center rounded-lg lg:text-base sm:mx-auto sm:text-xs sm:h-9 sm:w-72 md:text-base lg:h-16 md:w-80 md:h-14 lg:w-96 focus:ring-blue-slate-400 focus:outline focus:outline-slate-400"
              placeholder="What are you looking for?"
              onKeyPress={searchKeyHandler}
            />
          </div>
        </div>

        <div className="xl:mt-3 md:mt-4 lg:mt-0">
          <img
            className="object-contain h-20 xl:h-80 lg:h-72 sm:h-40 md:w-56 lg:w-80 md:h-60"
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
            <div
              onClick={() => {
                filterHandler("Vehicles");
              }}
              className="sm:flex sm:gap-2 sm:hover:bg-gray-300"
            >
              <img
                className="object-contain w-16 h-16 md:w-12 md:h-12"
                src={vehicle}
                alt="pic"
              />
              <span className="my-auto md:text-base">Vehicles</span>
            </div>
            <div
              onClick={() => {
                filterHandler("Electronics");
              }}
              className="sm:flex sm:gap-2 sm:hover:bg-gray-300"
            >
              <img
                className="object-contain w-16 h-16 md:w-12 md:h-12"
                src={electronics}
                alt="pic"
              />
              <span className="my-auto md:text-base">Electronics</span>
            </div>
            <div
              onClick={() => {
                filterHandler("Clothing");
              }}
              className="sm:flex sm:gap-2 sm:hover:bg-gray-300"
            >
              <img
                className="object-contain w-16 h-16 md:w-12 md:h-12"
                src={clothing}
                alt="pic"
              />
              <span className="my-auto md:text-base">Clothing</span>
            </div>
            <div
              onClick={() => {
                filterHandler("HomeFurniture");
              }}
              className=" sm:flex sm:gap-2 sm:hover:bg-gray-300"
            >
              <img
                className="object-contain w-16 h-16 md:w-12 md:h-12"
                src={homeFurniture}
                alt="pic"
              />
              <span className="my-auto md:text-base">Furnitures</span>
            </div>
            <div
              onClick={() => {
                filterHandler("Gym");
              }}
              className="sm:flex sm:gap-2 sm:hover:bg-gray-300"
            >
              <img
                className="object-contain w-16 h-16 md:w-12 md:h-12"
                src={Gym}
                alt="pic"
              />
              <span className="my-auto md:text-base">Gym</span>
            </div>
          </div>
        </div>
        <div className="grid  md:w-[75%] lg:w-[80%] sm:w-[75%] p-1 xl:w-[75%] max-h-screen sm:grid-cols-3 gap-1 overflow-y-auto  xl:p-2 mt-3 sm:mt-0 grid-flow-row w-[100%]">
          {products.map((p) => {
            return <ProductDetail key={p.id} prod={p} />;
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
