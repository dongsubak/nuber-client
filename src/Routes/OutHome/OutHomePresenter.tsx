import React from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "../../typed-components";

const Container = styled.div``;
console.log(Container);

interface IProps extends RouteComponentProps{
}

const OutHomePresenter: React.FC<IProps> = () => (
<span></span>
);

export default OutHomePresenter;