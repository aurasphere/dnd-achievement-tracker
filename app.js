$("document").ready(() => {
  achievements.forEach((element) => {
    const obtainedBy = Object.entries(achieved)
      .filter(([name, achievements]) =>
        achievements.includes(parseInt(element.id))
      )
      .map(([name, achievements]) => name);

    const text =
      element.visible || obtainedBy.length
        ? escapeHtml(element.text)
        : element.text.replace(/./g, "?");

    const logoHtml = obtainedBy.length
      ? '<img src="assets/logo.png" alt="logo" width="40"/>'
      : "";

    const obtainedByHtml = obtainedBy
      .map(
        (n) =>
          `<div class="row justify-content-center text-center"><p class="col m-0">${escapeHtml(
            n
          )}</p></div>`
      )
      .join("");

    $("#content").append(
      `<div class="row justify-content-center align-items-center">
        <div class="col-2 text-right">
         ${logoHtml}
        </div>
        <div class="col-4">
          <div class="row justify-content-center">
            <h4 class="col text-left">${escapeHtml(element.title)}</h4>
          </div>
          <div class="row justify-content-center">
            <p class="col text-left">${text}</p>
          </div>
        </div>
         <div class="col-2">
         ${obtainedByHtml}
         </div>
         <div class="row justify-content-center">
            <img class="col-8" src="assets/separator.png" alt="separator"/>
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
