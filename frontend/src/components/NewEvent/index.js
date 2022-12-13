import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import "./NewEvent.css";
import { getSelectedGroup } from "../../store/groups/thunks";
import { createNewEvent } from "../../store/events/thunks";
import FormField from "../FormField";
import RadioSet from "../RadioSet";
import ErrorDisplay from "../ErrorDisplay";
import { useErrorHandling } from "../../error-handling";

const EVENT_TYPES = ["In person", "Online"];

function NewEventPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { groupId } = useParams();

  const [pageIsReady, setPageIsReady] = useState(false);

  const sessionUser = useSelector((state) => {
    return state.session.user;
  });

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
  const [description, setDescription] = useState("");
  const [groupType, setGroupType] = useState("Online");
  const [capacity, setCapacity] = useState(1);
  const [price, setPrice] = useState(100);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { redirectWhenError, gatherErrors, clearErrors, errors } =
    useErrorHandling();

  // need a venue select

  const handleSubmit = async (e) => {
    e.preventDefault();

    clearErrors();

    dispatch(
      createNewEvent(groupId, 1, {
        name,
        description,
        type: groupType,
        capacity,
        price,
        startDate,
        endDate,
      })
    )
      .then((newEventId) => {
        history.push(`/event/${newEventId}`);
      })
      .catch(gatherErrors);
  };

  useEffect(() => {
    dispatch(getSelectedGroup(groupId))
      .then(() => {
        setPageIsReady(true);
      })
      .catch(redirectWhenError);
  }, [groupId]);

  if (!sessionUser) return <Redirect to="/not-allowed" />;

  if (!pageIsReady) return null;

  if (!isGroupAdmin) return <Redirect to="/not-allowed" />;

  return (
    <div className="new-event-page">
      <h1>Create an event</h1>
      <ErrorDisplay errors={errors} />
      <form className="new-event-form" onSubmit={(e) => handleSubmit(e)}>
        <FormField id="name" label="Name" value={name} setValue={setName} />
        <FormField
          id="description"
          label="Description"
          type="textarea"
          value={description}
          setValue={setDescription}
        />
        <FormField
          id="capacity"
          label="Capacity"
          type="number"
          step="1"
          min="1"
          value={capacity}
          setValue={setCapacity}
        />
        <FormField
          id="price"
          label="Price"
          type="number"
          value={price}
          setValue={setPrice}
        />
        <RadioSet
          label="Group Type"
          options={EVENT_TYPES}
          value={groupType}
          setValue={setGroupType}
        />
        <FormField
          id="startDate"
          label="Start Date"
          type="date"
          value={startDate}
          setValue={setStartDate}
        />
        <FormField
          id="endDate"
          label="Price"
          type="date"
          value={endDate}
          setValue={setEndDate}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default NewEventPage;
