import { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import ApproveBid from "./ApproveBid";
const MessageDetail = (props) => {
  const myUser = useSelector((state) => state.sign.userId);
  const [show, setShow] = useState(false);
  const cancelDetail = () => {
    setShow(false);
  };
  const detailHandler = () => {
    setShow(true);
  };
  return (
    <Fragment>
      <div
        onClick={detailHandler}
        key={props.msg.createdAt}
        className={`flex gap-4 py-1 hover:bg-slate-300 hover:rounded-lg ${
          !props.msg.seen && !props.msg.sender === myUser
            ? `bg-slate-200 rounded-lg`
            : "rounded-lg"
        } `}
      >
        <div className="my-auto ">
          <img
            className="w-10 h-10 rounded-full"
            src={`${process.env.REACT_APP_AWS_S3_BUCKET}/${props.msg.image}`}
            alt="pic"
          ></img>
        </div>
        <div className="grid grid-flow-row ">
          <div className="font-serif text-sm ">{props.msg.name}</div>
          <div className={`w-auto h-auto text-gray-600 `}>
            {props.msg.sender === myUser
              ? `You: ${props.newMessage}`
              : props.newMessage}
          </div>
        </div>
      </div>

      {show && (
        <ApproveBid
          bidder={props.msg.participants[0]}
          userId={props.msg.participants[1]}
          make={cancelDetail}
          name={props.msg.name}
        />
      )}
    </Fragment>
  );
};

export default MessageDetail;
