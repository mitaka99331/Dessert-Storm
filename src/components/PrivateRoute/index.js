import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../firebase/auth";
import NavBar from "../NavBar";
import { DatabaseProvider } from "../../firebase/database";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? (
          <DatabaseProvider>
            <NavBar />
            <Component {...props} />
          </DatabaseProvider>
        ) : (
          <Redirect to="/login" />
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
