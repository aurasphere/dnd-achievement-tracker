$("document").ready(() => {
  achievements.forEach((element) => {
    const text = element.visible
      ? escapeHtml(element.testo)
      : element.testo.replace(/./g, "?");

    $("#content").append(
      `<div class="row justify-content-center">
        <div class="col-2 text-right">
          <img src="assets/logo.png" alt="logo" width="40"/>
        </div>
        <div class="col-6">
          <div class="row justify-content-center">
            <h4 class="col text-left">${escapeHtml(element.titolo)}</h4>
          </div>
          <div class="row justify-content-center">
            <p class="col text-left">${text}</p>
          </div>
           <hr class="hr-white"/>
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
