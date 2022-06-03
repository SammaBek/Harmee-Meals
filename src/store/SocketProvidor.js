import React, { useContext, useReducer } from "react";
import SocketContext from "./Socket-Context";

const defaultSocket = {
  socket: null,
};
const socketReducer = (state, action) => {
  console.log(action.item);
  if (action.type === "SOCKET") {
    return {
      socket: action.item.socket,
    };
  }

  return defaultSocket;
};

const SocketProvidor = (props) => {
  const [socketState, dispatch] = useReducer(socketReducer, defaultSocket);

  const socketHandler = (socket) => {
    console.log(socket);
    dispatch({ type: "SOCKET", item: { socket } });
  };

  const socketContext = {
    socket: socketState.socket,
    setSocket: socketHandler,
  };

  return (
    <SocketContext.Provider value={socketContext}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvidor;
