import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import { restoreUser } from "./store/session";
import Navigation from "./components/Navigation";
import MyGroups from "./components/MyGroups";
import NewGroupPage from "./components/NewGroup";
import GroupDetails from "./components/GroupDetails";
import EventDetails from "./components/EventDetails";
import NewEventPage from "./components/NewEvent";
import SplashPage from "./components/SplashPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div id="app-root">
      <Navigation isLoaded={isLoaded} />
      <div className="page-content">
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              <SplashPage />
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
            <Route path="/group/:groupId/new-event">
              <NewEventPage />
            </Route>
            <Route path="/group/:groupId">
              <GroupDetails />
            </Route>
            <Route path="/event/:eventId">
              <EventDetails />
            </Route>
            <Route path="/my-groups">
              <MyGroups />
            </Route>
            <Route path="/not-allowed">
              <div className="misc-page">
                <h1>Not Allowed</h1>
                <div>Ah Ah Ah, You didn't say the magic word.</div>
              </div>
            </Route>
            <Route path="/5*">
              <div className="misc-page">
                <h1>Server Error</h1>
                <div>Woops, something went wrong!</div>
              </div>
            </Route>
            <Route path="*">
              <div className="misc-page">
                <h1>Page Not Found</h1>
                <div>These are not the droids you are looking for...</div>
              </div>
            </Route>
          </Switch>
        )}
      </div>
    </div>
  );
}

export default App;
