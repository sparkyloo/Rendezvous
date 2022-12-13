import "./SpecialButton.css";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function SpecialButton({
  label,
  requireSession,
  requiredMembershipId,
  onClick,
  ...rest
}) {
  const { sessionUser } = useSelector(
    ({ session: { user }, groups: { myGroups } }) => {
      return {
        sessionUser: user,
        myMemberships: myGroups.map(({ id }) => id),
      };
    }
  );

  const history = useHistory();

  label = sessionUser ? label : `Login to ${label.toLowerCase()}`;

  const clickHandler = useCallback(
    (...args) => {
      if (!sessionUser) {
        history.push("/login");
      } else if (typeof onClick === "function") {
        onClick(...args);
      }
    },
    [sessionUser, onClick]
  );

  return (
    <button onClick={clickHandler} {...rest}>
      {label}
    </button>
  );
}
