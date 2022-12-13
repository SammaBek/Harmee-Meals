import { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { SignActions } from "../store/SignIn-slice";
const SearchResult = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const [img, setImg] = useState(props.image[0]);

  const detailHandler = () => {
    if (location.pathname !== "/specificProduct") {
      console.log(props.prod);
      dispatch(SignActions.setBid({ prodId: props.prod.id }));
      history.push("/specificProduct");
    }
  };
  return (
    // <div className="flex h-auto gap-2">
    //   <div
    //     onClick={detailHandler}
    //     className="h-56 gap-5 sm:h-52 md:h-52 md:ml-4 lg:ml-16 xl:ml-20 lg:h-60 sm:gap-1 mb-2 border border-gray-100 rounded-lg shadow-2xl sm:w-[95%] md:w-[90%] lg:w-[90%] xl:w-[80%] sm:mt-1  sm:shadow-lg sm:flex sm:p-2 sm:border sm:border-gray-300"
    //   >
    //     <div className="h-32 my-auto  w-52 sm:w-[80%] md:w-60 lg:aspect-w-3 lg:aspect-h-2 sm:h-40 md:h-40 lg:h-52 ">
    //       <img
    //         className="object-cover "
    //         src={`${process.env.REACT_APP_AWS_S3_BUCKET}/${img}`}
    //         alt="pic"
    //       />
    //     </div>
    //     <div className="grid grid-flow-row gap-1 my-auto ml-2 sm:w-[60%] md:w-[65%] lg:ml-7 lg:w-[50%]">
    //       <div className="text-xs font-bold md:text-base xl:text-lg">
    //         {props.name}
    //       </div>
    //       <div className="text-xs text-blue-500 md:text-base xl:text-lg">{`$${props.price}`}</div>
    //       <div className="text-xs md:text-base xl:text-lg">
    //         {props.description}
    //       </div>
    //       <div className="flex gap-2">
    //         <label className="text-xs md:text-base xl:text-lg">Status:</label>
    //         <label className="text-xs md:text-base xl:text-lg">
    //           {props.status}
    //         </label>
    //       </div>
    //     </div>
    //   </div>
    //   {location.pathname === "/specificProduct" ? (
    //     <div className="h-56 overflow-y-auto rounded-lg shadow-2xl xl:w-36 xl:h-60 sm:h-52 lg:h-60">
    //       {props.image.map((element) => {
    //         console.log(element);

    //         return (
    //           <img
    //             className="h-32 w-[95%] sm:h-28 sm:rounded-md object-contain"
    //             src={`${process.env.REACT_APP_AWS_S3_BUCKET}/${element}`}
    //             alt="pic"
    //             onClick={() => {
    //               console.log(element);
    //               setImg(element);
    //             }}
    //           />
    //         );
    //       })}
    //     </div>
    //   ) : (
    //     ""
    //   )}
    // </div>

    <Fragment>
      <div
        onClick={detailHandler}
        className="flex h-auto border rounded-lg sm:py-2 "
      >
        <div
          className={`  p-1 sm:p-0 ${
            location.pathname === "/specificProduct"
              ? "lg:w-[70%] md:w-[78%] w-[85%]"
              : "lg:w-[46%] md:w-[70%] w-[75%]"
          }  xl:w-[45%] sm:w-[98%] ${
            location.pathname === "/specificProduct" ? "my-auto" : ""
          } `}
        >
          <div className="ml-1 aspect-w-5 aspect-h-4 sm:aspect-w-3 sm:aspect-h-2">
            <img
              className="object-cover rounded-lg"
              src={`${process.env.REACT_APP_AWS_S3_BUCKET}/${img}`}
              alt="pic"
            />
          </div>
        </div>

        <div className="grid grid-flow-row gap-1 w-[55%]  my-auto ml-2 sm:w-[60%] md:w-[65%] lg:ml-7 lg:w-[50%] ">
          <div className="text-xs font-bold md:text-base xl:text-lg">
            {props.name}
          </div>
          <div className="text-xs text-blue-500 md:text-base xl:text-lg">{`$${props.price}`}</div>
          <div className="text-xs md:text-base xl:text-lg">
            {props.description}
          </div>
          <div className="flex gap-2">
            <label className="text-xs md:text-base xl:text-lg">Status:</label>
            <label className="text-xs md:text-base xl:text-lg">
              {props.status}
            </label>
          </div>
        </div>
        {location.pathname === "/specificProduct" && (
          <div className="grid gap-1 my-auto overflow-y-auto max-h-36 sm:max-h-44 w-36 ">
            {props.image.map((element) => {
              console.log(element);

              return (
                <img
                  className="object-cover w-12 h-12 rounded-full sm:w-14 sm:h-14"
                  src={`${process.env.REACT_APP_AWS_S3_BUCKET}/${element}`}
                  alt="pic"
                  onClick={() => {
                    console.log(element);
                    setImg(element);
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default SearchResult;
