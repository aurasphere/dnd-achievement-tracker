$("document").ready(() => {
  achievements.forEach((element) => {
    const text = element.visible
      ? escapeHtml(element.testo)
      : element.testo.replace(/./g, "?");

    $("#content").append(
      `<div class='row justify-content-center'><h4>${escapeHtml(
        element.titolo
      )}</h4></div><div class="row justify-content-center"><p>${text}</p></div>`
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
