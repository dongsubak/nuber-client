import React from "react";
import Helmet from "react-helmet"
import Header from "../../Components/Header";
import { MutationFunction } from "react-apollo";
import { Link } from "react-router-dom";
import styled from "../../typed-components";
import { userProfile } from "src/types/api";
import Place from "../Places";

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

const SettingsPresenter = ()=> (
  <React.Fragment>
    <Helmet>
      <title>Settings | Nuber</title>
    </Helmet>
    <Header title={"Account Settings"} backTo={"/"} />
    <Container>
      <GridLink to={"/edit-account"}>
        <Image src={"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"} />
        <Keys>
          <Key>user.fullName</Key>
          <Key>user.email</Key>
        </Keys>
      </GridLink>
      <Place fav={false} name={"Home"} address={"1111"} />
      <Place fav={false} name={"Home"} address={"1111"} />
      <Place fav={false} name={"Home"} address={"1111"} />
      <SLink to={"/places"}></SLink>
      <FakeLink>Log Out</FakeLink>
    </Container>
  </React.Fragment>
)

export default SettingsPresenter;