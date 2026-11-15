// Applies the saved theme before first paint. Loaded as a file because the
// Content-Security-Policy in _headers disallows inline scripts.
/* global window, document */
(function () {
  var preference = "system";
  try {
    preference = localStorage.getItem("theme") || "system";
  } catch (error) {
    void error;
  }
  var dark =
    preference === "dark" ||
    (preference === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
})();
