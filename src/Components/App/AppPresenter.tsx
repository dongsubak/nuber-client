import PropTypes from "prop-types";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import AddPlace from "../../Routes/AddPlace";
import EditAccount from "../../Routes/EditAccount";
import FindAddress from "../../Routes/FindAddress";
import Home from "../../Routes/Home";
import LoginHome from "../../Routes/Login";
import PhoneLogin from "../../Routes/PhoneLogin";
import Places from "../../Routes/Places";
import Ride from "../../Routes/Ride";
import Settings from "../../Routes/Settings";
import VerifyPhone from "../../Routes/VerifyPhone";
import SocialLogin from "../../Routes/SocialLogin";


//import styled from "../../typed-components";

//const Thing = styled.div`
//  background: ${props => props.theme.primaryColor}
//`


interface IProps {
  isLoggedIn: boolean;
}

const AppPresenter: React.FC<IProps> = ({isLoggedIn}) => 
  <BrowserRouter>
    { isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes /> }
  </BrowserRouter>
;

const LoggedOutRoutes: React.FC = () => {
  return <Switch>
    <Route path={"/"} exact={true} component={LoginHome} />
    <Route path={"/phone-login"} component={PhoneLogin} />
    <Route path={"/verify-phone/"} component={VerifyPhone} />
    <Route path={"/social-login"} component={SocialLogin} />
    <Redirect from={"*"} to={"/"} />
  </Switch>;
}

const LoggedInRoutes: React.FC = () => {
  return <Switch>
    <Route path={"/"} exact={true} component={Home} />
    <Route path={"/ride"} component={Ride} />
    <Route path={"/edit-account"} component={EditAccount} />
    <Route path={"/settings"} component={Settings} />
    <Route path={"/places"} component={Places} />
    <Route path={"/add-place"} component={AddPlace} />
    <Route path={"/find-address"} component={FindAddress} />
    <Redirect from={"*"} to={"/"} />
  </Switch>
}

AppPresenter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}

export default AppPresenter;