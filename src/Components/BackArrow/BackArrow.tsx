import React from "react";
import { Link } from "react-router-dom";
import styled from "../../typed-components";

const Container = styled.div`
  transform: scale(0.8);
`;

interface Iprops {
  backTo: string;
  className?: string;
}

//backTo is prop.
//"styled" component passes through className. const BackArrowExtended = styled(BackArrow)``;
const BackArrow: React.FC<Iprops> = ({ backTo, className }) => (
  <Container className={className}>
    <Link to={backTo}>
      <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"      
        fill-rule="evenodd"
        clip-rule="evenodd"
      >
        <path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/>
      </svg>
    </Link>
  </Container>
);

export default BackArrow;

