import React from "react";
import "./NewFrequency.css";
import { CFormSelect } from "@coreui/react";
import { convertToAmPm } from "../../../../../../utils/Helper";

const NewFrequency = ({
  product,
  removePackage,
  handleTimeSlotChange,
  handlePickupCheck,
  handleDeliveryCheck,
  handleFrequencyChange,
}) => {
  return (
    <div className="frequency-container">
      {/* ---Image Container-------- */}
      <div className="frequency-image-container">
        <img
          src={
            product.image
              ? product.image
              : "https://www.dirtyapronrecipes.com/wp-content/uploads/2015/10/food-placeholder.png"
          }
          alt=""
        />
      </div>
      {/* ------Items container ----------------*/}
      <div className="frequency-items-container">
        <div>
          <h6 className="font-bold">What's included</h6>
          <ul>
            {product.VendorPackageDefaultItems.map((it) => (
              <li key={it.key}>- {it.item_name}</li>
            ))}
          </ul>
        </div>
      </div>
      <hr />
      {/* -------Options container------------- */}
      <div className="frequency-options-container">
        {/* ------Delivery Pickup------- */}
        <div>
          <h6 className="font-bold">Select Delivery or Pickup</h6>
          <div className="frequency-delivery-pickup">
            {product.delivery === 1 && (
              <a
                className={`delivery cursor-pointer ${
                  product.pickup_delivery === 2 && "active"
                }`}
                onClick={() => handleDeliveryCheck(product.temp_id)}
              >
                DELIVERY
              </a>
            )}
            {product.pickup === 1 && (
              <a
                className={`pickup cursor-pointer ${
                  product.pickup_delivery === 1 && "active"
                } `}
                onClick={() => handlePickupCheck(product.temp_id)}
              >
                PICKUP
              </a>
            )}
          </div>
        </div>
        {/* ------------Locations------------ */}

        <div>
          {/* <CFormSelect aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3" disabled>
              Three
            </option>
          </CFormSelect> */}
          {product.pickup_delivery === 1 && (
            <div className="text-center">
              <span className="text-blue font-medium">Pickup Location</span>
              <br />
              <span className="">Order should be picked up from:</span>
              <br />
              <span className="text-gray">
                {/* 350 Bay Street, Toronto, Ontario M3M 2K4 */}
                {product.VendorLocation
                  ? `${product.VendorLocation?.address}, ${product.VendorLocation?.CitiesAll?.city}, ${product.VendorLocation?.CitiesAll?.state}`
                  : "N/A"}
              </span>
            </div>
          )}

          {/* {product.pickup_delivery === 2 && (
            // <div>
            //   <CFormSelect
            //     className=""
            //     name="delivery_address"
            //     required
            //     // value={product.customer_delivery_address.id}
            //     // onChange={(e) =>
            //     //   handleCustomerDeliveryAddressChange(e, product.temp_id)
            //     // }
            //   >
            //     <option value="">Select Delivery Address</option>
            //     <option value="">Location 1</option>
            //     <option value="">Location 2</option>
            //     {/* {customerDeliveryAddress.map((add) => (
            //       <option key={add.id} value={add.id}>
            //         {add.address}
            //       </option>
            //     ))} 
            //   </CFormSelect>
            // </div>
           )} */}
        </div>
        {/* -------------Select A Frequency------- */}
        {product.pickup_delivery !== 0 && (
          <div>
            <h6 className="font-bold">Select a frequency</h6>
            <div className="selectFrequencyContainer">
              {product.pickup_delivery === 1
                ? product.VendorPackagePrices?.map((price) => {
                    return (
                      price.method === "pickup" && (
                        <a
                          onClick={() =>
                            handleFrequencyChange(price.id, product.temp_id)
                          }
                          key={price.id}
                          className={`selectFrequencyOption ${
                            price.id === product.frequency.id && "active"
                          }`}
                        >
                          {price.frequency}
                        </a>
                      )
                    );
                  })
                : product.VendorPackagePrices?.map((price) => {
                    return (
                      price.method === "delivery" && (
                        <a
                          onClick={() =>
                            handleFrequencyChange(price.id, product.temp_id)
                          }
                          key={price.id}
                          className={`selectFrequencyOption ${
                            price.id === product.frequency.id && "active"
                          }`}
                        >
                          {price.frequency}
                        </a>
                      )
                    );
                  })}

              {}
            </div>
          </div>
        )}
        {/* ------------Time Slot--------- */}
        {product.frequency.cost && (
          <div className="time-slots ">
            {product.VendorPackageSlots.map((slot) => {
              return slot.pickup_delivery == product.pickup_delivery ? (
                // return slot.pickup_delivery == 2 ? (
                <span
                  key={slot.id}
                  className={`timeSlot ${
                    product?.delivery_time_slot?.id === slot.id && "active"
                  } cursor-pointer`}
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
        )}
        {product.frequency.cost && (
          <h6 className="font-semibold text-center m-0">
            ${product.frequency.cost}/{product.frequency.frequency}
          </h6>
        )}
        <p
          className="cursor-pointer text-info m-0"
          onClick={() => removePackage(product.temp_id)}
        >
          Remove
        </p>
        {/* <h6 className="font-semibold text-center"> $10/day</h6> */}
      </div>
    </div>
  );
};

export default NewFrequency;
