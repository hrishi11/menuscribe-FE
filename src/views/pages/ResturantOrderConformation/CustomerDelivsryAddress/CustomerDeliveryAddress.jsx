import { CRow, CButton, CFormSelect } from "@coreui/react";
import { Link } from "react-router-dom";

const CustomerDeliveryAddress = ({
  alreadyHaveAnAccount,
  loggedIn,
  setAlreadyHaveAnAccount,
  handleAddressEdit,
  handleAddress,
}) => {
  const { addressId, CustomerDeliveryAddress } = alreadyHaveAnAccount;
  const address = CustomerDeliveryAddress.find(
    (addres) => addres.id === addressId
  );

  return (
    <div className="box px-2 py-2 text-center mb-16x">
      <h5 className="text-blue"> DELIVERY ADDRESS </h5>
      <p>Please select a delivery address</p>
      <CFormSelect
        className="simple-input"
        type="text"
        name="city_id"
        value={addressId}
        onChange={(e) => {
          setAlreadyHaveAnAccount({
            ...alreadyHaveAnAccount,
            addressId: parseInt(e.target.value),
          });
          if (e.target.value === "add-new-address") {
            handleAddress(0);
          }
        }}
      >
        <option value="0">Select</option>
        {CustomerDeliveryAddress &&
          CustomerDeliveryAddress.map((address) => (
            <option key={address.id} value={address.id}>
              {address.address},{address.CitiesAll && address.CitiesAll.city},
              {address.CitiesAll && address.CitiesAll.state},{address.postal}
            </option>
          ))}
        {loggedIn.status && (
          <option value="add-new-address" className="text-blue">
            Add new delivery address...
          </option>
        )}
      </CFormSelect>
      {!isNaN(addressId) && addressId !== 0 && (
        <button
          onClick={() => handleAddressEdit(address)}
          className="font-medium text-decoration-none text-blue"
        >
          Edit my delivery address
        </button>
      )}
    </div>
  );
};

export default CustomerDeliveryAddress;
