import React from "react";
import jwt from "jsonwebtoken";
import { Route, Redirect } from "react-router-dom";

function isAuthenticated() {
  let authenticated = false;
  if (localStorage.getItem("token")) {
    jwt.verify(
      localStorage.getItem("token"),
      process.env.REACT_APP_JWT_SECRET,
      (err, decoded) => {
        if (err) {
          authenticated = false;
        } else {
          authenticated = true;
        }
      }
    );
    return authenticated;
  } else {
    return false;
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default PrivateRoute;
