import React from "react";
import { Mutation } from "react-apollo";
import { MutationUpdaterFn } from "apollo-boost";
import { toast } from "react-toastify";
import { startPhoneVerification } from "../../types/api";
import { RouteComponentProps } from "react-router-dom";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { PHONE_SIGN_IN } from "./PhoneQueries.queries";



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

// class PhoneSignInMutation extends Mutation< startPhoneVerification, startPhoneVerificationVariables> {}

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
    
    return (
        <Mutation mutation={PHONE_SIGN_IN} variables={{phoneNumber: `${countryCode}-${phoneNumber}`}} update={this.afterSubmit}>

        {(mutation, { loading }) => {
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
              countryCode={countryCode} phoneNumber={phoneNumber} onInputChange={this.onInputChange} onSubmit={onSubmit}
            />
          );
        }}
        </Mutation>
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

  //update mutation
  public afterSubmit: MutationUpdaterFn = (cache, result: any) => {
    const data: startPhoneVerification = result.data;
    
    //tslint:disable-next-line
    console.log(data);
    console.log(result);
  }
} 

export default PhoneLoginContainer;