import axios from "axios";
import { toast } from "react-toastify";
import { MAPS_KEY } from "./keys";

export const geoCode = async (address: string) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${MAPS_KEY}`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;
    const place1 = results[0];
    const {
      formatted_address,
      geometry: {
        location: { lat, lng },
      },
    } = place1;
    return { formatted_address, lat, lng };
  } else {
    toast.error(data.error_message);
    return false;
  }
};

export const reverseGeoCode = async (lat: number, lng: number) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_KEY}`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;
    const place1 = results[0];
    if (!place1) {
      return false;
    }
    const address = place1.formatted_address;
    return address;
  } else {
    toast.error(data.error_message);
    return false;
  }
};
