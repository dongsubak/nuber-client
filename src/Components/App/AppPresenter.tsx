import PropTypes from "prop-types";
import React from "react";

import AddPlace from "../../Routes/AddPlace";
import EditAccount from "../../Routes/EditAccount";
import Home from "../../Routes/Home";
import OutHome from "../../Routes/OutHome";
import PhoneLogin from "../../Routes/PhoneLogin";
import Places from "../../Routes/Places";
import Ride from "../../Routes/Ride";
import Settings from "../../Routes/Settings";
import VerifyPhone from "../../Routes/VerifyPhone";



//import styled from "../../typed-components";

//const Thing = styled.div`
//  background: ${props => props.theme.primaryColor}
//`


interface IProps {
  isLoggedIn: boolean;
}

const AppPresenter: React.SFC<IProps> = ({isLoggedIn}) => 
  isLoggedIn ? <span>in</span> : <span>out</span>;

AppPresenter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}

export default AppPresenter;