import React, {
  Fragment,
  useRef,
  useEffect,
  useState,
  useContext,
} from "react";
// import { TextField } from "@material-ui/core";
// @ts-ignore
import PaymentIcon from "react-payment-icons";
import InputMask from "react-input-mask";
// import CardIcon from "@material-ui/icons/Payment";

import { number } from "card-validator";
import { CardNumberVerification } from "card-validator/dist/card-number";
import { CreditCardDataContext } from "./CreditCardInput";
import { InputAdornment, TextField } from "@mui/material";
import { FaCreditCard } from "react-icons/fa";
import { absLenght } from "./Converters";

//TODO: still not proper valid at last char if number is not valid

const CardNumberInput = ({
  leaveFieldCallback,
  focus,
  tabIndex,
  setFormData,
  formData,
}) => {
  const [cardType, setCardType] = useState("");
  const [error, setError] = useState(false);
  const [info, setInfo] = useState("");
  const inputRef = useRef(null);

  const CardContext = useContext(CreditCardDataContext);

  const handleChange = (event) => {
    const cardNumberValue = event?.target?.value;
    const cardNumberValidator = number(cardNumberValue);
    setFormData({
      ...formData,
      cardNumber: cardNumberValue.replace(/\s+/g, ""),
    });
    setCardType(cardNumberValidator?.card?.type || "");
    if (cardNumberValidator?.card?.type) {
      setFormData((pre) => ({
        ...pre,
        card_type: cardNumberValidator?.card?.type,
      }));
    }
    console.log(cardNumberValidator?.card?.type);
    if (
      absLenght(cardNumberValue) > 0 &&
      !cardNumberValidator.isPotentiallyValid
    ) {
      setError(true);
      setInfo("Credit card number may be incorrect");
      //TODO: is not good
      // } else if (/([0-9]{4,})/.test(cardNumberValue) && !cardNumberValidator.isValid) {
      //   setError(true);
      //   setInfo("Incorrect credit card number");
    } else if (!/([0-9]+)/.test(cardNumberValue)) {
      setError(false);
      setInfo("");
    } else if (cardNumberValidator.isValid) {
      setError(false);
      setInfo("");
      if (leaveFieldCallback) {
        leaveFieldCallback(tabIndex + 1);
      }
    }
  };

  const handleBlur = (event) => {
    const cardNumberValue = event?.target?.value;
    const cardNumberValidator = number(cardNumberValue);
    if (cardNumberValidator.isValid) {
      setError(false);
      setInfo("");
      CardContext?.setCardData({
        ...CardContext.cardData,
        cardNumber: event?.target?.value || "",
        cvclenght: cardNumberValidator?.card?.code.size || 3,
      });
    } else {
      setError(true);
      setInfo("Incorrect format");
      if (leaveFieldCallback) {
        leaveFieldCallback(tabIndex);
      }
    }
  };

  useEffect(() => {
    if (focus) {
      inputRef.current.focus();
    }
  }, [focus]);

  return (
    <Fragment>
      <InputMask
        mask="9999 9999 9999 9999"
        maskChar=" "
        onChange={handleChange}
        onBlur={handleBlur}
      >
        {() => (
          <TextField
            error={error}
            id="standard-error-helper-text"
            label="Card Number"
            className="w-full"
            tabIndex={tabIndex}
            autoFocus={focus}
            helperText={info}
            inputRef={inputRef}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {cardType === "" && <FaCreditCard />}
                  {cardType !== "" && (
                    <PaymentIcon
                      id={cardType}
                      style={{ margin: 10, width: 24 }}
                      className="payment-icon"
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />
        )}
      </InputMask>
    </Fragment>
  );
};

export default CardNumberInput;
