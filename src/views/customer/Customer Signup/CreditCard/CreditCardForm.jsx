import { Button } from "@nextui-org/react";
import React from "react";

const CreditCardForm = ({
  creditCard,
  setCreditCard,
  submitCustomerPackages,
}) => {
  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Credit Card Details</h2>
        {/* <form
          onSubmit={(e) => {
            e.preventDefault();
            submitCustomerPackages(e);
          }}
        > */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            id="firstName"
            value={creditCard.first_name}
            onChange={(e) =>
              setCreditCard((prev) => ({
                ...prev,
                first_name: e.target.value,
              }))
            }
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="First Name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            id="lastName"
            value={creditCard.last_name}
            onChange={(e) =>
              setCreditCard((prev) => ({
                ...prev,
                last_name: e.target.value,
              }))
            }
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Last Name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="cardNumber"
          >
            Card Number
          </label>
          <input
            id="cardNumber"
            value={creditCard.card_number}
            onChange={(e) =>
              setCreditCard((prev) => ({
                ...prev,
                card_number: e.target.value,
              }))
            }
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Card Number"
          />
        </div>
        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="expiryDate"
            >
              Expiry Date
            </label>
            <input
              id="expiryDate"
              value={creditCard.expiry_date}
              onChange={(e) =>
                setCreditCard((prev) => ({
                  ...prev,
                  expiry_date: e.target.value,
                }))
              }
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="MM/YY"
            />
          </div>
          <div className="w-1/2 pl-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="cvv"
            >
              CVV
            </label>
            <input
              id="cvv"
              value={creditCard.cvv}
              onChange={(e) =>
                setCreditCard((prev) => ({ ...prev, cvv: e.target.value }))
              }
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="CVV"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-between">
          <Button
            // type="submit"
            color="primary"
            variant="solid"
            onClick={submitCustomerPackages}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Start Subscription
          </Button>
          <p className="text-center font-semibold">
            By clicking Start Subscription, I understand that my credit card
            will be billed on a monthly basis.
          </p>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default CreditCardForm;
