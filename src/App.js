import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Account } from "./components/cognito";
import {PrivateRoute} from "./routes";
import { Login, Signup,ForgotPassword } from "./components/auth";
import { Dashboard } from "./components/dashboard";
import "./authForm.css";
export default () => {
  return (
    <Router>
      <Account className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/sign-in" component={Login} />
          <Route path="/sign-up" component={Signup} />
          <Route path="/forgotPassword" component={ForgotPassword} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Redirect from = '/' to = '/' />
        </Switch>
      </Account>
    </Router>
  );
};
