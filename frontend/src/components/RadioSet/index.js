import React from "react";
import "./RadioSet.css";

export default function RadioSet({ label, value, setValue, options }) {
  return (
    <fieldset className="radio-set">
      <legend>{label}</legend>
      {options.map((option) => {
        if (typeof option === "string") {
          option = {
            label: option,
            value: option,
          };
        }

        const optionId = `${label}.${option.label}`;

        return (
          <div key={option.label} className="radio-set-option">
            <label htmlFor={optionId}>{option.label}</label>
            <input
              id={optionId}
              type="radio"
              checked={value === option.value}
              onChange={() => {
                setValue(option.value);
              }}
            />
          </div>
        );
      })}
    </fieldset>
  );
}
