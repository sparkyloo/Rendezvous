import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "./LoginForm.css";
import AuthForm from "../AuthForm";
import FormField from "../FormField";
import { useErrorHandling } from "../../error-handling";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { gatherErrors, clearErrors, errors } = useErrorHandling();

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    clearErrors();

    const thunkResult = dispatch(login({ credential: email, password }));

    thunkResult.catch(gatherErrors);
  };

  return (
    <AuthForm
      title="Log in"
      button="Log in"
      errors={errors}
      handleSubmit={handleSubmit}
      className="login-form-page"
      subtitle={
        <div>
          Not a member yet? <Link to="/signup">Sign up</Link>
        </div>
      }
    >
      <FormField
        id="email"
        type="email"
        label="Email"
        value={email}
        setValue={setEmail}
      />
      <FormField
        id="password"
        type="password"
        label="Password"
        value={password}
        setValue={setPassword}
      />
    </AuthForm>
  );
}

export default LoginFormPage;
