import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navbar shadowed">
      <NavLink exact to="/" className="logo">
        Meetup
      </NavLink>
      {isLoaded && (
        <div className="navbar-items">
          {sessionUser ? (
            <>
              <button onClick={() => history.push("/new-group")}>
                Create Group
              </button>
              <ProfileButton user={sessionUser} />
            </>
          ) : (
            <>
              <NavLink to="/login">Log In</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Navigation;
