import React from "react";
import ReactDOM from "react-dom";
import { reverseGeoCode } from "../../mapHelpers";
import FindAddressPresenter from "./FindAddressPresenter";

interface IState {
  lat: number;
  lng: number;
  address: string;
}

class FindAddressContainer extends React.Component<any, IState> {
  public mapRef: any;
  public map: google.maps.Map;
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  };
  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.handleGeoSuccess, this.handleGeoError);
  };
  public handleGeoSuccess = (position: any) => {
    const { coords: { latitude, longitude }} = position;
    console.log(position);
    this.setState({
      lat: latitude,
      lng: longitude
    })
    this.loadMap(latitude, longitude);
  };
  public handleGeoError = () => {
    console.log("No Location");
  };
  public render() {
    console.log(this.props);
    return <FindAddressPresenter mapRef={this.mapRef} />;
  };

  public loadMap = (lat, lng) => {  
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig: google.maps.MapOptions = {
      center: {
        lat,
        lng
      },
      disableDefaultUI: true,
      zoom: 11
    };
    this.map = new maps.Map(mapNode, mapConfig);
    this.map.addListener("dragend", this.handleDragEnd);
  };
  public handleDragEnd = async () => {
    const newCenter = this.map.getCenter();
    const lat = newCenter.lat();
    const lng = newCenter.lng();
    const reversedAddress = await reverseGeoCode(lat, lng);
    this.setState({
      lat,
      lng,
      address: reversedAddress
    });
  };
  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
  public onInputBlur = () => {
    console.log("Address Updated");
  };
}

export default FindAddressContainer;