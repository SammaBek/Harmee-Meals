import { SignActions } from "../store/SignIn-slice";
import { useSelector } from "react-redux";
import useHttp from "../hooks/Use-Http";
import { useRef } from "react";
import Cookies from "js-cookie";
const FillAuction = () => {
  const { sendRequest } = useHttp();
  const emailInput = useRef();
  const nameInput = useRef();
  const priceInput = useRef();
  const prodId = useSelector((state) => state.sign.prodId);
  const prodImage = useSelector((state) => state.sign.userImage);

  let email, price, product, name;
  const applyData = (user) => {
    console.log(user);
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
    product = prodId;

    console.log(prodImage);
    sendRequest(
      {
        method: "POST",
        url: "http://localhost:8000/api/meals/makebid",
        data: { email, price, name, product, prodImage },
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      },
      applyData
    );
  };

  return (
    <form onSubmit={bidHandler}>
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500">
        <div>
          <h1 className="mx-auto mt-20 text-4xl text-center text-gray-100">
            Place Your Price
          </h1>
        </div>
        <div className="w-5/12 mx-auto mt-5 border-2 rounded-lg shadow-2xl h-3/6">
          <div className="grid grid-flow-row mt-6 ml-10">
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

            <button
              type="submit"
              className="w-20 py-1 mt-10 text-xl text-gray-100 bg-red-400 rounded-lg hover:bg-red-500"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FillAuction;
