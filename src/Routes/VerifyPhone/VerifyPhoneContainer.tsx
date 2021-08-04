import React from "react";
import { RouteComponentProps } from "react-router-dom";
import VerifyPhonePresenter from "./VerifyPhonePresenter";

interface IState {
  key: string;
}

interface IProps extends RouteComponentProps<any>{
}

class VerifyPhoneContainer extends React.Component<IProps, IState> {
  public state = {
    key: ""
  };
  constructor(props: IProps){
    super(props);
    // tslint:disable-next-line
    console.log(props);
    if(!props.location.state){
      props.history.push("/");
    }
  };
  public render() {
    const { key } = this.state;
    return (
      <VerifyPhonePresenter key={key} onChange={this.onInputChange} />
    );
  }
  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
}

export default VerifyPhoneContainer;