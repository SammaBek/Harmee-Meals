import Header from "./header/Header";
import SpinnerLoading from "./utils/SpinnerLoading";
import SignProvidor from "./store/SignProvidor";
// import UserSignUp from "./user/UserSignUp";
// import Meal from "./meal/Meal";
// import UserSignIn from "./user/UserSignIn";
import { ProtectedRoute } from "./auth/ProtectedRoute";
// import ForgotPassword from "./user/ForgotPassword";
// import MealsDemo from "./meal/MealsDemo";
import { useSelector } from "react-redux";
// import UserPage from "./user/UserPage";
// import AddProduct from "./user/AddProduct";
// import FillAuction from "./user/FillAuction";

import { useDispatch } from "react-redux";
// import NewPassword from "./user/NewPassword";
// import MessageDetail from "./user/MessageDetail";
import LandingPage from "./products/LandingPage";
import { io } from "socket.io-client";
// import Vehicles from "./Filters/Vehicles";
// import socket from "./utils/Socket";
// import { NotificationActions } from "./store/Notification-Slice";
// import SocketProvidor from "./store/SocketProvidor";
import SocketContext from "./store/Socket-Context";
// import Message from "./user/Message";
// import ProductDetailPage from "./products/ProductDetailPage";
// import Electronics from "./Filters/Electronics";
// import ProductDetail from "./products/ProductDetail";
// import SpecificProduct from "./products/SpecificProduct";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import { SignActions } from "./store/SignIn-slice";
import React, { useContext, useEffect, useState, Suspense } from "react";
import { MessageActions } from "./store/Message-Slice";

const UserSignUp = React.lazy(() => import("./user/UserSignUp"));
const Meal = React.lazy(() => import("./meal/Meal"));
const UserSignIn = React.lazy(() => import("./user/UserSignIn"));
const ForgotPassword = React.lazy(() => import("./user/ForgotPassword"));
const MealsDemo = React.lazy(() => import("./meal/MealsDemo"));
const UserPage = React.lazy(() => import("./user/UserPage"));
const AddProduct = React.lazy(() => import("./user/AddProduct"));
const FillAuction = React.lazy(() => import("./user/FillAuction"));
const NewPassword = React.lazy(() => import("./user/NewPassword"));
const MessageDetail = React.lazy(() => import("./user/MessageDetail"));
const ProductDetailPage = React.lazy(() =>
  import("./products/ProductDetailPage")
);
const Electronics = React.lazy(() => import("./Filters/Electronics"));
const ProductDetail = React.lazy(() => import("./products/ProductDetail"));
const SpecificProduct = React.lazy(() => import("./products/SpecificProduct"));
const Vehicles = React.lazy(() => import("./Filters/Vehicles"));

function App() {
  const ctx = useContext(SocketContext);
  const showMessages = useSelector((state) => state.message.showMessage);
  const detailMessage = useSelector((state) => state.message.detailMessage);
  const searched = useSelector((state) => state.sign.searched);
  const catagories = useSelector((state) => state.sign.catagories);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.sign.userId);
  const prodId = useSelector((state) => state.sign.prodId);

  const msgNum = useSelector((state) => state.message.numMessage);

  useEffect(() => {
    const socket = io(
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:8000"
          : "https://gabaaecom.onrender.com"
      }`
    );
    if (userId) {
      socket.emit("register", userId);
      ctx.setSocket(socket);
      console.log(socket);

      socket.on("newBid", (data) => {
        console.log(data);
      });
    }
  }, [userId]);

  const img = useSelector((state) => state.userImage);

  return (
    <Router>
      <Suspense
        fallback={
          <div className="mx-auto ">
            <SpinnerLoading />
          </div>
        }
      >
        <Header />

        <Switch>
          <Route path="/signup" exact>
            <UserSignUp />
          </Route>
          <Route path="/electronics" exact>
            <Electronics />
          </Route>
          <Route path="/vehicles" exact>
            <Vehicles />
          </Route>

          <Route path="/ProductDetailPage" exact>
            <ProductDetailPage search={searched} catagories={catagories} />
          </Route>

          <Route path="/landingPage" exact>
            <LandingPage />
          </Route>

          <Route path="/newpassword/:resetToken" exact>
            <NewPassword />
          </Route>

          <Route path="/user/addproduct" exact>
            <AddProduct />
          </Route>

          <Route path="/user/fillauction" exact>
            <FillAuction />
          </Route>

          <Route path="/userpage">
            <UserPage />
          </Route>
          <Route path="/user/products" exact>
            <MealsDemo onGetImage={img} />
          </Route>

          <Route path="/meals" exact>
            <Meal />
          </Route>
          <Route path="/signin" exact>
            <UserSignIn />
          </Route>
          <ProtectedRoute path="/user" exact>
            <Meal />
          </ProtectedRoute>
          <Route path="/forgotPassword" exact>
            <ForgotPassword />
          </Route>
          <Route path="/detail" exact>
            <ProductDetail />
          </Route>

          <Route path="/specificProduct" exact>
            <SpecificProduct prodId={prodId} />
          </Route>

          <Route path="/" exact>
            <LandingPage />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
