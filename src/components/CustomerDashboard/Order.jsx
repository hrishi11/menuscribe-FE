import {
  CButton,
  CCard,
  CCol,
  CNav,
  CFormSelect,
  CListGroup,
  CListGroupItem,
  CRow,
  CTabContent,
  CTabPane,
  CFormCheck,
} from "@coreui/react";
import OrderItem from "./OrderItem";

const Order = ({ order }) => {
  const { order_date, items } = order;
  const getOrderTitle = (dateString) => {
    const date = new Date(dateString + "T00:00:00");
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = days[date.getDay()];
    const dateOfMonth = String(date.getDate()).padStart(2, "0");
    const month = months[date.getMonth()];

    return (
      <>
        {day} <br />
        {dateOfMonth}-{month}
      </>
    );
  };

  return (
    <CCol className="">
      <CCard className="p-2 shadow">
        <h6 className="my-1 font-samibold text-center">
          {getOrderTitle(order_date)}
        </h6>

        <CListGroup>
          {items.map((item) => (
            // <p> {orderItem.VendorMenuItem.item_name} </p>
            <OrderItem key={item.id} item={item} order={order} />
          ))}
        </CListGroup>
      </CCard>
    </CCol>
  );
};

export default Order;
