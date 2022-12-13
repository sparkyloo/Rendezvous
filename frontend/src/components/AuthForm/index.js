import React from "react";
import ErrorDisplay from "../ErrorDisplay";
import "./AuthForm.css";

function AuthForm({
  title,
  subtitle,
  children,
  button,
  handleSubmit,
  errors,
  className = "",
}) {
  return (
    <div className={`authentication-page ${className}`}>
      <div className="call-to-action">
        <h1>{title}</h1>
        {subtitle}
      </div>
      <ErrorDisplay errors={errors} />
      <form className="authentication-form" onSubmit={handleSubmit}>
        {children}
        <button type="submit" className="form-button">
          {button}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
