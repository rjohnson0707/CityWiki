import React from "react";
import "./Map.css";
import mapStyle from "./map-style";
class Map extends React.Component {
  mapDiv = React.createRef();

  setMap() {
    if (this.props.lat && this.props.lng) {
      const location = { lat: this.props.lat, lng: this.props.lng };
      const map = new window.google.maps.Map(this.mapDiv.current, {
        zoom: this.props.zoom || 12,
        center: location,
        disableDefaultUI: true,
        styles: mapStyle,
      });
      new window.google.maps.Marker({ position: location, map: map });
    }
  }

  // Called after the first render
  componentDidMount() {
    this.setMap();
  }

  // Called when props or state change
  componentDidUpdate() {
    this.setMap();
  }

  render() {
    return <div ref={this.mapDiv} className="Map"></div>;
  }
}

export default Map;
