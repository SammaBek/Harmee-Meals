import { useEffect, useState } from "react";
import useHttp from "../hooks/Use-Http";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import Moment from "moment";
const UserNotification = () => {
  const [prods, setProds] = useState([]);
  const { sendRequest } = useHttp();
  const applyData = (user) => {
    console.log(user);
  };
  const id = Cookies.get("userId");

  const bidHandler = () => {
    console.log("hello");
  };

  const userId = localStorage.getItem("userId");
  console.log(userId);
  let arr;
  useEffect(() => {
    const getData = async () => {
      try {
        // ${localStorage.getItem("token")}
        const Req = await axios({
          method: "GET",
          url: `http://localhost:8000/api/users/${userId}`,
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });
        setProds(Req.data.user);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };

    getData();
  }, []);

  console.log(prods);

  return (
    <section>
      {prods.length !== 0 &&
        prods.products.map((p) => {
          return (
            <div key={p.id} className="flex w-full h-56 gap-4 mt-3 ">
              <div className="flex w-full ml-4">
                <div className="flex w-full h-56 gap-5 border-2 border-transparent shadow-2xl">
                  <div className="w-1/2 ">
                    <img
                      className="w-full h-full py-2 rounded-2xl"
                      alt="pic"
                      src={`http://localhost:8000/${p.image}`}
                    />
                  </div>
                  <div className="grid w-1/2 grid-flow-row py-4 mt-5 text-lg text-blue-400 ">
                    <div>
                      <label>Name: {p.name}</label>
                    </div>
                    <div>
                      <label>price: {p.price}</label>
                    </div>
                    <div>
                      <label>Description: {p.description}</label>
                    </div>
                    <div>
                      <label>
                        Deadline: {Moment(p.productDeadline).format("LLLL")}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid w-full grid-flow-row gap-5 py-1 mt-2 overflow-visible overflow-y-auto shadow-xl">
                {p.bids.map((b) => {
                  return (
                    <div
                      key={b.id}
                      onClick={bidHandler}
                      className="grid grid-flow-col gap-20 text-blue-400 border-2 border-t-0 border-l-0 border-r-0 border-blue-400 "
                    >
                      <div className="w-20 ">
                        <img
                          className="w-16 h-16 transform -translate-y-1 rounded-full"
                          src={`http://localhost:8000/${b.image}`}
                          alt="pic"
                        ></img>
                      </div>
                      <div className="w-32 underline transform translate-y-3">
                        {b.name}
                      </div>
                      <div className="w-24 transform translate-y-3">
                        {b.email}
                      </div>
                      <div className="w-24 transform translate-y-3">
                        ${b.price}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default UserNotification;
