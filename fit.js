document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "index.html"; // redirect to homepage
    });
  }
  api.logFitActivity().then(() => console.log("Fit activity logged"));

});
