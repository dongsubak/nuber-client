import React from "react";
import { Mutation, MutationFunction } from "react-apollo";
import { toast } from "react-toastify";
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
  public phoneMutation: MutationFunction;
  public state = {
    countryCode: "+82",
    phoneNumber: ""
  };

  public render() {
    //alert(this.state.countryCode + this.state.phoneNumber); //console.log is not working
    const { countryCode, phoneNumber } = this.state;
    //return (<PhoneLoginPresenter countryCode={countryCode} phoneNumber={phoneNumber} onInputChange={this.onInputChange} onSubmit={this.onSubmit} />)
    //안쓴다. you should pass function
    const phone = `${this.state.countryCode}${this.state.phoneNumber}`
    const { history } = this.props;

    return (
        <Mutation 
          mutation={PHONE_SIGN_IN} 
          variables={{phoneNumber: phone}} 
          //update mutation
          onCompleted={data =>{
            const { StartPhoneVerification } = data;
            if (StartPhoneVerification.ok) {
              toast.success("SMS Sent!");
              setTimeout(() => {
                history.push({
                  pathname: "/verify-phone",
                  state: phone
                });
              }, 1000);
            } else {
              toast.error(StartPhoneVerification.error);
            }
          }}
        >
        {(mutation, { loading }) => {
          this.phoneMutation = mutation;
          return (
            <PhoneLoginPresenter 
              countryCode={countryCode} phoneNumber={phoneNumber} onInputChange={this.onInputChange} onSubmit={this.onSubmit} loading={loading}
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
    console.log("event:"+event);
    console.log(name);;
    console.log(value);
    //as any 붙여야 error가 안 난다. This is a normal bug that always happens
    //return event;
  };

  public onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(`${this.state.countryCode}${this.state.phoneNumber}`);
      // ts-lint:disable-next-line
      console.log(isValid);
      if (isValid) {
        this.phoneMutation();
      } else {
        toast.error("Please write a valid phone number");
      }
    };
} 

export default PhoneLoginContainer;