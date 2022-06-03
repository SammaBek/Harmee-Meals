import react, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";
import { SignActions } from "../store/SignIn-slice";
import FillAuction from "../user/FillAuction";
import { useSpring, animated } from "react-spring";

const MealItems = (props) => {
  const animatedFillAuction = animated(FillAuction);
  const styles = useSpring({
    from: { x: 0 },
    config: { duration: 1000 },
    loop: {
      x: 100,
    },
  });
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
                <label className="font-serif font-bold ">Name:</label>
              </div>

              <div>{props.name}</div>
            </div>

            <div className="flex gap-5">
              <div>
                <label className="font-serif font-bold ">Price:</label>
              </div>

              <div>{props.price}</div>
            </div>

            <div className="flex gap-5">
              <div>
                <label className="font-serif font-bold ">Description:</label>
              </div>

              <div>{props.description}</div>
            </div>

            <div className="flex gap-5">
              <div>
                <label className="font-serif font-bold ">Status:</label>
              </div>

              <div>{props.status}</div>
            </div>

            <div className="flex gap-5">
              <div>
                <label className="font-serif font-bold ">Catagory:</label>
              </div>

              <div>{props.catagory}</div>
            </div>

            <div className="flex gap-5">
              <div>
                <label className="font-serif font-bold ">Posted:</label>
              </div>

              <div>{Moment(props.deadline).format("LLLL")}</div>
            </div>

            <div className="flex gap-5">
              <div>
                <label className="font-serif font-bold ">Posted By:</label>
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
        </section>
        {sh && (
          <FillAuction
            prodImage={localStorage.getItem("userId")}
            prodId={props.prodId}
            onMake={make}
            ownerId={props.ownerId}
            show={sh}
          />
        )}
      </div>
    </Fragment>
  );
};

export default MealItems;
