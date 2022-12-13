import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
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
  const dispatch = useDispatch();

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
        <button
          type="button"
          onClick={() => {
            dispatch(
              login({
                credential: "demo@user.io",
                password: "password",
              })
            );
          }}
        >
          Demo User Login
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
