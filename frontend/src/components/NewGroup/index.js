import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./NewGroup.css";
import { createNewGroup } from "../../store/groups/thunks";

function NewGroupPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [groupType, setGroupType] = useState("Online");
  const [isPrivate, setIsPrivate] = useState(false);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  if (!sessionUser) return <Redirect to="/" />;

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setErrors([]);
  //   return dispatch(sessionActions.login({ name, about }))
  //   .catch(
  //     async (res) => {
  //       const data = await res.json();
  //       if (data && data.errors) setErrors(data.errors);
  //     }
  //   );
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newGroupId = await dispatch(
      createNewGroup({
        name,
        about,
        type: groupType,
        isPrivate,
        city,
        state,
      })
    );

    history.push(`/group/${newGroupId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        About
        <input
          type="text"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          required
        />
      </label>
      <fieldset>
        <legend>Group Type</legend>
        <label>
          Online
          <input
            type="radio"
            checked={groupType === "Online"}
            onChange={() => {
              setGroupType("Online");
            }}
          />
        </label>
        <label>
          In person
          <input
            type="radio"
            checked={groupType === "In person"}
            onChange={() => {
              setGroupType("In person");
            }}
          />
        </label>
      </fieldset>
      <label>
        Private
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={() => {
            setIsPrivate(!isPrivate);
          }}
        />
      </label>
      <label>
        City
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label>
        State
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
      <button type="submit">Create</button>
    </form>
  );
}

export default NewGroupPage;
