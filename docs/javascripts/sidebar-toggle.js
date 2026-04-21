document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth < 1220) return;

  var sidebar = document.querySelector(".md-sidebar--primary");
  var sidebarId = sidebar ? (sidebar.id || "md-sidebar-primary") : "md-sidebar-primary";
  if (sidebar && !sidebar.id) sidebar.id = sidebarId;

  // SVG icons: side panel open/close (Material Design style)
  var iconCollapse = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M3 3h18v2H3V3zm0 16h18v2H3v-2zm0-4h12v2H3v-2zm0-4h12v2H3V11zm0-4h12v2H3V7zm16 1.5L22.5 12 19 15.5V8.5z"/></svg>';
  var iconExpand = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M3 3h18v2H3V3zm0 16h18v2H3v-2zm0-4h12v2H3v-2zm0-4h12v2H3V11zm0-4h12v2H3V7zm19 1.5L18.5 12 22 15.5V8.5z"/></svg>';

  var btn = document.createElement("button");
  btn.className = "md-sidebar-toggle";
  btn.setAttribute("aria-label", "Toggle sidebar navigation");
  btn.setAttribute("aria-expanded", "true");
  btn.setAttribute("aria-controls", sidebarId);
  btn.setAttribute("aria-keyshortcuts", "[");
  btn.title = "Toggle sidebar  [ ]";
  btn.innerHTML = iconCollapse;
  document.body.appendChild(btn);

  var hidden = localStorage.getItem("sidebar-hidden") === "true";
  if (hidden) document.body.classList.add("sidebar-hidden");
  btn.innerHTML = hidden ? iconExpand : iconCollapse;
  btn.setAttribute("aria-expanded", String(!hidden));

  function toggle() {
    document.body.classList.toggle("sidebar-hidden");
    hidden = document.body.classList.contains("sidebar-hidden");
    localStorage.setItem("sidebar-hidden", hidden);
    btn.innerHTML = hidden ? iconExpand : iconCollapse;
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
