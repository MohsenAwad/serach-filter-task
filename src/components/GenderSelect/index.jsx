import React from "react";
import Select from "react-select";

import "./GenderSelect.scss";

const GenderSelect = ({ value = "", handleOnChange = null }) => {
  return (
    <Select
      options={[
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ]}
      value={value}
      onChange={(option) => handleOnChange(option)}
      placeholder="Filter by gender"
      classNamePrefix="react-select"
      isClearable
    />
  );
};

export default GenderSelect;
