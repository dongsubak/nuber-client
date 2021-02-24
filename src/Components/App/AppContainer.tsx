import React from "react";
import { graphql } from "react-apollo";
import GlobalStyle from "../../global-styles";
import { theme } from "../../theme"
import { ThemeProvider } from "../../typed-components";
import AppPresenter from "./AppPresenter"
import { IS_LOGGED_IN } from "./AppQueries";


//const GlobalStyle = createGlobalStyle`${reset}`

const AppContainer: any = ({ data }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
  </ThemeProvider>
  //<div>{JSON.stringify(data)</div>
);


export default graphql(IS_LOGGED_IN)(AppContainer);