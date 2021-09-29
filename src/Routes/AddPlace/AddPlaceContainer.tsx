import React from "react";
import { Mutation } from "react-apollo";
import { toast } from "react-toastify";
import { GET_PLACES } from "../../shared.queries";
import { ADD_PLACE } from "./AddPlace.queries";
import AddPlacePresenter from "./AddPlacePresenter";

interface IState {
  address: string;
  name: string;
  lat: number;
  lng: number;
}

class AddPlaceContainer extends React.Component<IState> {
  public state = {
    address: "",
    name: "",
    lat: 38.0,
    lng: 38.0
  };
  public render() {
    const { address, name, lat, lng } = this.state;
    const { history } = this.props;
    return (
      <Mutation 
        mutation={ADD_PLACE} 
        onCompleted={ data => {
          const { AddPlace } = data;
          if (AddPlace.ok) {
            toast.success("Place Added.");
            setTimeout(() => {
              history.push("/places");
            }, 1000);
          } else {
            toast.error(AddPlace.error); 
          }
        }}
        refetchQueries={[{ query: GET_PLACES }]}
        variables={{
          name,
          address,
          lat,
          lng,
          isFav: false
        }}
      >
        {(addPlaceFn, { loading }) => (
          <AddPlacePresenter
            onInputChange={this.onInputChange}
            address={address}
            name={name}
            loading={loading}
            onSubmit={addPlaceFn}
          />
        )}
      </Mutation>
    );
  }

  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const {
      target: { name, value },
    } = event;
    this.setState({
      [name]: value,
    } as any);
  };
}

export default AddPlaceContainer;
