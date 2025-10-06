// exercise.js
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      alert("You have been logged out!");
      window.location.href = "index.html";
    });
  }
  api.logExerciseActivity().then(() => console.log("Exercise activity logged"));
});
