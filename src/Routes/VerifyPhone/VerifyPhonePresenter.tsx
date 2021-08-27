// import React from "react";
import { MutationFunction } from "react-apollo";
import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input"
import styled from "../../typed-components";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;

interface IProps {
  verificationKey: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: MutationFunction
  loading: boolean;
}

const VerifyPhonePresenter: React.FC<IProps> = ({ verificationKey, onInputChange, onSubmit, loading }) => (
  <Container>
    <Helmet>
      <title>Verify Phone | Nuber </title>
    </Helmet>
    <Header backTo={"/phone-login"} title={"Verify Phone Number"} />
    <ExtendedForm submitFn={onSubmit}>
      <ExtendedInput 
        value={verificationKey}
        placeholder={"Enter Verification Code"}
        onChange={onInputChange}
        name={"key"}
      />
      <Button disabled={loading} value={loading ? "Verifying" : "Submit"} onClick={null} />
    </ExtendedForm>
  </Container>  
);

export default VerifyPhonePresenter;