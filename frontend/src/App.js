import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GroupsFeed from "./components/GroupsFeed";
import EventsFeed from "./components/EventsFeed";
import MyGroups from "./components/MyGroups";
import NewGroupPage from "./components/NewGroup";
import GroupDetails from "./components/GroupDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div id="app-root">
      <Navigation isLoaded={isLoaded} />
      <div className="page-content">
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <GroupsFeed />
          </Route>
          <Route exact path="/events">
            <EventsFeed />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/new-group">
            <NewGroupPage />
          </Route>
          <Route path="/group/:groupId">
            <GroupDetails />
          </Route>
          <Route path="/my-groups">
            <MyGroups />
          </Route>
        </Switch>
      )}
      </div>
    </div>
  );
}

export default App;
