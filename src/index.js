import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Switch, Redirect, Route, HashRouter } from "react-router-dom";
import LootSplitterPage, {
  pagePath as lootSplitterPagePath,
} from "./pages/loot-splitter-page";
import AchievementTrackerPage, {
  pagePath as achievementTrackerPagePath,
} from "./pages/achievement-tracker-page";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Switch>
        <Route path={lootSplitterPagePath} component={LootSplitterPage} />
        <Route
          path={achievementTrackerPagePath}
          component={AchievementTrackerPage}
        />
        <Route>
          <Redirect to={achievementTrackerPagePath} />
        </Route>
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
