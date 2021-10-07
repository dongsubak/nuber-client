import { GoogleApiWrapper } from "google-maps-react";
import { MAPS_KEY } from "../../keys";
import FindAddressContainer from "./FindAddressContainter";
export default GoogleApiWrapper({
  apiKey: MAPS_KEY
})(FindAddressContainer);