import { gql } from "apollo-boost";

export const LOG_USER_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
    ## only in client. ## apollo.ts
    ## not in codegen
  }
`;

export const LOG_USER_OUT = gql`
  mutation logUserOut {
    logUserOut @client
    ## only in client. ## apollo.ts
    ## not in codegen
  }
`;