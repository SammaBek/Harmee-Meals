import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SignActions } from "../store/SignIn-slice";
const ProductDetail = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const clickHandler = () => {
    console.log(props.prod);
    dispatch(SignActions.setBid({ prodId: props.prod.id }));
    history.push("/specificProduct");
  };
  return (
    <div
      onClick={clickHandler}
      className="grid grid-flow-row lg:ml-1 ml-6 sm:ml-1 w-[75%] sm:h-40 lg:h-60 mb-2 md:h-52  bg-white shadow-2xl border border-gray-100 rounded-lg h-60 md:w-[97%] sm:w-[97%] xl:p-2 xl:h-64 lg:w-[98%] xl:w-[98%]"
    >
      <div className="h-48 md:h-[90%] p-2 w-[100%] sm:w-[100%] sm:h-[80%] md:p-1  md:w-[100%] lg:w-[100%] ">
        <img
          className=" w-[100%] h-[95%]   md:w-[96%] sm:h-24 md:h-32 lg:h-44 lg:w-[98%] xl:w-[96%] mx-auto"
          src={`http://localhost:8000/${props.prod.image}`}
          alt="pic"
        />
      </div>
      <div className="ml-1 sm:text-xs md:text-sm">{props.prod.name}</div>
      <div className="ml-1 text-green-300 sm:text-xs md:text-sm">{`$${props.prod.price}`}</div>
    </div>
  );
};

export default ProductDetail;
