import React, { useEffect, useState } from "react";
import Select from "react-select";

const SelectComponent = ({ onChangeHandler, options, defaultValue, val }) => {
  const [value, setValue] = useState(defaultValue);
  const [inputOptions, setOptions] = useState(options);
  useEffect(() => {
    setValue(val);
    setOptions(options);
  }, [val]);
  useEffect(() => {}, [options]);
  return (
    <Select
      name="default_item"
      className="simple-input"
      options={inputOptions}
      isSearchable
      defaultValue={defaultValue}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
      onChange={onChangeHandler}
      controlShouldRenderValue
      value={value}
    />
  );
};

export { SelectComponent };
