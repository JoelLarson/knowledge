document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth < 1220) return;

  var btn = document.createElement("button");
  btn.className = "md-sidebar-toggle";
  btn.title = "Toggle sidebar [";
  btn.textContent = "[";
  document.body.appendChild(btn);

  var hidden = localStorage.getItem("sidebar-hidden") === "true";
  if (hidden) document.body.classList.add("sidebar-hidden");
  btn.textContent = hidden ? "]" : "[";

  btn.addEventListener("click", function () {
    document.body.classList.toggle("sidebar-hidden");
    hidden = document.body.classList.contains("sidebar-hidden");
    localStorage.setItem("sidebar-hidden", hidden);
    btn.textContent = hidden ? "]" : "[";
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "[" && !e.ctrlKey && !e.metaKey && !e.altKey) {
      var tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      document.body.classList.toggle("sidebar-hidden");
      hidden = document.body.classList.contains("sidebar-hidden");
      localStorage.setItem("sidebar-hidden", hidden);
      btn.textContent = hidden ? "]" : "[";
    }
  });
});
