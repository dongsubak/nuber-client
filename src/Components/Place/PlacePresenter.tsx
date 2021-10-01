import React from "react";
import { MutationFunction } from "react-apollo";
import styled from "styled-components";

const Place = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
  & i {
    font-size: 12px;
  }
`;

const Container = styled.div`
  margin-left: 10px;
`;

const Name = styled.span`
  display: block;
`;

const Icon = styled.span`
  cursor: pointer;
`;

const Address = styled.span`
  color: ${(props) => props.theme.greyColor};
  font-size: 14px;
`;

interface IProps {
  fav: boolean;
  name: string;
  address: string;
  onPress: MutationFunction;
}

const PlacePresenter: React.FC<IProps> = ({
  onPress,
  fav,
  name,
  address,
}) => (
  <Place>
    <Icon onClick={onPress as any}>{fav ? "❤" : "♡"}</Icon>
    <Container>
      <Name>{name}</Name>
      <Address>{address}</Address>
    </Container>
  </Place>
);

export default PlacePresenter;
