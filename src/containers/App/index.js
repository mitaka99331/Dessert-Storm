import React from "react";
import { AuthProvider } from "../../firebase/auth";
import Signup from "../../components/Signup";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "../../components/Login";
import PrivateRoute from "../../components/PrivateRoute";
import PublicRoute from "../../components/PublicRoute";
import ForgotPassword from "../../components/ForgotPassword";
import AppContainer from "./AppContainer";
import Home from "../Home";

const App = () => {
  return (
    <AppContainer>
      <Router>
        <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PublicRoute path="/signup" component={Signup} />
              <PublicRoute path="/login" component={Login} />
              <PublicRoute path="/forgot-password" component={ForgotPassword} />
            </Switch>
        </AuthProvider>
      </Router>
    </AppContainer>
  );
};
export default App;
