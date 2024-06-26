<CCol
  md={12}
  className="card border-2x-graish p-16 bg-light br-4 rounded-4 mb-16x rounded-xl"
  key={item.id}
>
  {/* Top container */}
  <div className="flex justify-between my-10x">
    <div className="">
      <h5 className="font-semibold">
        {vendor && vendor[0].vendor_name}
        <span className="font-14">- ({item.VendorPackage.package_name})</span>
      </h5>

      {/* <i className="text-danger">{`${
                                  item.VendorPackage.delivery && "Delivery"
                                }`}</i> */}
      {item.pickup_delivery === 1 ? (
        <h6> Pickup from vendor</h6>
      ) : (
        <h6>
          Deliver to &nbsp;
          <span className="text-gray">
            {item.CustomerDeliveryAddress?.address}, &nbsp;
            {item.CustomerDeliveryAddress?.CitiesAll.city}, &nbsp;
            {item.CustomerDeliveryAddress?.CitiesAll.state}, &nbsp;
            {item.CustomerDeliveryAddress?.postal}.
          </span>
        </h6>
      )}

      <p className="m-0 mb-4 font-semibold">Package Includes:</p>
    </div>
    <div className="flex flex-col items-right">
      <div className="flex gap-10x">
        <p className="font-medium">
          Delivery time: {getTime(item.start_date)} - {getTime(item.end_date)}
        </p>
        {item.VendorPackage.pause === 1 && (
          <CButton className="bg-red px-10x border-none outline-none font-medium block">
            Pause Package
          </CButton>
        )}
      </div>
      {item.pickup_delivery === 2 && item.CustomerDeliveryAddress && (
        <p className="text-gray text-right">
          <span className="text-black font-medium">Delivery Address:</span>
          <br />
          {item.CustomerDeliveryAddress.address},
          {item.CustomerDeliveryAddress.CitiesAll &&
            item.CustomerDeliveryAddress.CitiesAll.city}
          ,
          {item.CustomerDeliveryAddress.CitiesAll &&
            item.CustomerDeliveryAddress.CitiesAll.state}
          ,{item.CustomerDeliveryAddress.postal}
          <button
            className="text-blue border-none outline-none"
            onClick={() =>
              setAddress({
                package_id: item.id,
                current_address_id: item.customer_delivery_address_id,
              })
            }
          >
            Change
          </button>
        </p>
      )}
      {address.package_id === item.id && (
        <div className="w-100 flex gap-5x ">
          <CFormSelect
            className="simple-input"
            type="text"
            name="city_id"
            value={address.current_address_id}
            // required
            onChange={(e) =>
              setAddress({
                ...address,
                current_address_id: parseInt(e.target.value),
              })
            }
          >
            <option value="0">Select</option>
            {customerAddresses &&
              customerAddresses.map((address) => (
                <option key={address.id} value={address.id}>
                  {address.address},
                  {address.CitiesAll && address.CitiesAll.city},
                  {address.CitiesAll && address.CitiesAll.state},
                  {address.postal}
                </option>
              ))}
          </CFormSelect>
          <button
            className="text-blue border-none outline-none"
            onClick={handleAddressUpdate}
          >
            Update
          </button>

          <button
            className=" border-none outline-none"
            onClick={() =>
              setAddress({
                package_id: "",
                current_address_id: "",
              })
            }
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  </div>
  <CRow>
    <CCol>
      <CRow>
        {PackagesItemJSX(item).map((item, i) => (
          <CCol key={i} className="col-md-4 mb-4">
            <CCard className="p-2 shadow">
              <h6 className="mt-2 mb-4 font-samibold">{item.date}</h6>

              <CListGroup>
                {item.defaultItem.map((listItem) => (
                  <CListGroupItem key={listItem.id}>
                    <label className="d-block">
                      {listItem?.itemRelated?.length > 0 && (
                        <input
                          type="radio"
                          name={listItem.id}
                          value={JSON.stringify(listItem.id)}
                        />
                      )}
                      {listItem.item_name}
                    </label>
                    {listItem?.itemRelated?.length > 0 && (
                      <label className="d-block">
                        {listItem?.itemRelated?.map((menu) => (
                          <span key={menu?.id}>
                            {" "}
                            <br />{" "}
                            <span
                              style={{
                                color: "red",
                              }}
                            >
                              {" "}
                              or
                            </span>
                            <br />
                            <input
                              type="radio"
                              name={listItem.id}
                              value={menu?.id}
                            />
                            {menu?.menu_item_name}
                          </span>
                        ))}
                      </label>
                    )}
                  </CListGroupItem>
                ))}
              </CListGroup>
            </CCard>
          </CCol>
        ))}
      </CRow>
      {/* {item.VendorPackage.VendorPackageDefaultItems.map(
                                    (ditem, index) => (
                                      <a key={ditem.id}>
                                        {ditem.item_name}{
                                          index + 1 <
                                          item.VendorPackage
                                            .VendorPackageDefaultItems.length
                                            ? ","
                                            : ""
                                        }&nbsp;
                                      </a>
                                    )
                                  )} */}
    </CCol>
  </CRow>
</CCol>;
