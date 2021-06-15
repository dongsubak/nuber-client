import { gql } from "apollo-boost"

export const PHONE_SIGN_IN = gql`
  # mutation apollo용(){ graphql BackEnd용(){} }
  mutation startPhoneVerification($phoneNumber: String!){
    StartPhoneVerification(phoneNumber: $phoneNumber) {
      ok
      error
    }
  }
`;