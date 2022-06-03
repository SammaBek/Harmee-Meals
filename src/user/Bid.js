import { useState, Fragment } from "react";
import ApproveBid from "./ApproveBid";
import { useSelector } from "react-redux";
const Bid = (props) => {
  const [visible, setVisible] = useState(false);
  const userId = useSelector((state) => state.sign.userId);
  const make = () => {
    setVisible(false);
  };
  const bidHandler = (name) => {
    console.log(`hello ${name}`);
    setVisible(true);
    props.bidHandler();
  };

  return (
    <Fragment>
      <div
        key={props._id}
        className="grid grid-flow-col text-blue-400 border-2 border-t-0 border-l-0 border-r-0 border-blue-400 "
      >
        <div className="w-16">
          <img
            className="w-16 h-16 transform -translate-y-1 rounded-full"
            src={`http://localhost:8000/${props.image}`}
            alt="pic"
          ></img>
        </div>
        <div className="underline transform translate-y-3 w-28">
          {props.name}
        </div>
        <div className="w-24 transform translate-y-3">{props.email}</div>
        <div className="w-20 ml-6 transform translate-y-3">${props.price}</div>
        <div>
          <button
            onClick={() => {
              bidHandler(props);
            }}
            className="transform translate-y-2 hover:scale-125"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-400 "
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>

      {visible && (
        <ApproveBid
          bidder={props.bidder}
          make={make}
          name={props.name}
          image={props.image}
          userId={userId}
        />
      )}
    </Fragment>
  );
};

export default Bid;
