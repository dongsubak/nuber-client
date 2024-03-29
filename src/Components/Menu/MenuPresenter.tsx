import React from "react";
import { Link } from "react-router-dom";
import { toggleDriving, userProfile } from "../../types/api";
import styled from "../../typed-components"
import { MutationFunction } from "react-apollo";

const Container = styled.div`
  height: 100%;
`;

const Header = styled.div`
  background-color: black;
  height: 20%;
  margin-bottom: 30px;
  padding: 0 15px;
  color: white;
`;

const SLink = styled(Link)`
  font-size: 22px;
  display: block;
  margin-left: 15px;
  margin-bottom: 25px;
  font-weight: 400;
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
  background-color: grey;
  border-radius: 40px;
  overflow: hidden;
`;

const Name = styled.h2`
  font-size: 22px;
  color: white;
  margin-bottom: 10px;
  white-sapce; nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Rating = styled.h5`
  font-size: 18px;
  color: white;
`;

const Text = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 10px;
  height: 100%
  align-items: center;
`;

interface IToggleProps {
  isDriving: boolean; 
}

const ToggleDriving = styled.button<IToggleProps>`
  --webkit-appearance: none;
  background-color: ${props => (props.isDriving ? props.theme.yellowColor : props.theme.greenColor)};
  width: 100%;
  color: white;
  font-size: 18px;
  border: 0;
  padding 15px 0px;
  cursor: pointer;
`;

interface IProps {
  data?: userProfile;
  loading: boolean;
  toggleDrivingFn: MutationFunction<toggleDriving>;
}

const MenuPresenter: React.FC<IProps> = ({
  data: { GetMyProfile : { user = null } = {} } = {},
  // data: { GetMyProfile : { user = null } = {} } = {} 
  // = 앞이 undefined 면 {}
  loading,
  toggleDrivingFn
}) => (
  <Container>
    {!loading && user && user.fullName && (
    <React.Fragment>
      <Header>
        <Grid>
          <Link to="/edit-account">
            <Image src={
              user.profilePhoto ||
              "https://lh3.googleusercontent.com/-CTwXMuZRaWw/AAAAAAAAAAI/AAAAAAAAAUg/8T5nFuIdnHE/photo.jpg"
            } />
          </Link>
          <Text>
            <Name>{user.fullName /*위에 && user.fullName 빼고 user.fullName!도 된다.*/}</Name>
            <Rating>5/5</Rating>
          </Text>
        </Grid>
      </Header>
      <SLink to="/trips">Your Trips</SLink>
      <SLink to="/settings">Settings</SLink>
      <ToggleDriving onClick={()=>toggleDrivingFn()} isDriving={user.isDriving}>{user.isDriving ? "Stop driving" : "Start driving"}</ToggleDriving>
    </React.Fragment>
    )}
  </Container>
);

export default MenuPresenter;