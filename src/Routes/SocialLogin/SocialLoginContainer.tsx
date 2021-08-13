import React from "react";
import { Mutation, MutationFunction } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../sharedQueries";
import { FACEBOOK_CONNECT } from "./SocialLogin.queries";
import SocialLoginPresenter from "./SocialLoginPresenter";

interface IState{
  firstName: string;
  lastName: string;
  email?: string; 
  fbId:string;
}

interface IProps extends RouteComponentProps<any>{
}

class SocialLoginContainer extends React.Component<IProps, IState> {
  public state = {
    email: "", 
    fbId: "",
    firstName: "",
    lastName: ""
  }
  public facebookMutation: MutationFunction;
  public render() {
    //  const { firstName, lastName, email, fbId } = this.state;
    return (
      <Mutation mutation={LOG_USER_IN}>
        {(logUserIn => (
          <Mutation mutation={FACEBOOK_CONNECT}
          onCompleted={(data) => {
            const { FacebookConnect } = data;
            if (FacebookConnect.ok) {
              logUserIn({
                variables: {
                  token: FacebookConnect.token
                }
              });
            } else {
              toast.error(FacebookConnect.error) ;
            }
          }}
          /*
          variables={{
            email, 
            fbId,
            firstName, 
            lastName, 
            }}
          */
          >
            {(facebookMutation, { loading }) => {
              this.facebookMutation = facebookMutation;
              return <SocialLoginPresenter loginCallback={this.loginCallback}/>
            }}
          </Mutation>
        ))}
      </Mutation>

    );
  }
  
  public loginCallback = response => {
    const { first_name, email, last_name, id, accessToken } = response;
    if (accessToken) {
      toast.success(`Welcome ${first_name} ${last_name}`);
      this.facebookMutation({
        variables: { 
          email,
          fbId: id,
          firstName: first_name, 
          lastName: last_name 
        }
      });
    } else {
      toast.error("Could not log you in");
    }
    /*
    this.setState({ 
      email,
      fbId: id,
      firstName: first_name, 
      lastName: last_name 
    });
    */

  };
  /*
  //pattern 1
  class SocialLoginContainer ...
    public mutation: MutationFn;
    public render() {
      ...
      {(facebookConnect, {loading}) => (
        this.mutation = facebookConnect;
        return (<SocialLoginPresenter loginCallback={this.callback}/>);)
      ...
    }
    public callback =(fbData) => {
      this.setState({});
      this.mutation();
    }
  */
}

export default SocialLoginContainer;