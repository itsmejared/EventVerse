(function () {
  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderBanner(html, state) {
    let banner = document.getElementById("auth-status-banner");
    if (!banner) {
      banner = document.createElement("div");
      banner.id = "auth-status-banner";
      document.body.prepend(banner);
    }
    banner.className = "auth-status-banner auth-status-" + state;
    banner.innerHTML = html;
  }

  async function updateAuthStatus() {
    try {
      const res = await fetch("/auth/user", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        const name = escapeHtml(data.user?.displayName || data.user?.username || "User");
        renderBanner(
          "Logged in as <strong>" + name + '</strong> · <a href="/auth/logout">Logout</a>',
          "logged-in"
        );
        return;
      }

      renderBanner('Not logged in · <a href="/auth/login">Login with GitHub</a>', "logged-out");
    } catch {
      renderBanner("Could not check authentication status", "error");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateAuthStatus);
  } else {
    updateAuthStatus();
  }
})();
