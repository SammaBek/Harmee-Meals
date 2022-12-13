import { useDispatch } from "react-redux";
import { ErrorAction } from "../store/Error-Slice";
const UsePageToCounter = () => {
  const Dispatch = useDispatch();
  console.log("in the Counter");

  const startCounter = () => {
    setTimeout(() => {
      console.log("Counter ended");
      Dispatch(ErrorAction.setPageTo({ pageTo: null }));
    }, 5000);
  };

  return { startCounter };
};

export default UsePageToCounter;
