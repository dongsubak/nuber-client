import React from "react";
import { Mutation } from "react-apollo";
import { GET_PLACES } from "../../shared.queries";
import { EDIT_PLACE } from "./Place.queries";
import PlacePresenter from "./PlacePresenter";

interface IProps {
  fav: boolean;
  name: string;
  address: string;
  id: number;
}

class PlaceContainer extends React.Component<IProps> {
  public render() {
    const { id, fav, name, address } = this.props;
    return (
      <Mutation
        mutation={EDIT_PLACE}
        variables={{
          isFav: !fav,
          placeId: id
        }}
        refetchQueries={[{ query: GET_PLACES }]}
      >
        {(editPlaceFn) => (
          <PlacePresenter
            onPress={editPlaceFn}
            fav={fav}
            name={name}
            address={address}
          />
        )}
      </Mutation>
    );
  }
}

export default PlaceContainer;
