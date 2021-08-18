import React from "react";
import { Mutation, Query } from "react-apollo";
import { USER_PROFILE } from "../../shared.queries";
import { toggleDriving, userProfile } from "../../types/api";
import { TOGGLE_DRIVING } from "./Menu.queries";
import MenuPresenter from "./MenuPresenter";

class MenuContainer extends React.Component {
  public render() {
    return (
      //api 통해서 하려면 <Mutation<toggleDriving> mutation={TOGGLE_DRIVING} refetchQueries={[{query: USER_PROFILE }]}></Mutation>
      <Mutation<toggleDriving>
        mutation={TOGGLE_DRIVING} 
        refetchQueries={[{query: USER_PROFILE }]}
      >
        {( toggleDrivingFn )=>(
        <Query<userProfile> query={USER_PROFILE}>
          {({ data, loading }) => <MenuPresenter data={data} loading={loading} toggleDrivingFn={toggleDrivingFn}/>}
        </Query>
        )}
      </Mutation>
    );
  }
}

export default MenuContainer;