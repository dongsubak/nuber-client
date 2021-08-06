import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { VERIFY_PHONE } from "./VerifyPhoneQueries.queries";

interface IState {
  key: string;
  phoneNumber: string;
}

interface IProps extends RouteComponentProps<any>{
}

class VerifyPhoneContainer extends React.Component<IProps, IState> {
  constructor(props: IProps){
    super(props);
    // tslint:disable-next-line
    console.log(props);
    if(!props.location.state){
      props.history.push("/");
    } else {
      this.state = {
        key: "",
        phoneNumber: props.location.state as string
      };
    }
  };
  //public phoneMutation: MutationFunction;
  public render() {
    const { key, phoneNumber } = this.state;
    return (
      <Mutation 
        mutation={VERIFY_PHONE} 
        variables={{ 
          key,
          phoneNumber
        }}
        onCompleted={( data ) => {
          const { CompletePhoneVerification } = data;
          if (CompletePhoneVerification.ok) {
            // tslint:disable-next-line
            // console.log(CompletePhoneVerification);
            toast.success("You are verified, Now You can login")
            return;
          } else {
            toast.error(CompletePhoneVerification.error);
          }
        }}
      >
        {(mutation, { loading }) => {
          //this.phoneMutation = mutation;
          return (
            <VerifyPhonePresenter 
              key={key} 
              onChange={this.onInputChange}
              onSubmit={mutation}
              loading={loading}
              />
          );
        }}
      </Mutation> 
    );
  }
  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
}

export default VerifyPhoneContainer;