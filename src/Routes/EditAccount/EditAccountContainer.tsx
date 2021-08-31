import React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { userProfile } from "src/types/api";
import { USER_PROFILE } from "../../shared.queries";
import { UPDATE_PROFILE } from "./EditAccount.queries";
import EditAccountPresenter from "./EditAccountPresenter";

interface IState {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
}

interface IProps extends RouteComponentProps<any>{
}

class EditAccountContainer extends React.Component<IProps, IState> {
  public state = {
    email: "",
    firstName: "",
    lastName: "",
    profilePhoto: ""
  };
  public render() {
    const { email, firstName, lastName, profilePhoto } = this.state;
    // Mutation, MutationFunction comparison - EditAccount, PhoneLogin, SocialLogin, VerifyPhone
    return (
      <Query query={USER_PROFILE} onCompleted={this.updateFields}>
        {() => (
          <Mutation mutation={UPDATE_PROFILE} variables={{
            email,
            firstName,
            lastName,
            profilePhoto
          }}>
            {(updateProfileFn, { loading }) => (
              <EditAccountPresenter
              email={email}
              firstName={firstName}
              lastName={lastName}
              profilePhoto={profilePhoto}
              onInputChange={this.onInputChange}
              loading={loading}
              onSubmit={updateProfileFn}
            />
            )}
          </Mutation>
        )}
      </Query>
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
  public updateFields = (data: {} | userProfile) => {
    if ("GetMyProfile" in data) {
      const { 
        GetMyProfile: { user }
      } = data;
      if (user !== null) {
        const { firstName, lastName, email, profilePhoto } = user;
        this.setState({
          firstName,
          lastName,
          email,
          profilePhoto
        } as any);
      }
    }
  };
}

export default EditAccountContainer;
