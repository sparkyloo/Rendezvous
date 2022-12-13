import React from "react";
import "./FormField.css";

export default function FormField({
  id,
  type = "text",
  label,
  value,
  setValue,
  ...rest
}) {
  const inputProps = {
    label,
    value,
    required: true,
    onChange: (e) => setValue(e.target.value),
    ...rest,
  };

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {type === "textarea" ? (
        <textarea {...inputProps} />
      ) : (
        <input type={type} {...inputProps} />
      )}
    </div>
  );
}
