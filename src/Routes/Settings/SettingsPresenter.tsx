import React from "react";
import Helmet from "react-helmet"
import Header from "../../Components/Header";
import { MutationFunction } from "react-apollo";
import { Link } from "react-router-dom";
import styled from "../../typed-components";
import Place from "../../Components/Place";
import { getPlaces, userProfile } from "../../types/api";

const Container = styled.div`
  padding: 0px 40px;
`;

const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;

const GridLink = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 10px;
  margin-bottom: 10px;
`;

const Keys = styled.div``;

const Key = styled.span`
  display: block;
  margin-bottom: 5px;
`;

const FakeLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const SLink = styled(Link)`
  display: block;
  text-decoration: underline;
  margin: 20px 0px;
`;

interface IProps {
  logUserOut: MutationFunction;
  userData?: userProfile;
  placesData?: getPlaces;
  userDataLoading: boolean;
  placesDataLoading: boolean;
}

const SettingsPresenter: React.FC<IProps> = ({ 
  logUserOut, 
  userData: { GetMyProfile : { user = null } = {} } = {}, 
  placesData: { GetMyPlaces: { places = null } = {} } = {}, 
  userDataLoading,
  placesDataLoading
}) => (
  <React.Fragment>
    <Helmet>
      <title>Settings | Nuber</title>
    </Helmet>
    <Header title={"Account Settings"} backTo={"/"} />
    <Container>
      <GridLink to={"/edit-account"}>
        { !userDataLoading && user && user.profilePhoto && user.email && user.fullName && (
          <React.Fragment>
            <Image src={user.profilePhoto} />
            <Keys>
              <Key>{user.fullName}</Key>
              <Key>{user.email}</Key>
            </Keys>
          </React.Fragment>
        )}
      </GridLink>
      {!placesDataLoading && places && places.map(place => (
        <Place key={place!.id} id={place!.id} fav={place!.isFav} name={place!.name} address={place!.address} />
      ))}
      <SLink to={"/places"}></SLink>
      <FakeLink onClick={logUserOut as any}>Log Out</FakeLink>
    </Container>
  </React.Fragment>
)

export default SettingsPresenter;