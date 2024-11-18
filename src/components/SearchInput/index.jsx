import React from "react";

import "./SearchInput.scss";

const SearchInput = ({ value = "", handleOnChange = null }) => {
  return (
    <input
      value={value}
      type="text"
      autoComplete="off"
      name="searchValue"
      placeholder="Search by name..."
      className="search-input"
      onInput={(e) => handleOnChange(e?.target?.value)}
    />
  );
};

export default SearchInput;
