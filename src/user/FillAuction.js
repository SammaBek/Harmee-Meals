import { SignActions } from "../store/SignIn-slice";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../hooks/Use-Http";
import { useRef } from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import { useSpring, animated } from "react-spring";
const FillAuction = (props) => {
  const styles = useSpring({
    from: { x: 100 },
    config: { duration: 1000 },
    loop: {
      x: 0,
    },
  });
  const { sendRequest } = useHttp();
  const emailInput = useRef();
  const nameInput = useRef();
  const priceInput = useRef();

  const prodId = useSelector((state) => state.sign.prodId);
  const prodImage = useSelector((state) => state.sign.userImage);
  const dispatch = useDispatch();

  let email, price, product, name;
  const applyData = (user) => {
    console.log(user);
    dispatch(SignActions.setShow({ show: false }));
    props.onMake();
  };

  const bidHandler = async (event) => {
    event.preventDefault();
    const form = new FormData();

    form.append("email", emailInput.current.value);
    form.append("name", nameInput.current.value);
    form.append("price", priceInput.current.value);
    form.append("product", prodId);
    form.append("image", prodId);

    console.log(emailInput.current.value);

    email = emailInput.current.value;
    price = priceInput.current.value;
    name = nameInput.current.value;
    product = props.prodId;

    console.log(product);

    console.log(prodImage);
    sendRequest(
      {
        method: "POST",
        url: `${
          process.env.NODE_ENV === "production"
            ? process.env.REACT_APP_BACKEND_URL
            : "http://localhost:8000/api"
        }/meals/makebid`,
        data: {
          email,
          price,
          name,
          product,
          prodImage,
          ownerId: props.ownerId,
        },
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      },
      applyData
    );
  };

  const cancelHandler = () => {
    // dispatch(SignActions.setShow({ show: false }));
    props.onMake();
  };

  return (
    <animated.form style={styles} onSubmit={bidHandler}>
      {props.show && (
        <div>
          <div>
            <h1 className="mx-auto mt-2 text-xl text-center text-blue-400">
              Make Your Bid
            </h1>
          </div>
          <div className="h-auto ml-20 border-2 rounded-lg shadow-2xl w-96 bg-gradient-to-r from-green-400 to-blue-500">
            <div className="grid grid-flow-row mt-4 ml-10">
              <div>
                <label className="text-gray-100 ">Name</label>
              </div>
              <div>
                <input
                  value={name}
                  ref={nameInput}
                  className="px-3 py-2 border-2 border-gray-100 rounded-lg w-72 bg-inherit"
                ></input>
              </div>

              <div>
                <label className="text-gray-100 ">Email</label>
              </div>
              <div>
                <input
                  value={email}
                  ref={emailInput}
                  className="px-3 py-2 border-2 border-gray-100 rounded-lg w-72 bg-inherit"
                ></input>
              </div>

              <div>
                <label className="text-gray-100 ">Price</label>
              </div>
              <div>
                <input
                  value={price}
                  ref={priceInput}
                  type="number"
                  className="w-40 px-3 py-2 border-2 border-gray-100 rounded-lg bg-inherit"
                ></input>
              </div>

              <div className="flex gap-6">
                <button
                  type="submit"
                  className="w-20 py-1 mt-5 mb-2 text-xl text-gray-100 bg-red-400 rounded-lg hover:bg-red-500"
                >
                  Send
                </button>
                <button
                  type="reset"
                  onClick={cancelHandler}
                  className="w-20 py-1 mt-5 mb-2 text-xl text-gray-100 bg-gray-400 rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </animated.form>
  );
};

export default FillAuction;
