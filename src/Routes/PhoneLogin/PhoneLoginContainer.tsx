import React from "react";
import { Mutation } from "react-apollo";
import { MutationUpdaterFn, useMutation } from "@apollo/client"
import { toast } from "react-toastify";
import { startPhoneVerification, startPhoneVerificationVariables } from "../../types/api";
import { RouteComponentProps } from "react-router-dom";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { PHONE_SIGN_IN } from "./PhoneQueries.queries";
import { any } from "prop-types";



// interface IProps extends RouteComponentProps<any> {}
interface IState {
  countryCode: string;
  phoneNumber: string;
}

//interface IData {
//  ok: boolean;
//  error: string;
//}

//interface IMutationInterface {
//  phoneNumber: string
//}

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
    //return (<PhoneLoginPresenter countryCode={countryCode} phoneNumber={phoneNumber} onInputChange={this.onInputChange} onSubmit={this.onSubmit} />)
    //안쓴다. you should pass function
    const [mutation] = useMutation<startPhoneVerification, startPhoneVerificationVariables>(PHONE_SIGN_IN, {update: this.afterSubmit});
    return (
        (mutation, { loading }) => {
        const onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
          const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(`${countryCode}${phoneNumber}`);
            // ts-lint:disable-next-line
            console.log(countryCode, phoneNumber);
            // ts-lint:disable-next-line
            console.log(isValid);
            if (isValid) {
              mutation();
            } else {
              toast.error("Please write a valid phone number");
            }
          };
          return (
            <PhoneLoginPresenter 
              countryCode={countryCode} phoneNumber={phoneNumber} onInputChange={this.onInputChange} onSubmit={this.onSubmit}
            />
          );
        }
    );
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
    const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(`${countryCode}${phoneNumber}`);
    // ts-lint:disable-next-line
    console.log(countryCode, phoneNumber);
    // ts-lint:disable-next-line
    console.log(isValid);
    if (isValid) {
      return;
    } else {
      toast.error("Please write a valid phone number");
    }
  };

  //update mutation
  public afterSubmit: MutationUpdaterFn = (cache, result: any) => {
    const data: startPhoneVerification = result.data;
    
    //tslint:disable-next-line
    console.log(data);
    console.log(result);
  }
} 

export default PhoneLoginContainer;