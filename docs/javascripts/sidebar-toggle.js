document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth < 1220) return;

  var sidebar = document.querySelector(".md-sidebar--primary");
  var sidebarId = sidebar ? (sidebar.id || "md-sidebar-primary") : "md-sidebar-primary";
  if (sidebar && !sidebar.id) sidebar.id = sidebarId;

  var btn = document.createElement("button");
  btn.className = "md-sidebar-toggle";
  btn.setAttribute("aria-label", "Toggle sidebar navigation");
  btn.setAttribute("aria-expanded", "true");
  btn.setAttribute("aria-controls", sidebarId);
  btn.setAttribute("aria-keyshortcuts", "[");
  btn.textContent = "[";
  document.body.appendChild(btn);

  var hidden = localStorage.getItem("sidebar-hidden") === "true";
  if (hidden) document.body.classList.add("sidebar-hidden");
  btn.textContent = hidden ? "]" : "[";
  btn.setAttribute("aria-expanded", String(!hidden));

  function toggle() {
    document.body.classList.toggle("sidebar-hidden");
    hidden = document.body.classList.contains("sidebar-hidden");
    localStorage.setItem("sidebar-hidden", hidden);
    btn.textContent = hidden ? "]" : "[";
    btn.setAttribute("aria-expanded", String(!hidden));
  }

  btn.addEventListener("click", toggle);

  document.addEventListener("keydown", function (e) {
    if (e.key === "[" && !e.ctrlKey && !e.metaKey && !e.altKey) {
      var tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      toggle();
    }
  });

  // F6: Patch progressbar missing ARIA attributes
  var progress = document.querySelector("[role='progressbar']");
  if (progress) {
    if (!progress.getAttribute("aria-label")) {
      progress.setAttribute("aria-label", "Page loading progress");
    }
    if (!progress.hasAttribute("aria-valuemin")) {
      progress.setAttribute("aria-valuemin", "0");
      progress.setAttribute("aria-valuemax", "100");
      progress.setAttribute("aria-valuenow", "0");
    }
  }

  // F7: Patch search dialog missing accessible name
  var searchDialog = document.querySelector(".md-search[role='dialog']");
  if (searchDialog && !searchDialog.getAttribute("aria-label")) {
    searchDialog.setAttribute("aria-label", "Search");
  }

  // W6: Patch mobile hamburger label missing accessible text
  var drawer = document.querySelector("label[for='__drawer']");
  if (drawer && !drawer.getAttribute("aria-label")) {
    drawer.setAttribute("aria-label", "Open navigation menu");
  }
});
