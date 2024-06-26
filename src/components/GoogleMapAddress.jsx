import React from "react";
import Map from "./GoogleMap"; // Assuming GoogleMap.jsx is in the same directory

function GoogleMapAddress({ address }) {
  // Geocode the address to get coordinates
  // For simplicity, let's assume we have a function called geocodeAddress
  // that returns a Promise resolving to an object with latitude and longitude
  const geocodeAddress = async (address) => {
    // Simulated geocoding function
    return {
      latitude: 40.7128, // Example latitude
      longitude: -74.006, // Example longitude
    };
  };

  // Render the map once the address is geocoded
  const renderMap = async () => {
    try {
      const { latitude, longitude } = await geocodeAddress(address);
      const coordinates = [{ latitude, longitude }]; // For simplicity, using a single coordinate
      return <Map coordinates={coordinates} />;
    } catch (error) {
      console.error("Error geocoding address:", error);
      return <div>Error loading map</div>;
    }
  };

  return <div style={{ width: "100%", height: "400px" }}>{renderMap()}</div>;
}

export default GoogleMapAddress;
