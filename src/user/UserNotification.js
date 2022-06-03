import { useEffect, useState } from "react";
import useHttp from "../hooks/Use-Http";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import Moment from "moment";
import ApproveBid from "./ApproveBid";

import Bid from "./Bid";
import Bids from "./Bids";
const UserNotification = () => {
  const [prods, setProds] = useState([]);
  const [arr, setArr] = useState([]);
  const [showApprov, setApprove] = useState(false);
  const { sendRequest } = useHttp();
  const [refresh, setRefresh] = useState();
  const applyData = (user) => {
    console.log(user);
  };
  const id = Cookies.get("userId");

  const bidHandler = () => {
    setApprove(!showApprov);
  };

  const make = () => {
    setApprove(false);
  };

  const userId = useSelector((state) => state.sign.userId);
  console.log(userId);

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
        setArr(Req.data.user.products);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };

    getData();
  }, [refresh, userId]);

  console.log(prods);
  console.log(arr);

  return (
    <section>
      {prods.length !== 0 &&
        arr.map((p) => {
          return (
            <div key={p._id} className="flex w-full gap-4 mt-3 h-60 ">
              <Bids
                key={p._id}
                image={p.image}
                price={p.price}
                name={p.name}
                description={p.description}
                productDeadline={p.productDeadline}
              />

              <div className="grid w-full grid-flow-row gap-5 py-1 mt-2 overflow-visible overflow-y-auto shadow-xl ">
                {p.bids.map((b) => {
                  return (
                    <Bid
                      bidder={b.bidderId}
                      key={b._id}
                      name={b.name}
                      price={b.price}
                      email={b.email}
                      image={b.image}
                      bidHandler={bidHandler}
                    />
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
