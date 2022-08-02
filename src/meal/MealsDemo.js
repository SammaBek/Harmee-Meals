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
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Cookies from "js-cookie";
import Spinners from "../utils/SpinnerLoading";
import { ErrorAction } from "../store/Error-Slice";
import { useDispatch, useSelector } from "react-redux";

const MealsDemo = (props) => {
  const dispatch = useDispatch();

  const isError = useSelector((state) => state.error.isError);
  const userId = useSelector((state) => state.sign.userId);
  const history = useHistory();

  const [Meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        // ${localStorage.getItem("token")}
        const Req = await axios({
          method: "GET",
          url: `http://localhost:8000/api/meals/myproducts/${userId}`,
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });
        console.log(Req);
        setMeals(Req.data.user.products);
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
      {isLoading && <Spinners />}
      {isError && <ErrorModal />}
      <div className="grid h-screen overflow-y-auto lg:grid-cols-2 w-[94%] mx-auto md:ml-2 md:w-[80%] lg:w-[98%]">
        {!isLoading &&
          Meals.map((item) => {
            return (
              <MealItems
                key={item.id}
                name={item.name}
                price={item.price}
                description={item.description}
                status={item.status}
                deadline={item.productDeadline}
                catagory={item.productCatagory}
                image={item.image}
                postedBy={item.owner.userName}
                ownerId={item.owner._id}
                prodId={item.id}
                specs={item}
              />
            );
          })}
      </div>
    </section>
  );
};
export default MealsDemo;
