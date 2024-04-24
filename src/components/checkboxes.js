import React from "react";

const checkboxes = ({ title, onChange, state }) => {
  return (
    <div>
      <input type="checkbox" onChange={onChange} checked={state} />
      <label>{title}</label>
    </div>
  );
};

export default checkboxes;
