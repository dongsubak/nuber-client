import React from "react";
import { graphql } from "react-apollo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import GlobalStyle from "../../global-styles";
import { theme } from "../../theme"
import { ThemeProvider } from "../../typed-components";
import AppPresenter from "./AppPresenter"
import { IS_LOGGED_IN } from "./AppQueries.local";


//const GlobalStyle = createGlobalStyle`${reset}`

const AppContainer: any = ({ data }) => (
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
    </ThemeProvider>
    <ToastContainer draggable={true} position={"bottom-center"} />
  </React.Fragment>
  //<div>{JSON.stringify(data)</div>
);


export default graphql(IS_LOGGED_IN)(AppContainer);