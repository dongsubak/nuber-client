import React from "react";
import Helmet from "react-helmet"
import Place from "../../Components/Place"
import { getPlaces } from "../../types/api";
import styled from "../../typed-components";
import Header from "../../Components/Header";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 0 40px;
`;

const SLink = styled(Link)`
  text-decoration: underline;
`;

interface IProps {
  data?: getPlaces;
  loading: boolean;
}

const PlacesPresenter: React.FC<IProps> = ({
  data: { GetMyPlaces: { places = null } = {} } = {},
  loading 
}) => (
  <React.Fragment>
    <Container>
      <Helmet>
        <title>Places | Nuber</title>
      </Helmet>
      <Header title={"Places"} backTo={"/"} />
      {!loading && places && places.length === 0 && "You have no places."}
      {!loading && places && places.map(place => (
        <Place
          key={place!.id}
          id={place!.id}
          fav={place!.isFav}
          name={place!.name}
          address={place!.address}
        />
      ))}
      <SLink to={"/add-place"}>Add some places.</SLink>
    </Container>
  </React.Fragment>
);

export default PlacesPresenter;