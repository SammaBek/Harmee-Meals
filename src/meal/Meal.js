import {
  react,
  useEffect,
  useCallback,
  useRef,
  useState,
  useContext,
} from "react";
import MealItems from "./MealItems";

import ErrorModal from "../modal/ErrorModal";

import Spinner from "../header/Spinner";
import axios from "axios";
import { ErrorAction } from "../store/Error-Slice";
import { useDispatch, useSelector } from "react-redux";

const Meal = () => {
  const isError = useSelector((state) => state.error.isError);
  const dispatch = useDispatch();

  const [Meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const Req = await axios.get(
          `${
            process.env.NODE_ENV === "production"
              ? process.env.REACT_APP_BACKEND_URL
              : "http://localhost:8000/api"
          }/meals`
        );
        console.log(Req);
        setMeals(Req.data.meal);
        setIsLoading(false);
      } catch (err) {
        console.log(err.response.data.message);
        dispatch(
          ErrorAction.setError({ errorMessage: err.response.data.message })
        );
      }
    };
    getData();
  }, []);

  return (
    <section>
      {isError && <ErrorModal />}
      {isLoading && <Spinner />}
      {!isLoading &&
        Meals.map((item) => {
          return (
            <MealItems
              key={item.id}
              name={item.name}
              price={item.price}
              description={item.description}
            />
          );
        })}
    </section>
  );
};
export default Meal;
