import { useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import FormData from "form-data";
import { ErrorAction } from "../store/Error-Slice";
import { useDispatch } from "react-redux";

const useHttp = () => {
  const dispatch = useDispatch();
  let user;
  const sendRequest = async (reqConfig, applyData) => {
    console.log(reqConfig.data);
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
      dispatch(ErrorAction.setError({ ErrorMessage: errMsg }));
    }
  };

  return {
    sendRequest,
  };
};

export default useHttp;
