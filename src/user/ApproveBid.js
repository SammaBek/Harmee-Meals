import { useContext, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";
import SocketContext from "../store/Socket-Context";
import useHttp from "../hooks/Use-Http";
import Spinner from "../utils/SpinnerLoading";
import Moment from "moment";

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

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const [loading, setLoading] = useState(false);
  console.log(props.bidder, props.userId);

  dispatch(MessageActions.setNumMessage({ numMessage: 0 }));
  useEffect(() => {
    const getChat = async () => {
      setLoading(true);
      try {
        const chat = await axios({
          method: "POST",
          url: "http://localhost:8000/api/users/getChat",
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          data: { user1: props.bidder, user2: props.userId },
        });

        setChat([...chat.data.chat].reverse());
        setLoading(false);
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

  useEffect(scrollToBottom, [chats]);

  // console.log(ctx.socket);
  const applyData = (user) => {
    setChat((prevState) => [...prevState, user.Chat]);

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
    dispatch(MessageActions.updateMsg());
    props.make();
  };
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 ">
      <div className="flex items-center justify-center ">
        <div className="mt-20 rounded-lg shadow-2xl borde sm:mt-28 w-72 bg-gray-50 md:w-96 lg:h-96">
          <div className="h-6 text-center rounded-lg text-gray-50 bg-slate-700">
            {props.name}
          </div>

          <div className={` overflow-y-auto  bg-gray-50 sm:h-60 h-52 `}>
            {loading && (
              <div>
                <Spinner />
              </div>
            )}

            {chats.length !== 0 &&
              chats.map((p) => {
                // console.log(p);
                return (
                  <div
                    key={p._id}
                    className={`flex h-auto  gap-3 px-4 mt-2 ml-2 w-72 `}
                  >
                    <div
                      className={`grid  h-auto grid-flow-col w-auto gap-3 p-1 rounded-lg ${
                        p.sender === userId
                          ? "bg-blue-600 object-none object-right"
                          : "bg-gray-300"
                      }`}
                    >
                      {
                        <div className="">
                          <img
                            className="w-5 h-5 rounded-full lg:w-6 lg:h-6"
                            src={`http://localhost:8000/${
                              p.image ? p.image : ""
                            }`}
                            alt="pic"
                          ></img>
                        </div>
                      }

                      <div
                        className={`w-auto h-auto text-sm ${
                          p.sender === userId
                            ? " text-gray-100 "
                            : "text-gray-700"
                        }  lg:text-sm`}
                      >
                        {p.message}
                      </div>
                    </div>
                  </div>
                );
              })}

            <div ref={messagesEndRef} />
          </div>
          <div className="mt-3 bg-gray-50">
            <input
              className="px-3 py-2 mb-1 ml-2 bg-transparent border border-gray-500 rounded-xl w-80"
              ref={message}
            />
          </div>

          <button
            onClick={sendHandler}
            className="px-4 py-1 mt-1 mb-1 ml-2 bg-green-400 rounded-lg text-gray-50"
          >
            Send
          </button>
          <button
            onClick={cancelHandler}
            className="px-3 py-1 mt-1 bg-red-400 rounded-lg text-gray-50 ml-7"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveBid;
