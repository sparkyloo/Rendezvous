import "./MyGroups.css";
import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyGroups } from "../../store/groups/thunks";
import { useHistory } from "react-router-dom";

export default function MyGroups() {
  const dispatch = useDispatch();
  const myGroups = useSelector((state) => {
    return state.groups.myGroups;
  });

  useEffect(() => {
    dispatch(getMyGroups());
  }, []);

  const history = useHistory();

  return (
    <div>
      <button onClick={() => history.push("/new-group")}>Create Group</button>
      {myGroups.map((group) => {
        return (
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
        );
      })}
    </div>
  );
}
