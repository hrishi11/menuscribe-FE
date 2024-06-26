import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CRow,
} from "@coreui/react";
import DatePicker from "react-datepicker";
import "./Frequency.css";
import "react-datepicker/dist/react-datepicker.css";
import { convertToAmPm, getTimeSlot } from "../../utils/Helper";

const Frequency = ({
  product,
  setDate,
  customerDeliveryAddress,
  removePackage,
  handlePickupCheck,
  handleDeliveryCheck,
  handleFrequencyChange,
  handleTimeSlotChange,
  handleFrequencyInputChange,
  handleCustomerDeliveryAddressChange,
}) => {
  return (
    <div className="mb-3 d-flex justify-content-center frequencyContainer box px-2 py-2">
      <div className="">
        <div className="d-flex justify-content-between">
          <p>{product.package_name}</p>
          <p
            className="cursor-pointer text-info"
            onClick={() => removePackage(product.temp_id)}
          >
            Remove
          </p>
        </div>
        {/* Pickup & delivery Btns */}
        <div>
          <div className="flex justify-between">
            {product.pickup === 1 && (
              <div>
                <CFormCheck
                  type="radio"
                  name={`pickup_delivery_${product.temp_id}`}
                  id="pickup_delivery"
                  label="Pickup"
                  required
                  inline
                  checked={product.pickup_delivery === 1}
                  onChange={() => handlePickupCheck(product.temp_id)}
                />
              </div>
            )}
            {product.delivery === 1 && (
              <div>
                <CFormCheck
                  type="radio"
                  name={`pickup_delivery_${product.temp_id}`}
                  id="pickup_delivery"
                  label="Delivery"
                  required
                  inline
                  checked={product.pickup_delivery == 2}
                  onChange={() => handleDeliveryCheck(product.temp_id)}
                />
              </div>
            )}
          </div>
        </div>
        {/* ---------Delivery address and Time-------------- */}
        {product.pickup_delivery === 2 && (
          <div>
            {customerDeliveryAddress && (
              <CFormSelect
                className=""
                name="delivery_address"
                required
                value={product.customer_delivery_address.id}
                onChange={(e) =>
                  handleCustomerDeliveryAddressChange(e, product.temp_id)
                }
              >
                <option value="">Select Delivery Address</option>
                {customerDeliveryAddress.map((add) => (
                  <option key={add.id} value={add.id}>
                    {add.address}
                  </option>
                ))}
              </CFormSelect>
            )}

            <span className="font-16 ">SELECT A TIME SLOT:</span>
            <div className="time-slots my-10x">
              {product.VendorPackageSlots.map((slot) => {
                return slot.pickup_delivery == product.pickup_delivery ? (
                  <span
                    key={slot.id}
                    className={`timeSlot ${
                      product?.delivery_time_slot?.id === slot.id && "active"
                    } d-block cursor-pointer`}
                    onClick={() =>
                      handleTimeSlotChange(slot, product.temp_id, "delivery")
                    }
                  >
                    {convertToAmPm(slot.start_time)}-
                    {convertToAmPm(slot.end_time)}
                  </span>
                ) : (
                  ""
                );
              })}
            </div>
          </div>
        )}

        {/* ---------Pickup location and time */}
        {product.pickup_delivery === 1 && (
          <div className="text-left">
            <span className="text-blue font-medium">Pickup Location</span>
            <br />
            <span className="">Order should be picked up from:</span>
            <br />
            <span className="text-gray">
              350 Bay Street, Toronto, Ontario M3M 2K4
              {product.VendorLocation
                ? `${product.VendorLocation?.address}, ${product.VendorLocation?.CitiesAll?.city}, ${product.VendorLocation?.CitiesAll?.state}`
                : "N/A"}
            </span>
            <br />
            <br />
            <span className="font-16 ">SELECT A TIME SLOT:</span>
            <div className="time-slots my-10x">
              {product.VendorPackageSlots.map((slot) => {
                return slot.pickup_delivery === product.pickup_delivery ? (
                  <span
                    key={slot.id}
                    className={`timeSlot ${
                      product?.pickup_time_slot?.id === slot.id && "active"
                    } d-block cursor-pointer`}
                    onClick={() =>
                      handleTimeSlotChange(slot, product.temp_id, "pickup")
                    }
                  >
                    {convertToAmPm(slot.start_time)}-
                    {convertToAmPm(slot.end_time)}
                  </span>
                ) : (
                  ""
                );
              })}
            </div>
          </div>
        )}

        {/* ------------Freequency ------------- */}
        <CFormSelect
          className="mt-2"
          name="frequency"
          value={product.frequency.id}
          required
          onChange={(e) => handleFrequencyChange(e, product.temp_id)}
        >
          <option value="">Select Frequency</option>
          {product.VendorPackagePrices.map((op) => (
            <option key={op.id} value={op.id}>
              {op.frequency} - {op.method}
            </option>
          ))}
        </CFormSelect>
        {/* --------------------Frequency Name---------- */}
        <CFormInput
          className="mt-2"
          name="user_package_name"
          value={product.user_package_name}
          required
          placeholder="Package Name"
          onChange={(e) => handleFrequencyInputChange(e, product.temp_id)}
        />
        <CRow>
          {/* -----------------Date Picker------- */}
          <CCol>
            <DatePicker
              selected={new Date(product.start_date + "T00:00:00")}
              onChange={(date) => setDate(`start_date`, date, product.temp_id)}
              dateFormat="yyyy-MM-dd"
              className="form-control w-100 mt-2"
            />
          </CCol>
        </CRow>
        {product.frequency.cost && (
          <p className="text-danger text-center">
            ${product.frequency.cost}&nbsp;
            {product.frequency.frequency}
          </p>
        )}
      </div>
    </div>
  );
};

export default Frequency;
