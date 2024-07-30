import React from "react";
import Script from "react-load-script";

const ScriptLoader = ({ apiKey, children }) => {
  const handleScriptLoad = () => {
    console.log("Google Maps script loaded successfully.");
  };

  const handleScriptError = () => {
    console.error("Error loading Google Maps script.");
  };

  return (
    <div>
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      />
      {children}
    </div>
  );
};

export default ScriptLoader;
