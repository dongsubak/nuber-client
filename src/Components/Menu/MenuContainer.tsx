import React from "react";
import { Mutation, Query } from "react-apollo";
import { toast } from "react-toastify";
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
        //refetchQueries={[{query: USER_PROFILE }]} //API를 건드린다.
        update={(cache, { data }) => {
          if (data) {
            const { ToggleDrivingMode } = data;
            if (!ToggleDrivingMode.ok) {
              toast.error(ToggleDrivingMode.error);
              return;
            }
            const query: userProfile | null = cache.readQuery({ query: USER_PROFILE });
            console.log(query);
            if (query) {
              //query.GetMyProfile.user!.isDriving = !query.GetMyProfile.user!.isDriving
              const { GetMyProfile: { user }} = query;
              if (user) {
                user.isDriving = !user.isDriving;
              }
            }
            cache.writeQuery({ query: USER_PROFILE, data: query });
          }
        }}
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