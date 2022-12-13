import "./MyGroups.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyGroups } from "../../store/groups/thunks";
import ItemFeed from "../ItemFeed";

export default function MyGroups() {
  const dispatch = useDispatch();
  const myGroups = useSelector((state) => {
    return state.groups.myGroups;
  });

  useEffect(() => {
    dispatch(getMyGroups());
  }, []);

  return (
    <div className="feed-page">
      <h1>My Groups</h1>
      {myGroups.length ? (
        <ItemFeed type="group" items={myGroups} />
      ) : (
        <p>You are not a member of any groups yet, why not create one?</p>
      )}
    </div>
  );
}
