import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
  createContext,
} from "react";
// import CVCInput from "./CVCInput";
// import DateInput from "./DateInput";
// import CreditCard from "../interfaces/card.interface";
// import { CardContextInterface } from "../interfaces/helper.interfaces";
// import { Props } from "../types/helper.types";
import CardNumberInput from "./CardInput";
import DateInput from "./DateInput";
import CVCInput from "./CVVInput";

export const CreditCardDataContext = createContext;

export const CardProvider = ({ children }) => {
  const [cardData, setCardData] = useState();

  return (
    <CreditCardDataContext.Provider value={{ cardData, setCardData }}>
      {children}
    </CreditCardDataContext.Provider>
  );
};

const CreditCardInput = () => {
  const [focusIndex, setFocusIndex] = useState([]);
  const [cardData, setCardData] = useState();

  const leaveField = (index) => {
    const indexArray = new Array() < boolean > (3).fill(false);
    indexArray[index] = true;
    setFocusIndex(indexArray);
  };

  const setFocusOnFirst = useCallback(() => {
    leaveField(0);
  }, []);

  useEffect(() => {
    leaveField(0);
  }, []);

  useEffect(() => {
    window.addEventListener("focus", setFocusOnFirst);
    return () => {
      window.removeEventListener("focus", setFocusOnFirst);
    };
  }, [setFocusOnFirst]);

  return (
    <CreditCardDataContext.Provider value={{ cardData, setCardData }}>
      <Fragment>
        <CardNumberInput
          leaveFieldCallback={leaveField}
          focus={focusIndex[0]}
          tabIndex={0}
        />
        <DateInput
          leaveFieldCallback={leaveField}
          focus={focusIndex[1]}
          tabIndex={1}
        />
        <CVCInput focus={focusIndex[2]} tabIndex={2} />
      </Fragment>
    </CreditCardDataContext.Provider>
  );
};

export default CreditCardInput;
