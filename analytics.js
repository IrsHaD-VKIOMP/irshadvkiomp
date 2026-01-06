/* ===============================
   Privacy-First Analytics
   No cookies · No tracking · Local only
================================ */

(function () {
  const KEY = "pf_analytics";

  function getData() {
    return JSON.parse(localStorage.getItem(KEY)) || {
      visits: 0,
      firstVisit: null,
      lastVisit: null,
      returning: 0,
      device: {
        mobile: 0,
        desktop: 0
      },
      buttons: {}
    };
  }

  function saveData(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  function isMobile() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  // 🧭 Page visit
  function trackVisit() {
    const data = getData();
    const now = Date.now();

    data.visits += 1;

    if (!data.firstVisit) {
      data.firstVisit = now;
    } else {
      data.returning += 1;
    }

    data.lastVisit = now;

    if (isMobile()) {
      data.device.mobile += 1;
    } else {
      data.device.desktop += 1;
    }

    saveData(data);
  }

  // 🔘 Button tracking
  function trackButton(name) {
    const data = getData();
    data.buttons[name] = (data.buttons[name] || 0) + 1;
    saveData(data);
  }

  // 🌍 Expose safely
  window.PFAnalytics = {
    trackButton,
    getStats: getData,
    reset() {
      localStorage.removeItem(KEY);
    }
  };

  // Auto-track visit
  trackVisit();
})();
