import React from "react";
import { Mutation, Query } from "react-apollo";
import SettingsPresenter from "./SettingsPresenter";
import { LOG_USER_OUT } from "../../sharedQueries.local"
import { GET_PLACES, USER_PROFILE } from "../../shared.queries";

class SettingsContainer extends React.Component {
  public render() {
    return (
      <Mutation mutation={LOG_USER_OUT}>
        {logUserOut => 
          <Query query={USER_PROFILE}>
            {({ data: userData, loading: userDataLoading } ) => (
              <Query query={GET_PLACES}>
                {({ data: placesData, loading: placesDataLoading } ) => (
                <SettingsPresenter 
                  userDataLoading={userDataLoading} 
                  userData={userData} 
                  placesDataLoading={placesDataLoading}
                  placesData={placesData} 
                  logUserOut={logUserOut} />
                )}
              </Query>
            )}
          </Query>
        }
      </Mutation>
    );
  }
}

export default SettingsContainer;