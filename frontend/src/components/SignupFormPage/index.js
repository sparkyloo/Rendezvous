import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { useErrorHandling } from "../../error-handling";
import { signup, restoreUser } from "../../store/session";
import AuthForm from "../AuthForm";
import FormField from "../FormField";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { gatherErrors, clearErrors, setErrors, errors } = useErrorHandling();

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      clearErrors();

      return dispatch(
        signup({
          email,
          username,
          password,
          firstName,
          lastName,
        })
      )
        .then(() => restoreUser())
        .catch(gatherErrors);
    }

    return setErrors({
      message: "Confirm Password field must be the same as the Password field",
      reasons: [],
    });
  };

  return (
    <AuthForm
      title="Sign up"
      button="Sign up"
      errors={errors}
      handleSubmit={handleSubmit}
      className="signup-form-page"
      subtitle={
        <div>
          Already a member? <Link to="/login">Log in</Link>
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
        id="username"
        label="Username"
        value={username}
        setValue={setUsername}
      />
      <FormField
        id="password"
        type="password"
        label="Password"
        value={password}
        setValue={setPassword}
      />
      <FormField
        id="confirm"
        type="password"
        label="Config Password"
        value={confirmPassword}
        setValue={setConfirmPassword}
      />
      <FormField
        id="firstName"
        label="First Name"
        value={firstName}
        setValue={setFirstName}
      />
      <FormField
        id="lastName"
        label="Last Name"
        value={lastName}
        setValue={setLastName}
      />
    </AuthForm>
  );
}

export default SignupFormPage;
