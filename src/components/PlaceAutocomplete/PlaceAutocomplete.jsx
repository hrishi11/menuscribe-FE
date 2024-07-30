// import React, { useState } from "react";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";
// import ScriptLoader from "./LoadScript";
// import { GOOGLE_MAPS_API_KEY } from "../../constants";

// export default function PlaceAutocomplete() {
//   const [address, setAddress] = useState("");

//   const handleSelect = async (value) => {
//     setAddress(value);
//     try {
//       const results = await geocodeByAddress(value);
//       const { lat, lng } = await getLatLng(results[0]);
//       console.log("Coordinates:", { lat, lng });
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <ScriptLoader apiKey={GOOGLE_MAPS_API_KEY}>
//       <div>
//         <PlacesAutocomplete
//           value={address}
//           onChange={setAddress}
//           onSelect={handleSelect}
//         >
//           {({
//             getInputProps,
//             suggestions,
//             getSuggestionItemProps,
//             loading,
//           }) => (
//             <div>
//               <input
//                 {...getInputProps({
//                   placeholder: "Search Places ...",
//                   className: "location-search-input",
//                 })}
//               />
//               <div className="autocomplete-dropdown-container">
//                 {loading && <div>Loading...</div>}
//                 {suggestions.map((suggestion) => {
//                   const className = suggestion.active
//                     ? "suggestion-item--active"
//                     : "suggestion-item";
//                   const style = suggestion.active
//                     ? { backgroundColor: "#fafafa", cursor: "pointer" }
//                     : { backgroundColor: "#ffffff", cursor: "pointer" };
//                   return (
//                     <div
//                       {...getSuggestionItemProps(suggestion, {
//                         className,
//                         style,
//                       })}
//                       key={suggestion.place_id}
//                     >
//                       <span>{suggestion.description}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </PlacesAutocomplete>
//       </div>
//     </ScriptLoader>
//   );
// }
