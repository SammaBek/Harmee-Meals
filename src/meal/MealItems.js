import react, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";
import { SignActions } from "../store/SignIn-slice";
import FillAuction from "../user/FillAuction";
import { useSpring, animated, update } from "react-spring";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

const MealItems = (props) => {
  const animatedFillAuction = animated(FillAuction);
  const styles = useSpring({
    from: { x: 0 },
    config: { duration: 1000 },
    loop: {
      x: 100,
    },
  });

  const [updated, setUpdated] = useState(false);
  const history = useHistory();
  const Dispatch = useDispatch();
  const userId = useSelector((state) => state.sign.userId);
  const Show = useSelector((state) => state.sign.show);
  const [showButton, setShowButton] = useState(false);
  const [del, setDel] = useState(false);
  const [sh, setSh] = useState(false);
  console.log(userId);

  let incomingData = {};
  const [updatedData, setUpdatedData] = useState();

  const make = () => {
    setSh(false);
  };

  const cancelHandler = () => {
    setShowButton(false);
  };

  const doneHandler = () => {
    setShowButton(false);
  };

  const editHandler = (event) => {
    event.preventDefault();

    setShowButton(true);
  };

  const deleteHandler = (event) => {
    event.preventDefault();

    setDel(true);
  };

  const cancelDelHandler = () => {
    setDel(false);
  };

  const updateData = (data) => {
    setUpdatedData(data);

    console.log(updated);
  };

  useEffect(() => {
    const getData = async () => {
      if (updatedData) {
        setUpdated(true);
      }
    };

    getData();
  }, [updatedData]);

  console.log(updatedData);
  return (
    <Fragment>
      {showButton && (
        <EditProduct
          updateData={updateData}
          product={updatedData ? updatedData : props.specs}
          cancelHandler={cancelHandler}
        />
      )}

      {del && <DeleteProduct cancelDel={cancelDelHandler} />}

      <div className="grid h-auto gap-2 py-2 border sm:flex sm:gap-3 lg:ml-3  lg:w-[70%] mt-2">
        <div className="  w-[50%] lg:w-[45%] mx-auto sm:ml-0">
          <div className="grid mx-auto mt-2 aspect-w-3 aspect-h-2 sm:ml-2">
            <img
              className="object-cover rounded-md"
              src={`${process.env.REACT_APP_AWS_S3_BUCKET}/${props.image[0]}`}
              alt="pic"
            ></img>
          </div>
        </div>

        <div className="grid gap-1 text-xs lg:text-sm md:text-base xl:w-[100%] lg:w-[80%] sm:w-[100%] ml-2  mt-2">
          <div className="flex gap-5 border border-t-0 border-l-0 border-r-0">
            <div>
              <label className="font-serif sm:font-bold ">Name:</label>
            </div>
            <div>{updatedData ? updatedData.name : props.name}</div>
          </div>

          <div className="flex gap-5 border border-t-0 border-l-0 border-r-0">
            <div>
              <label className="font-serif sm:font-bold ">Price:</label>
            </div>

            <div>${updatedData ? updatedData.price : props.price}</div>
          </div>

          <div className="flex gap-5 border border-t-0 border-l-0 border-r-0">
            <div>
              <label className="font-serif sm:font-bold ">Description:</label>
            </div>

            <div>
              {updatedData ? updatedData.description : props.description}
            </div>
          </div>

          <div className="flex gap-5 border border-t-0 border-l-0 border-r-0">
            <div>
              <label className="font-serif sm:font-bold ">Catagory:</label>
            </div>

            <div>{updatedData ? updatedData.catagory : props.catagory}</div>
          </div>

          {/* <div className="flex gap-5 border border-t-0">
          <div>
            <label className="font-serif sm:font-bold ">Posted:</label>
          </div>

          <div>{Moment(props.deadline).format("LLLL")}</div>
        </div> */}
          <div className="flex gap-1 mx-auto">
            {!showButton && (
              <div className="flex gap-4 ">
                <button
                  onClick={editHandler}
                  className="w-24 mx-auto text-gray-100 rounded-lg shadow-xl xl:h-10 h-7 bg-gradient-to-r from-green-400 hover:to-blue-600 xl:w-28 hover:bg-gradient-to-r hover:from-green-500 to-blue-500"
                >
                  Edit Product
                </button>

                <button
                  onClick={deleteHandler}
                  className="w-24 mx-auto text-gray-100 rounded-lg shadow-xl xl:h-10 h-7 bg-gradient-to-r from-red-400 hover:to-blue-600 xl:w-28 hover:bg-gradient-to-r hover:from-red-500 to-blue-500"
                >
                  Delete
                </button>
              </div>
            )}

            {showButton && (
              <button
                onClick={cancelHandler}
                className="w-24 mx-auto text-gray-100 rounded-lg shadow-xl xl:h-10 h-7 bg-gradient-to-r from-green-400 hover:to-blue-600 xl:w-28 hover:bg-gradient-to-r hover:from-green-500 to-blue-500"
              >
                Cancel
              </button>
            )}

            {showButton && (
              <button
                onClick={doneHandler}
                className="w-24 mx-auto text-gray-100 rounded-lg shadow-xl xl:h-10 h-7 bg-gradient-to-r from-green-400 hover:to-blue-600 xl:w-28 hover:bg-gradient-to-r hover:from-green-500 to-blue-500"
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    </Fragment>
    // {/* {sh && (
    //   <FillAuction
    //     prodImage={localStorage.getItem("userId")}
    //     prodId={props.prodId}
    //     onMake={make}
    //     ownerId={props.ownerId}
    //     show={sh}
    //   />
    // )} */}
  );
};

export default MealItems;
