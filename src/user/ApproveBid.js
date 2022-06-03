import { useContext, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";
import SocketContext from "../store/Socket-Context";
import useHttp from "../hooks/Use-Http";

// import socket from "../utils/Socket";
import axios from "axios";
import Cookies from "js-cookie";
import { SignActions } from "../store/SignIn-slice";
import { MessageActions } from "../store/Message-Slice";

const ApproveBid = (props) => {
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.sign.userId);
  const userImage = useSelector((state) => state.sign.userImage);
  const [chats, setChat] = useState([]);
  const ctx = useContext(SocketContext);
  const message = useRef();

  const styles = useSpring({
    from: { x: 0, y: 190 },
    config: { duration: 1500 },
    loop: {
      x: 382,
      y: 190,
    },
  });
  console.log(props.bidder, props.userId);
  useEffect(() => {
    const getChat = async () => {
      try {
        const chat = await axios({
          method: "POST",
          url: "http://localhost:8000/api/users/getChat",
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          data: { user1: props.bidder, user2: props.userId },
        });

        setChat([...chat.data.chat].reverse());
      } catch (err) {
        console.log(err.response.data.message);
      }
      // socket.emit("register", userId);
    };
    getChat();
  }, [props]);

  console.log(chats);

  useEffect(() => {
    if (ctx.socket) {
      ctx.socket.on("messageFromServer", (data) => {
        setChat((prevState) => [...prevState, data]);
        console.log(data);
        dispatch(MessageActions.updateMsg());
      });
    }
  }, []);

  // console.log(ctx.socket);
  const applyData = (user) => {
    setChat((prevState) => [...prevState, user.Chat]);
    dispatch(MessageActions.updateMsg());
    console.log(user.Chat);
    message.current.value = "";
  };

  const sendHandler = async (event) => {
    event.preventDefault();
    const msg = {
      message: message.current.value,
      users: [props.userId, props.bidder],
      sender: userId,
      image: userImage,
    };
    let ch;

    sendRequest(
      {
        method: "POST",
        url: "http://localhost:8000/api/users/sendMessage",
        data: msg,
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      },
      applyData
    );
  };

  const cancelHandler = () => {
    props.make();
  };
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-opacity-60">
      <animated.div
        style={styles}
        className="absolute bg-gray-200 rounded-lg w-96 h-96"
      >
        <div className="h-6 text-center rounded-lg text-gray-50 bg-slate-700">
          {props.name}
        </div>

        <div className="overflow-visible overflow-y-auto bg-gray-200 h-60 ">
          {chats.length !== 0 &&
            chats.map((p) => {
              // console.log(p);
              return (
                <div
                  key={p._id}
                  className="flex h-auto gap-3 px-4 mt-2 ml-2 w-80"
                >
                  <div
                    className={`grid h-auto grid-flow-col gap-3 p-1 rounded-lg ${
                      p.sender === userId ? "bg-blue-400 " : "bg-gray-500"
                    }`}
                  >
                    <div className="">
                      <img
                        className="w-6 h-6 rounded-full"
                        src={`http://localhost:8000/${p.image ? p.image : ""}`}
                        alt="pic"
                      ></img>
                    </div>

                    <div className="w-auto h-auto text-gray-100">
                      {p.message}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="mt-3 bg-gray-200">
          <textarea
            className="p-3 bg-transparent border-2 border-gray-500 rounded-md"
            ref={message}
            rows="1"
            cols="35"
          />
        </div>
        <button
          onClick={cancelHandler}
          className="px-2 py-1 bg-red-400 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={sendHandler}
          className="px-3 py-1 bg-red-400 rounded-lg ml-7"
        >
          Send
        </button>
      </animated.div>
    </div>
  );
};

export default ApproveBid;
