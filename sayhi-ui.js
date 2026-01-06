// sayhi-ui.js
// Handles Say Hi UI + 30-minute cooldown only

const SAYHI_COOLDOWN_MINUTES = 30;
const SAYHI_LAST_KEY = "sayhi_last_time";

function canSayHi() {
  const last = localStorage.getItem(SAYHI_LAST_KEY);
  if (!last) return true;

  const diff = Date.now() - Number(last);
  return diff >= SAYHI_COOLDOWN_MINUTES * 60 * 1000;
}

function remainingMinutes() {
  const last = localStorage.getItem(SAYHI_LAST_KEY);
  if (!last) return 0;

  const diff = Date.now() - Number(last);
  const left =
    SAYHI_COOLDOWN_MINUTES * 60 * 1000 - diff;

  return Math.ceil(left / 60000);
}

// 🌟 UI handler with cooldown result
window.showSayHiUI = function (greeting) {
  const overlay = document.getElementById("sayHiOverlay");
  const textEl = document.getElementById("typingText");
  const btn = document.getElementById("sayHiBtn");

  if (!overlay || !btn) return false;

  // ⛔ Cooldown check
  if (!canSayHi()) {
    const mins = remainingMinutes();

    overlay.classList.add("show");
    if (textEl) {
      textEl.textContent =
        `You already said Hi 😊 Try again in ${mins} minute${mins > 1 ? "s" : ""}.`;
    }

    setTimeout(() => {
      overlay.classList.remove("show");
      btn.classList.remove("loading");
    }, 2000);

    return false; // ❌ BLOCK WhatsApp
  }

  // ✅ Save time
  localStorage.setItem(SAYHI_LAST_KEY, Date.now());

  // 🎭 Show greeting
  overlay.classList.add("show");
  if (textEl) textEl.textContent = greeting;

  setTimeout(() => {
    if (textEl) textEl.textContent = "Opening WhatsApp…";
  }, 600);

  setTimeout(() => {
    overlay.classList.remove("show");
    btn.classList.remove("loading");
  }, 1500);

  return true; // ✅ ALLOW WhatsApp
};
