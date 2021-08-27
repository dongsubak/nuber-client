import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../sharedQueries";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { VERIFY_PHONE } from "./VerifyPhone.queries";

interface IState {
  verificationKey: string;
  phoneNumber: string;
}

interface IProps extends RouteComponentProps<any>{
}

class VerifyPhoneContainer extends React.Component<IProps, IState> {
  constructor(props: IProps){
    super(props);
    // tslint:disable-next-line
    console.log(props);

    try {
      Object.hasOwnProperty.call(props.location.state, "phone");
    } catch (e) {
      props.history.push("/");
    }
    /*
    if(!props.location.state){
      props.history.push("/");
    } else {
    */
      this.state = {
        verificationKey: "",
        phoneNumber: props.location.state as string
      };
      this.onInputChange = this.onInputChange.bind(this);
    // }
  };
  //public phoneMutation: MutationFunction;
  public render() {
    const { verificationKey, phoneNumber } = this.state;
    return (
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => (
          <Mutation 
            mutation={VERIFY_PHONE} 
            variables={{ 
              key: verificationKey,
              phoneNumber
            }}
            onCompleted={data => {
              const { CompletePhoneVerification } = data;
              console.log("CompletePhoneVerification")
              console.log(CompletePhoneVerification)
              if (CompletePhoneVerification.ok) {
                if (CompletePhoneVerification.token) {
                  logUserIn({
                    variables: {
                      token: CompletePhoneVerification.token
                    }
                  });
                }
                toast.success("You are verified, Now You can login")
              } else {
                toast.error(CompletePhoneVerification.error);
              }
                // tslint:disable-next-line
                // console.log(CompletePhoneVerification);
              }}
          >
            {(mutation, { loading }) => {
              //this.phoneMutation = mutation;
              return (
                <VerifyPhonePresenter 
                  verificationKey={verificationKey} 
                  onInputChange={this.onInputChange}
                  onSubmit={mutation}
                  loading={loading}
                />
              );
            }}
          </Mutation> 
        )}
      </Mutation>

    );
  }
  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      verificationKey: value
    } as any);
  }
}

export default VerifyPhoneContainer;
/*
old version
interface IProps extends RouteComponentProps<any>{
  logUserIn: MutationFn;
}
...
        onCompleted={( data ) => {
          const { CompletePhoneVerification } = data;
          if (CompletePhoneVerification.ok) {
            if (CompletePhoneVerification.token) {
              this.props.logUserIn({variables: {
                token: CompletePhoneVerification.token
              }});
            }
...          
export default graphql<IProps, any>(LOG_USER_IN, {
  name: "logUserIn"
})(VerifyPhoneContainer);
           
*/
//LOG_USER_IN은 mutation 
//decorate component with mutation

