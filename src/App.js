import logo from "./logo.svg";
import "./App.css";
import react, { Fragment } from "react";
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
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <ErrorProvider>
      <SignProvidor>
        <Router>
          <Header />
          <Switch>
            <Route path="/signup" exact>
              <UserSignUp />
            </Route>
            <Route path="/mealsDemo" exact>
              <MealsDemo />
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
