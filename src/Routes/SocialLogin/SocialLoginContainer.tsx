import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
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
  public render() {
    return (
      <Mutation mutation={FACEBOOK_CONNECT}>
        <SocialLoginPresenter />;
      </Mutation>
    )
  }
}

export default SocialLoginContainer;