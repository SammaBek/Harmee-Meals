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
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Cookies from "js-cookie";

const MealsDemo = (props) => {
  const ctx = useContext(ErrorContext);
  const history = useHistory();

  const [Meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(props.onGetImage);

  useEffect(() => {
    const getData = async () => {
      try {
        // ${localStorage.getItem("token")}
        const Req = await axios({
          method: "GET",
          url: "http://localhost:8000/api/meals",
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });
        setMeals(Req.data.meal);
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
      {!isLoading &&
        Meals.map((item) => {
          return (
            <MealItems
              key={item.id}
              name={item.name}
              price={item.price}
              description={item.description}
              type={item.productType}
              deadline={item.productDeadline}
              catagory={item.productCatagory}
              image={item.image}
              postedBy={item.owner.userName}
              prodId={item.id}
            />
          );
        })}
    </section>
  );
};
export default MealsDemo;
