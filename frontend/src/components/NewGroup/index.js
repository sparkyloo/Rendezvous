import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./NewGroup.css";
import { createNewGroup } from "../../store/groups/thunks";
import FormField from "../FormField";
import RadioSet from "../RadioSet";
import CheckboxField from "../CheckboxField";
import ErrorDisplay from "../ErrorDisplay";
import { useErrorHandling } from "../../error-handling";

const GROUP_TYPES = ["In person", "Online"];

function NewGroupPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [groupType, setGroupType] = useState("Online");
  const [isPrivate, setIsPrivate] = useState(false);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const { gatherErrors, clearErrors, errors } = useErrorHandling();

  const history = useHistory();

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    clearErrors();

    dispatch(
      createNewGroup({
        name,
        about,
        type: groupType,
        isPrivate,
        city,
        state,
      })
    )
      .then((newGroupId) => {
        history.push(`/group/${newGroupId}`);
      })
      .catch(gatherErrors);
  };

  return (
    <div className="new-group-page">
      <h1>Create a group</h1>
      <ErrorDisplay errors={errors} />
      <form className="new-group-form" onSubmit={(e) => handleSubmit(e)}>
        <CheckboxField
          id="private"
          label="Is this a private group?"
          checked={isPrivate}
          setChecked={setIsPrivate}
        />
        <FormField id="name" label="Name" value={name} setValue={setName} />
        <FormField
          id="about"
          label="About"
          type="textarea"
          value={about}
          setValue={setAbout}
        />
        <FormField id="city" label="City" value={city} setValue={setCity} />
        <FormField id="state" label="State" value={state} setValue={setState} />
        <RadioSet
          label="Group Type"
          options={GROUP_TYPES}
          value={groupType}
          setValue={setGroupType}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default NewGroupPage;
