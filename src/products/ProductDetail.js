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
      className="sm:grid sm:grid-flow-row flex h-auto sm:h-auto lg:ml-1 ml-6 sm:ml-1 w-[90%]  lg:h-auto mb-2 bg-white shadow-2xl border border-gray-100 rounded-lg md:w-[97%] sm:w-[97%] xl:p-2 lg:w-[98%] xl:w-[98%] hover:brightness-90"
    >
      <div className=" w-[60%] sm:w-full py-1">
        <div className=" aspect-w-3 aspect-h-2 sm:aspect-h-2 sm:aspect-w-3   md:w-[100%] lg:aspect-w-3 lg:aspect-h-2 ">
          <img
            className="object-cover mx-auto rounded-lg"
            src={`https://gabaa-app-resource.s3.amazonaws.com/${props.prod.image[0]}`}
            alt="pic"
          />
        </div>
      </div>

      <div className="my-auto ">
        <div className="ml-1 font-mono text-xs text-cyan-900 md:text-sm ">
          {props.prod.name}
        </div>
        <div className="p-1 ml-1 text-xs text-cyan-900 md:text-sm ">{`$${props.prod.price}`}</div>
      </div>
    </div>
  );
};

export default ProductDetail;
