$("document").ready(() => {
  const achievedUnifiedArray = Object.values(achieved).reduce(
    (o, n) => o.concat(n),
    []
  );

  achievements.forEach((element) => {
    const achieved = achievedUnifiedArray.includes(
      parseInt(element.progressivo)
    );

    const text =
      element.visible || achieved
        ? escapeHtml(element.testo)
        : element.testo.replace(/./g, "?");

    const logoHtml = achieved
      ? '<img src="assets/logo.png" alt="logo" width="40"/>'
      : "";

    $("#content").append(
      `<div class="row justify-content-center align-items-center">
        <div class="col-2 text-right">
         ${logoHtml}
        </div>
        <div class="col-4">
          <div class="row justify-content-center">
            <h4 class="col text-left">${escapeHtml(element.titolo)}</h4>
          </div>
          <div class="row justify-content-center">
            <p class="col text-left">${text}</p>
          </div>
        </div>
         <div class="row justify-content-center">
            <img class="col-6" src="assets/separator.png" alt="separator"/>
          </div>
       `
    );
  });

  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
});
