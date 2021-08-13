import React from "react";
import Helmet from "react-helmet"
import Sidebar from "react-sidebar";
import styled from "../../typed-components";

const Container = styled.div``;

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const HomePresenter: React.FC<IProps> = ({isMenuOpen, toggleMenu}) => (
  <Container>
    <Helmet>
      <title>Home | Nuber </title>
    </Helmet>
    <Sidebar
      sidebar={<b>Sidebar Content</b>}
      open={isMenuOpen}
      onSetOpen={toggleMenu}
      styles={{ sidebar: { 
        backgroundColor: "white",
        width: "80%",
        zIndex: "10",
      }}}
    >
      <button onClick={() => toggleMenu()}>
        Open Sidebar
      </button>
    </Sidebar>
  </Container>
);

export default HomePresenter;