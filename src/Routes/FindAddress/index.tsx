import { GoogleApiWrapper } from "google-maps-react";
import FindAddressContainer from "./FindAddressContainter";
export default GoogleApiWrapper({
  apiKey: ""
})(FindAddressContainer);