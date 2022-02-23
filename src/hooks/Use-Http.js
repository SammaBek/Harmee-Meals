import { useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ErrorContext from "../store/Error-Context";
import FormData from "form-data";

const useHttp = () => {
  const errCtx = useContext(ErrorContext);
  let user;
  const sendRequest = async (reqConfig, applyData) => {
    console.log(reqConfig);
    try {
      user = await axios({
        method: reqConfig.method ? reqConfig.method : "GET",
        url: reqConfig.url,
        data: reqConfig.data ? reqConfig.data : {},
        headers: reqConfig.headers ? reqConfig.headers : {},
      });
      console.log(user.data);

      if (user) {
        applyData(user.data);
      }
    } catch (err) {
      console.log(err.response);
      const errMsg = err.response.data.message;
      errCtx.setErrorMessage(errMsg);
    }
  };

  return {
    sendRequest,
  };
};

export default useHttp;
