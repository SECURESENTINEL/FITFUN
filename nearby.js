document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  const findButtons = document.querySelectorAll(".find-btn");

  // Logout handler
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      alert("You have been logged out!");
      window.location.href = "index.html";
    });
  }

  // Handle Find Near Me clicks
  findButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.type;
      let query = "";

      switch (type) {
        case "gym": query = "gyms near me"; break;
        case "yoga": query = "yoga classes near me"; break;
        case "pilates": query = "pilates classes near me"; break;
        case "boxing": query = "boxing clubs near me"; break;
        case "swimming": query = "swimming pools near me"; break;
      }

      // Open Google Maps with search
      window.open(`https://www.google.com/maps/search/${encodeURIComponent(query)}`, "_blank");
    });
  });
});
