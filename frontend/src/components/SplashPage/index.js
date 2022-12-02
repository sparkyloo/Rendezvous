import "./SplashPage.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllGroups } from "../../store/groups/thunks";

export default function SplashPage() {
  const dispatch = useDispatch();
  const allGroups = useSelector((state) => {
    return state.groups.allGroups;
  });

  useEffect(() => {
    dispatch(getAllGroups());
  }, []);

  return (
    <>
      {allGroups.map((group) => {
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
    </>
  );
}
