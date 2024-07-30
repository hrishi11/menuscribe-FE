import React, { useState, useRef, useEffect, useContext } from "react";
import InputMask from "react-input-mask";
import { cvv } from "card-validator";
import { absLenght } from "./Converters";
import { CreditCardDataContext } from "./CreditCardInput";
import { TextField } from "@mui/material";

//TODO: chnange to props
const CVCInput = ({ leaveFieldCallback, focus, tabIndex, setFormData }) => {
  const [error, setError] = useState(false);
  const [info, setInfo] = useState("");

  const CardContext = useContext(CreditCardDataContext);
  const inputRef = useRef(null);
  const CVCLengthRequired = CardContext?.cardData?.cvclenght;

  const handleChange = (event) => {
    const CVCLength = absLenght(inputRef?.current.value);
    const CVCverify = cvv(event?.target?.value);
    setFormData((pre) => ({ ...pre, cvv: event.target.value }));

    if (CVCLength > 0 && CVCLength !== CVCLengthRequired) {
      setError(true);
      setInfo("Incorect CVC length");
    } else if (CVCLength > 0 && !CVCverify.isPotentiallyValid) {
      setError(true);
      setInfo("There is an error with this CVV number");
    } else if (CVCverify.isValid) {
      setError(false);
      setInfo("");
      if (leaveFieldCallback) {
        leaveFieldCallback(tabIndex + 1);
      }
    }
  };

  const handleBlur = (event) => {
    const CVCvalue = event?.target?.value;
    const CVCLength = absLenght(CVCvalue);
    const value = cvv(CVCvalue);
    if (CVCLength > 0 && value.isValid) {
      setError(false);
      setInfo("");
      CardContext?.setCardData({
        ...CardContext.cardData,
        cvc: CVCvalue,
      });
    } else {
      //TODO: could rmove - its redundand
      setError(true);
      setInfo("CVV code is not valid");
    }
  };

  useEffect(() => {
    if (focus) {
      inputRef.current.focus();
    }
  }, [focus]);
  //TODO: props cvc count i mask na to ustawić
  return (
    <InputMask
      mask="999"
      maskChar=" "
      onChange={handleChange}
      onBlur={handleBlur}
    >
      {() => (
        <TextField
          name="cvv"
          label="CVV"
          type="text"
          error={error}
          style={{
            width: "100%",
          }}
          placeholder="XXX"
          tabIndex={tabIndex}
          required
          helperText={info}
          autoFocus={focus}
          inputRef={inputRef}
        />
      )}
    </InputMask>
  );
};

export default CVCInput;
