import useHttp from "../hooks/Use-Http";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { animated, useSpring } from "react-spring";
import { SignActions } from "../store/SignIn-slice";
import MessageDetail from "./MessageDetail";
import ApproveBid from "./ApproveBid";
import { MessageActions } from "../store/Message-Slice";

import { Fragment } from "react";
const Message = () => {
  const styles = useSpring({
    from: { x: -200, y: 30 },
    config: { duration: 1500 },
    loop: {
      x: 30,
      y: 30,
    },
  });

  const myUser = useSelector((state) => state.sign.userId);
  const [show, setShow] = useState(false);
  const updateMessage = useSelector((state) => state.message.updateMessage);
  const dispatch = useDispatch();
  const showMessage = useSelector((state) => state.message.showMessage);
  const [message, setMessage] = useState([]);
  console.log(myUser);

  useEffect(() => {
    const getData = async () => {
      try {
        const Req = await axios({
          method: "POST",
          url: "http://localhost:8000/api/users/getChats",
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          data: { myUser },
        });

        console.log(Req);
        setMessage(Req.data.arr);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };

    getData();
  }, [myUser, updateMessage]);

  console.log(message);

  const cancelHandler = () => {
    dispatch(MessageActions.changeShowMessage());
  };
  const detailHandler = () => {
    setShow(true);
  };
  const cancelDetail = () => {
    setShow(false);
  };
  return (
    <Fragment>
      <animated.div
        style={styles}
        className="absolute bg-gray-100 rounded-lg w-96 h-3/4"
      >
        <div className="h-6 rounded-lg bg-slate-700">
          <div className="flex gap-2">
            <div>
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
                onClick={cancelHandler}
                className="w-4 h-4 ml-2 transform translate-y-1 bg-red-400 rounded-full hover:bg-red-500"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <div>
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
                className="w-4 h-4 ml-2 transform translate-y-1 bg-yellow-400 rounded-full hover:bg-yellow-500"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>
        <div className="ml-4 text-xl text-gray-600">Messenger</div>

        {message &&
          message.map((msg) => {
            let newMessage;
            if (msg.message.length > 36) {
              const m = msg.message.slice(0, 36);
              newMessage = m.padEnd(38, ".");
            } else {
              newMessage = msg.message;
            }
            return (
              <div className="p-2 overflow-visible overflow-y-auto ">
                <MessageDetail msg={msg} newMessage={newMessage} />
              </div>
            );
          })}
      </animated.div>
    </Fragment>
  );
};

export default Message;
