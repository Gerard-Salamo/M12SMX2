document.getElementById("link-projecte").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelectorAll("main > section:not(#projecte)").forEach((s) => (s.style.display = "none"));
  document.getElementById("projecte").style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelectorAll(".naveg-lat a").forEach((a) => {
  a.addEventListener("click", function (e) {
    const id = this.getAttribute("href").slice(1);

    if (document.getElementById(id) && id !== "projecte") {
      e.preventDefault();

      document.getElementById("projecte").style.display = "none";

      document
        .querySelectorAll("main > section:not(#projecte)")
        .forEach((s) => (s.style.display = "block"));

      document.getElementById(id).scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

document.querySelectorAll(".btn-outline").forEach((b) =>
  b.addEventListener("click", (e) => e.preventDefault())
);