import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"

import "./styles/styles.css";

export default function Map(props) {

  const coordinates = props.concert.venue.city.coords;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyD8AVh8DuRPrQrNM1Dp0TCX0SA02dI9ADU'
  })

  if (!isLoaded) return <div>Loading...</div>

  return <ArtistMap latitude={coordinates.lat} longitude={coordinates.long} />
}

function ArtistMap(props) {

  return (
    <GoogleMap
      zoom={13}
      center={{ lat: parseFloat(props.latitude), lng: parseFloat(props.longitude) }}
      mapContainerClassName="map-container"
    >

      <MarkerF position={{ lat: parseFloat(props.latitude), lng: parseFloat(props.longitude) }}></MarkerF>
    </GoogleMap>
  );
}