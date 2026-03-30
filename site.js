document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById("themeToggle");
  const timeEl = document.getElementById("live-time");
  const menuToggle = document.getElementById("menuToggle");
  const menuClose = document.getElementById("menuClose");
  const menuPanel = document.getElementById("menuPanel");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuLinks = document.querySelectorAll("[data-menu-link]");

  function applyTheme(theme) {
    document.body.classList.toggle("light", theme === "light");
    if (themeBtn) themeBtn.textContent = theme === "light" ? "☀️" : "🌙";
  }

  const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const savedTheme = localStorage.getItem("theme");
  applyTheme(savedTheme || (systemPrefersLight ? "light" : "dark"));

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = document.body.classList.contains("light") ? "dark" : "light";
      localStorage.setItem("theme", next);
      applyTheme(next);
    });
  }

  function updateTime() {
    if (!timeEl) return;
    timeEl.textContent = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }
  updateTime();
  setInterval(updateTime, 1000);

  function openMenu() {
    if (!menuPanel || !menuOverlay || !menuToggle) return;
    menuPanel.classList.add("show");
    menuOverlay.classList.add("show");
    menuToggle.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    if (!menuPanel || !menuOverlay || !menuToggle) return;
    menuPanel.classList.remove("show");
    menuOverlay.classList.remove("show");
    menuToggle.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      if (menuPanel.classList.contains("show")) closeMenu();
      else openMenu();
    });
  }
  if (menuClose) menuClose.addEventListener("click", closeMenu);
  if (menuOverlay) menuOverlay.addEventListener("click", closeMenu);
  menuLinks.forEach(link => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 980) closeMenu();
  });
});
