import {
  react,
  useEffect,
  useCallback,
  useRef,
  useState,
  useContext,
} from "react";
import MealItems from "./MealItems";
import ErrorContext from "../store/Error-Context";
import ErrorModal from "../modal/ErrorModal";
import SignedContext from "../store/Sign-Context";
import Spinner from "../header/Spinner";
import axios from "axios";

const Meal = () => {
  const ctx = useContext(ErrorContext);

  const [Meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const Req = await axios.get("http://localhost:8000/api/meals");
        console.log(Req);
        setMeals(Req.data.meal);
        setIsLoading(false);
      } catch (err) {
        console.log(err.response.data.message);
        ctx.setErrorMessage(err.response.data.message);
      }
    };
    getData();
  }, []);

  return (
    <section>
      {ctx.isError && <ErrorModal />}
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
