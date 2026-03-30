document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-ready");
  const overlay = document.createElement("div");
  overlay.className = "page-transition-overlay";
  document.body.appendChild(overlay);

  document.querySelectorAll("a[href]").forEach(link => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:") || link.target === "_blank" || link.hasAttribute("download")) return;
    link.addEventListener("click", e => {
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      e.preventDefault();
      document.body.classList.add("page-leaving");
      setTimeout(() => { window.location.href = url.href; }, 420);
    });
  });
});
