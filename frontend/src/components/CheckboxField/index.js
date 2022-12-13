import React from "react";
import "./CheckboxField.css";

export default function CheckboxField({ id, label, checked, setChecked }) {
  return (
    <div className="checkbox-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={() => {
          setChecked(!checked);
        }}
      />
    </div>
  );
}
