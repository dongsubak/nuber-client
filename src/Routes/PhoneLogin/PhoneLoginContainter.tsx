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
    phoneNumber: ""
  };
 
  public render() {
    //alert(this.state.countryCode + this.state.phoneNumber); //console.log is not working
    const { countryCode, phoneNumber } = this.state;
    return (<PhoneLoginPresenter countryCode={countryCode} phoneNumber={phoneNumber} onInputChange={this.onInputChange} onSubmit={this.onSubmit} />);
  }
  
  //CountrySelect나 Input이 바뀌면 onInputChange가 실행된다.
  public onInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (event) => {
    const { 
      target: {name, value}
    } = event;
    this.setState({
      [name]: value
    } as any);
    //as any 붙여야 error가 안 난다. This is a normal bug that always happens
    //return event;
  };

  public onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const { countryCode, phoneNumber } = this.state;
    // ts-lint:disable-next-line
    console.log(countryCode, phoneNumber);
  };
} 

export default PhoneLoginContainer;