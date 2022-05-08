import { pagePath as lootSplitterPagePath } from "./loot-splitter-page";
import { pagePath as achievementTrackerPagePath } from "./achievement-tracker-page";
import { Link } from "react-router-dom";

export default function PageLayout({ children, pagePath }) {
  return (
    <div>
      <div className="row bg-dark header justify-content-center align-content-center">
        <div className="col-4">
          <h2 className="text-left">
            <Link
              to={achievementTrackerPagePath}
              className={
                pagePath === achievementTrackerPagePath ? "active" : ""
              }
            >
              Achievements
            </Link>
          </h2>
        </div>
        <div className="col-4">
          <h2 className="text-right">
            <Link
              to={lootSplitterPagePath}
              className={pagePath === lootSplitterPagePath ? "active" : ""}
            >
              Loot Splitter
            </Link>
          </h2>
        </div>
      </div>
      <div className="container-fluid">{children}</div>
    </div>
  );
}
