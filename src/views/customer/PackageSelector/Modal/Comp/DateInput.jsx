import React, { useState, useRef, useEffect, useContext } from "react";
import InputMask from "react-input-mask";
import {
  expirationDate,
  expirationMonth,
  expirationYear,
} from "card-validator";

import { CreditCardDataContext } from "./CreditCardInput";
import { TextField } from "@mui/material";
import { absLenght } from "./Converters";

const DateInput = ({ leaveFieldCallback, focus, tabIndex, setFormData }) => {
  const [error, setError] = useState(false);
  const [info, setInfo] = useState("");
  const inputRef = useRef(null);

  const CardContext = useContext(CreditCardDataContext);

  const handleChange = (event) => {
    const value = event?.target?.value;
    const month = value.split("/")[0];
    const year = value.split("/")[1];
    const yearFull = `20${year}`; // Convert '24' to '2024'
    const date = new Date(yearFull, month - 1, 1);
    setFormData((pre) => ({
      ...pre,
      expiry_month: month,
      expiry_year: yearFull,
    }));
    const epirationDate = expirationDate(value);
    const epirationMonth = expirationMonth(value);
    const epirationYear = expirationYear(value);
    const DateLength = absLenght(value);

    if (DateLength > 0 && !epirationMonth.isPotentiallyValid) {
      setInfo("Wrong month data");
      setError(true);
    } else if (DateLength > 0 && !epirationYear.isPotentiallyValid) {
      setInfo("Wrong year data");
      setError(true);
    } else if (DateLength > 0 && !epirationDate.isValid) {
      setInfo("Wrong data");
      setError(true);
    } else {
      setInfo("");
      setError(false);
    }
    if (epirationDate.isValid) {
      if (leaveFieldCallback) {
        leaveFieldCallback(tabIndex + 1);
      }
    }
  };

  const handleBlur = (event) => {
    const value = event?.target?.value;
    const epirationDate = expirationDate(value);
    if (epirationDate.isValid) {
      setError(false);
      setInfo("");
      CardContext?.setCardData({
        ...CardContext.cardData,
        date: {
          month: epirationDate.month,
          year: epirationDate.year,
        },
      });
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (focus) {
      inputRef.current.focus();
    }
  }, [focus]);

  return (
    <InputMask
      mask="99/99"
      maskChar=" "
      onChange={handleChange}
      onBlur={handleBlur}
      tabIndex={tabIndex}
    >
      {() => (
        <TextField
          name="expire"
          label="MM/YY"
          type="text"
          style={{
            width: "100%",
          }}
          error={error}
          helperText={info}
          autoFocus={focus}
          required
          inputRef={inputRef}
        />
      )}
    </InputMask>
  );
};

export default DateInput;
