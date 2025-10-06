document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      alert("You have been logged out!");
      window.location.href = "index.html";
    });
  }

  // Tab switching
  const tabs = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // remove active from all
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      // add active to selected
      tab.classList.add("active");
      const target = document.getElementById(tab.dataset.target);
      target.classList.add("active");

       api.logDietActivity().then(() => console.log("Diet activity logged"));
    });
  });
});
