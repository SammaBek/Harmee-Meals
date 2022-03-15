import logo from "./logo.svg";
import "./App.css";
import react, { Fragment, useEffect } from "react";
import ErrorModal from "./modal/ErrorModal";
import Header from "./header/Header";
import ErrorProvider from "./store/ErrorProvider";
import SignProvidor from "./store/SignProvidor";
import UserSignUp from "./user/UserSignUp";
import Meal from "./meal/Meal";
import UserSignIn from "./user/UserSignIn";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import ForgotPassword from "./user/ForgotPassword";
import MealsDemo from "./meal/MealsDemo";
import { SignActions } from "./store/SignIn-slice";
import { useSelector } from "react-redux";
import UserPage from "./user/UserPage";
import EditUserPage from "./user/EditUserPage";
import AddProduct from "./user/AddProduct";
import FillAuction from "./user/FillAuction";
import UserNotification from "./user/UserNotification";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import useHttp from "./hooks/Use-Http";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";

function App() {
  const img = useSelector((state) => state.userImage);
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();
  let user;

  useEffect(() => {
    const getData = async () => {
      try {
        // ${localStorage.getItem("token")}
        const user = await axios({
          method: "GET",
          url: `http://localhost:8000/api/users/${Cookies.get("userId")}`,
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });

        dispatch(
          SignActions.signIn({
            token: user.token,
            userId: user.theUser.id,
            userImage: user.theUser.image,
            userName: user.theUser.userName,
            userEmail: user.theUser.email,
          })
        );
      } catch (err) {
        console.log(err.response.data.message);
      }
    };

    getData();
  }, []);

  console.log("FIRST TIMER");
  return (
    <ErrorProvider>
      <SignProvidor>
        <Router>
          <Header />
          <Switch>
            <Route path="/signup" exact>
              <UserSignUp />
            </Route>
            <Route path="/user/notification" exact>
              <UserNotification />
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
          </Switch>
        </Router>
      </SignProvidor>
    </ErrorProvider>
  );
}

export default App;
