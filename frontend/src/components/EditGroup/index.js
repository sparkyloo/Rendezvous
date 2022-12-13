import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import "./EditGroup.css";
import { updateGroup, getSelectedGroup } from "../../store/groups/thunks";
import FormField from "../FormField";
import RadioSet from "../RadioSet";
import CheckboxField from "../CheckboxField";
import ErrorDisplay from "../ErrorDisplay";
import { useErrorHandling } from "../../error-handling";

const GROUP_TYPES = ["In person", "Online"];

function EditGroupPage() {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [pageIsReady, setPageIsReady] = useState(false);

  const sessionUser = useSelector((state) => state.session.user);
  const group = useSelector((state) => state.groups.selected);

  const isGroupAdmin = useSelector(
    ({ session: { user }, groups: { selected } }) => {
      if (!selected) {
        return false;
      }

      if (user && user.id === selected.organizerId) {
        return true;
      }

      return false;
    }
  );

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [groupType, setGroupType] = useState("Online");
  const [isPrivate, setIsPrivate] = useState(false);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const { redirectWhenError, gatherErrors, clearErrors, errors } =
    useErrorHandling();

  useEffect(() => {
    if (group && !pageIsReady) {
      setName(group.name);
      setAbout(group.about);
      setGroupType(group.type);
      setIsPrivate(group.private);
      setCity(group.city);
      setState(group.state);

      setPageIsReady(true);
    }
  }, [group]);

  useEffect(() => {
    dispatch(getSelectedGroup(groupId)).catch(redirectWhenError);
  }, [groupId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    clearErrors();

    dispatch(
      updateGroup(groupId, {
        name,
        about,
        type: groupType,
        isPrivate,
        city,
        state,
      })
    )
      .then((EditGroupId) => {
        history.push(`/group/${EditGroupId}`);
      })
      .catch(gatherErrors);
  };

  if (!sessionUser) return <Redirect to="/not-allowed" />;

  if (!pageIsReady) return null;

  if (!isGroupAdmin) return <Redirect to="/not-allowed" />;

  return (
    <div className="edit-group-page">
      <h1>Edit your group</h1>
      <ErrorDisplay errors={errors} />
      <form className="edit-group-form" onSubmit={(e) => handleSubmit(e)}>
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditGroupPage;
