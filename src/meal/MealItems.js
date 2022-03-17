import react, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";
import { SignActions } from "../store/SignIn-slice";
import FillAuction from "../user/FillAuction";
const MealItems = (props) => {
  const history = useHistory();
  const Dispatch = useDispatch();
  const userId = useSelector((state) => state.sign.userId);
  const Show = useSelector((state) => state.sign.show);
  const [sh, setSh] = useState(false);
  console.log(userId);
  const make = () => {
    setSh(false);
  };

  const AddHandler = (event) => {
    event.preventDefault();
    Dispatch(
      SignActions.setBid({
        prodId: props.prodId,
      })
    );

    Dispatch(SignActions.setShow({ show: true }));
    setSh(true);

    // history.push("/user/fillauction");
  };

  return (
    <Fragment>
      <div className="grid grid-cols-2">
        <section className="grid w-full grid-cols-2 gap-6 py-4 mt-5 mb-3 ml-4 rounded-lg shadow-2xl h-80 bg-gradient-to-r from-green-100 via-indigo-200 to-pink-200 ">
          <div>
            <img
              className="object-fill mx-auto rounded-md h-72"
              src={`http://localhost:8000/${props.image}`}
              alt="pic"
            ></img>
          </div>
          <div className="grid grid-flow-row text-md">
            <div className="flex gap-5">
              <div>
                <label>Name:</label>
              </div>

              <div>{props.name}</div>
            </div>

            <div className="flex gap-5">
              <div>
                <label>Price:</label>
              </div>

              <div>{props.price}</div>
            </div>

            <div className="flex gap-5">
              <div>
                <label>Description:</label>
              </div>

              <div>{props.description}</div>
            </div>

            <div className="flex gap-5">
              <div>
                <label>Type:</label>
              </div>

              <div>{props.type}</div>
            </div>

            <div className="flex gap-5">
              <div>
                <label>Catagory:</label>
              </div>

              <div>{props.catagory}</div>
            </div>

            <div className="flex gap-5">
              <div>
                <label>Deadline:</label>
              </div>

              <div>{Moment(props.deadline).format("LLLL")}</div>
            </div>

            <div className="flex gap-5">
              <div>
                <label>PostedBy:</label>
              </div>

              <div>{props.postedBy}</div>
            </div>
            <button
              onClick={AddHandler}
              className="h-10 mx-auto text-gray-100 rounded-lg shadow-xl bg-gradient-to-r from-green-400 hover:to-blue-600 w-28 hover:bg-gradient-to-r hover:from-green-500 to-blue-500"
            >
              Buy It Now
            </button>
          </div>

          {/* <button
          onClick={AddHandler}
          type="submit"
          className="w-16 h-8 mr-4 bg-red-400 rounded-lg hover:bg-red-500"
        >
          + ADD
        </button> */}
        </section>
        {Show && sh && (
          <FillAuction
            prodImage={localStorage.getItem("userId")}
            prodId={props.prodId}
            onMake={make}
          />
        )}
      </div>
    </Fragment>
  );
};

export default MealItems;
