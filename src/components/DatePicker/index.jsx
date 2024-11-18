import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./DatePickerFilter.scss";

const DatePickerFilter = ({
  startDate = null,
  endDate = null,
  handleOnChange = null,
}) => {
  return (
      <DatePicker
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        onChange={(dates) => handleOnChange(dates)}
        placeholderText="Filter by year of birth"
        isClearable
        dateFormat="yyyy"
        showYearPicker
        selectsRange
      />
  );
};

export default DatePickerFilter;
