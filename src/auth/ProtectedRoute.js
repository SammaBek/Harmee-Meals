import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = (props) => {
  const user = true;

  if (!user) return <Redirect to="/signin" />;

  return <Route {...props} />;
};
