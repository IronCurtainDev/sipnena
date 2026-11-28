// Applies the saved theme before first paint. Loaded as a file because the
// Content-Security-Policy in _headers disallows inline scripts.
/* global window, document */
(function () {
  var preference = "system";
  var savedLang = "si";
  try {
    preference = localStorage.getItem("theme") || "system";
    var rawLang = localStorage.getItem("sipnena_preferred_lang");
    if (rawLang === "si" || rawLang === "ta" || rawLang === "en") {
      savedLang = rawLang;
    }
  } catch (error) {
    void error;
  }
  document.documentElement.lang = savedLang;
  var dark =
    preference === "dark" ||
    (preference === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
})();
