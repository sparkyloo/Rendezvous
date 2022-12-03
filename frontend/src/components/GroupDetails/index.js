import "./GroupDetails.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSelectedGroup } from "../../store/groups";
import { useParams } from "react-router-dom";

export default function GroupDetails() {
  const { groupId } = useParams();
  const dispatch = useDispatch();

  const group = useSelector((state) => {
    return state.groups.selected;
  });

  useEffect(() => {
    dispatch(getSelectedGroup(groupId));
  }, []);

  return (
    <>
      {!!group && (
        <div>
        <ul>
          <li>{group.name}</li>
          <li>{group.about}</li>
          <li>{group.city}</li>
          <li>{group.state}</li>
          <li>{group.type}</li>
          <li>{group.private}</li>
        </ul>
      </div>
      )}
    </>
  );
}
