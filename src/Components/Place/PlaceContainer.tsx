import React from "react";
import PlacePresenter from "./PlacePresenter";

interface IProps {
  fav: boolean;
  name: string;
  address: string;
}

class PlaceContainer extends React.Component<IProps> {
  public render() {
    const { fav, name, address } = this.props;
    return (
      <PlacePresenter fav={fav} name={name} address={address} />
    )
  }
}

export default PlaceContainer;