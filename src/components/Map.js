import { useMemo } from "react";

import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"

import "./styles/styles.css";

export default function Map() {
  // Use ENV FILE to Hide Google API Key
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD8AVh8DuRPrQrNM1Dp0TCX0SA02dI9ADU"
  })

  if (!isLoaded) return <div>Loading...</div>

  return <ArtistMap />
}

const center = { lat: 43.6532, lng: -79.3832 }

function ArtistMap() {

  return (
    <GoogleMap
      zoom={10}
      center={{ lat: 43.6532, lng: -79.3832 }}
      mapContainerClassName="map-container"
    >

      <MarkerF position={{ lat: 43.6532, lng: -79.3832 }}></MarkerF>
    </GoogleMap>
  );
}