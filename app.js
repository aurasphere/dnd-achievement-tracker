$("document").ready(() => {
  const achievedUnifiedArray = Object.values(achieved).reduce(
    (o, n) => o.concat(n),
    []
  );

  console.log(achievedUnifiedArray);

  achievements.forEach((element) => {
    const text = element.visible
      ? escapeHtml(element.testo)
      : element.testo.replace(/./g, "?");

    const logoHtml = achievedUnifiedArray.includes(
      parseInt(element.progressivo)
    )
      ? '<img src="assets/logo.png" alt="logo" width="40"/>'
      : "";

    $("#content").append(
      `<div class="row justify-content-center">
        <div class="col-2 text-right">
         ${logoHtml}
        </div>
        <div class="col-6">
          <div class="row justify-content-center">
            <h4 class="col text-left">${escapeHtml(element.titolo)}</h4>
          </div>
          <div class="row justify-content-center">
            <p class="col text-left">${text}</p>
          </div>
          <div class="row justify-content-start text-left">
            <img class="col-12" src="assets/separator.png" alt="separator"/>
          </div>
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
