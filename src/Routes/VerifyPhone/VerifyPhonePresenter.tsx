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
  key: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: MutationFunction
  loading: boolean;
}

const VerifyPhonePresenter: React.FC<IProps> = ({ key, onChange, onSubmit, loading }) => (
  <Container>
    <Helmet>
      <title>Verify Phone | Nuber </title>
    </Helmet>
    <Header backTo={"/phone-login"} title={"Verify Phone Number"} />
    <ExtendedForm submitFn={onSubmit}>
      <ExtendedInput 
        value={key}
        placeholder={"Enter Verification Code"}
        onChange={onChange}
        name={"key"}
      />
      <Button disabled={loading} value={loading ? "Verifying" : "Submit"} onClick={null} />
    </ExtendedForm>
  </Container>  
);

export default VerifyPhonePresenter;