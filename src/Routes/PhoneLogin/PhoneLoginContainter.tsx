import React from "react";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { RouteComponentProps } from "react-router-dom";

// interface IProps extends RouteComponentProps<any> {}
interface IState {
  countryCode: string;
  phoneNumber: string;
}

class PhoneLoginContainer extends React.Component<
  RouteComponentProps<any>, 
  IState
> {
  public state = {
    countryCode: "+82",
    phoneNumber: "123456"
  };
 
  public render() {
    alert(this.state.countryCode + this.state.phoneNumber); //console.log is not working
    const { countryCode, phoneNumber } = this.state;
    return <PhoneLoginPresenter countryCode={countryCode} phoneNumber={phoneNumber} />;
  }
}

export default PhoneLoginContainer;