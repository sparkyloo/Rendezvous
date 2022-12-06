import "./GroupsFeed.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllGroups } from "../../store/groups/thunks";
import ItemFeed from "../ItemFeed";

export default function GroupsFeed() {
  const dispatch = useDispatch();
  const allGroups = useSelector((state) => {
    return state.groups.allGroups;
  });

  useEffect(() => {
    dispatch(getAllGroups());
  }, []);

  return <ItemFeed type="group" items={allGroups} />;
}
