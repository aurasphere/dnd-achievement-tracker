import achievements from "../data/achievements.json";
import achieved from "../data/achieved.json";
import PageLayout from "./page-layout";
import titleLogo from "../assets/img/achievements-title.png";
import separatorImage from "../assets/img/achievements-separator.png";

export const pagePath = "/achievements";
export default function AchievementTrackerPage() {
  const achievementsHtml = achievements
    .sort((a, b) => a.id - b.id)
    .map(({ id, title, text }, i) => {
      const obtainedBy = Object.entries(achieved)
        .filter(([name, achievements]) => achievements.includes(parseInt(id)))
        .map(([name, achievements]) => name);

      const obtainedByHtml = obtainedBy.map((name, i) => (
        <div key={i} className="row justify-content-center text-center">
          <p className="col m-0">{name}</p>
        </div>
      ));

      return (
        <div key={i} className="row justify-content-center align-items-center">
          <div className="col-2 text-right">
            {obtainedBy.length ? (
              <img src="img/logo.png" alt="logo" width="40" />
            ) : null}
          </div>
          <div className="col-4">
            <div className="row justify-content-center">
              <h4 className="col text-left">{id + ". " + title}</h4>
            </div>
            <div className="row justify-content-center">
              <p className="col text-left">{text}</p>
            </div>
          </div>
          <div className="col-2">{obtainedByHtml}</div>
          <div className="row justify-content-center">
            <img className="col-8" src={separatorImage} alt="separator" />
          </div>
        </div>
      );
    });

  return (
    <PageLayout pagePath={pagePath}>
      <div className="row justify-content-center align-items-center">
        <img
          className="col text-center p-4"
          src={titleLogo}
          alt="ACHIEVEMENTS"
        />
      </div>
      <div id="content">{achievementsHtml}</div>
    </PageLayout>
  );
}
