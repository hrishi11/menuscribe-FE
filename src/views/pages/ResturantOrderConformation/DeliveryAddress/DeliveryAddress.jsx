import { CFormLabel, CFormInput, CCol } from "@coreui/react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY } from "../../../../constants";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { top100Films, top100Films2 } from "../../../vendors/data";
import { Autocomplete as TextAuto } from "@mui/material";
import TextField from "@mui/material/TextField";
import { getCities } from "../../../../actions/vendorReducers/VendorActions";

const DeliveryAddress = ({ user, setUser, scrollRef }) => {
  const libraries = ["places"];
  const [autocomplete, setAutocomplete] = useState(null);
  const [cities, setCities] = useState([]);
  const dispatch = useDispatch();

  const handleCityChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, address: { ...user.address, city: value } });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [CitiesResponse] = await Promise.all([dispatch(getCities())]);
        console.log("000", CitiesResponse);
        const data = CitiesResponse.data.map((item) => ({
          label: `${item.city}`,
          id: item.id,
        }));
        console.log(data.length);
        setCities(data);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };
    fetchData();
  }, []);
  const handlePlaceSelect = (place) => {
    const address = place.formatted_address;

    const postalCodeComponent = place.address_components.find((component) =>
      component.types.includes("postal_code")
    );
    const cityComponent = place.address_components.find((component) =>
      component.types.includes("locality")
    );

    const postal = postalCodeComponent ? postalCodeComponent.short_name : "";

    const city = cityComponent ? cityComponent.long_name : "";
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const city_id = cities.find(
      (item) => item.label.toLowerCase() === city.toLowerCase()
    );
    const unit_number = place.address_components.find(
      (item) => item.types[0] === "subpremise"
    );
    console.log("uni", unit_number);
    setUser({
      ...user,
      address: {
        city: city_id.id ? city_id : {},
        postal,
        address,
        latitude: lat,
        longitude: lng,
        unit_number: unit_number?.short_name,
      },
    });
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, address: { ...user.address, address: value } });
  };
  return (
    <div className="box px-2 py-2 text-center mb-16x" ref={scrollRef}>
      <h5 className="text-blue"> DELIVERY ADDRESS </h5>

      <CFormLabel> WHAT IS YOUR DELIVERY ADDRESS </CFormLabel>
      <div className="flex gap-2 max-sm:flex-wrap">
        <LoadScript
          googleMapsApiKey={GOOGLE_MAPS_API_KEY}
          libraries={libraries}
          loadingElement={<div className="absolute right-0">Loading...</div>}
          id="google-maps-script"
        >
          <Autocomplete
            onLoad={(autocomplete) => {
              setAutocomplete(autocomplete);
            }}
            className="lg:w-[70%]  max-sm:w-full"
            onPlaceChanged={() => {
              autocomplete?.getPlace() &&
                handlePlaceSelect(autocomplete.getPlace());
            }}
          >
            <CFormInput
              // className="simple-input"
              id="F"
              type="text"
              name="address"
              placeholder="Enter your address"
              className="w-full"
              // style={{ width: "100%" }}
              required
              onChange={handleAddressChange}
              // value={user.address.address ? user.address.address : ""}
            />
          </Autocomplete>
        </LoadScript>
        <div className="w-[30%] max-sm:w-full">
          <CFormInput
            className="w-[30%]"
            // style={{ width: "100%" }}
            type="text"
            name="unit_number"
            placeholder="Enter Unit Number"
            value={user.address?.unit_number ? user.address.unit_number : ""}
            onChange={(e) =>
              setUser({
                ...user,
                address: { ...user.address, unit_number: e.target.value },
              })
            }
            // value={user.address.address ? user.address.address : ""}
          />
        </div>
      </div>

      <CCol className="flex gap-2 max-lg:flex-wrap">
        <div className="w-full">
          <CFormLabel className="font-20  w-full text-start">City</CFormLabel>
          <TextAuto
            disablePortal
            id="combo-box-demo"
            options={cities}
            value={user.address?.city ? user.address.city.label : ""}
            sx={{
              width: "100%",
              // display: "inline-block",
              "& input": {
                height: 5,
              },
            }}
            onChange={(e, val) =>
              setUser({ ...user, address: { ...user.address, city: val } })
            }
            renderInput={(params) => (
              <TextField {...params} placeholder="Select City" />
            )}
          />
        </div>
        <div className="w-full">
          <CFormLabel className="font-20  w-full text-start">
            Home or Work
          </CFormLabel>

          <TextAuto
            disablePortal
            id="combo-box-demo"
            options={["HOME", "WORK", "OTHER"]}
            sx={{
              width: "100%",
              // display: "inline-block",
              "& input": {
                height: 5,
              },
            }}
            onChange={(e, val) =>
              setUser({ ...user, address: { ...user.address, place: val } })
            }
            renderInput={(params) => (
              <TextField {...params} placeholder="Home or Work" />
            )}
          />
        </div>
      </CCol>
    </div>
  );
};

export default DeliveryAddress;
