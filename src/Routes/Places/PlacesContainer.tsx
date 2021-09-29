import React from "react";
import { Query } from "react-apollo";
import { GET_PLACES } from "src/shared.queries";
import PlacesPresenter from "./PlacesPresenter";

class PlacesContainer extends React.Component {
  public render() {
    return (
      <Query query={GET_PLACES}>
        {({ data, loading }) => (
          <PlacesPresenter data={data} loading={loading} />
        )}
      </Query>
    )
  }
}

export default PlacesContainer;