import logo from "./logo.svg";
import "./App.css";
import react, { Fragment } from "react";
import ErrorModal from "./modal/ErrorModal";
import Header from "./header/Header";
import ErrorProvider from "./store/ErrorProvider";
import UserSignUp from "./user/UserSignUp";
import Meal from "./meal/Meal";
import UserSignIn from "./user/UserSignIn";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <ErrorProvider>
      <Header />
      <Router>
        <Switch>
          <Route path="/signup" exact>
            <UserSignUp />
          </Route>
          <Route path="/" exact>
            <Meal />
          </Route>
          <Route path="/signin" exact>
            <UserSignIn />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </ErrorProvider>
  );
}

export default App;
