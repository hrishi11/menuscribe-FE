import React, { useState } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY } from "../constants";

function Map({ coordinates }) {
  const [globalResponse, setResponse] = useState(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });
  if (!isLoaded) {
    return null;
  }
  const directionsService = new google.maps.DirectionsService();

  const origin = coordinates[0];
  const destination = coordinates[coordinates.length - 1];
  const waypoints = coordinates.map((coord) => ({
    location: new google.maps.LatLng(coord.latitude, coord.longitude),
    stopover: true,
  }));
  if (!globalResponse) {
    directionsService.route(
      {
        origin: {
          location: new google.maps.LatLng(origin.latitude, origin.longitude),
        },
        destination: {
          location: new google.maps.LatLng(
            destination.latitude,
            destination.longitude
          ),
        },
        waypoints: waypoints,
        optimizeWaypoints: true, // Optimize the route to minimize travel time

        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setResponse(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }
  return (
    <GoogleMap
      center={{ lat: Number(origin.latitude), lng: Number(origin.longitude) }}
      zoom={8}
      mapContainerStyle={{ width: "100%", height: "400px" }}
    >
      {globalResponse !== null && (
        <DirectionsRenderer options={{ directions: globalResponse }} />
      )}
    </GoogleMap>
  );
}

export default Map;
