console.log('✅ fun.js loaded');

document.addEventListener('DOMContentLoaded', () => {
  // containers / controls
  const activitiesContainer = document.querySelector('.activities');
  const selectedActivityText = document.getElementById('selectedActivity');
  const findBtn = document.querySelector('.actions .find');
  const meetupBtn = document.querySelector('.actions .meetup');
  const fbBtn = document.querySelector('.actions .facebook');

  if (!activitiesContainer || !selectedActivityText) {
    console.error('fun.js: missing required DOM elements (.activities or #selectedActivity).');
    return;
  }

  let selectedQuery = ''; // the search string used for maps/meetup/facebook

  // Event delegation: handles clicks on any .activity button (works if buttons added dynamically)
  activitiesContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.activity');
    if (!btn) return;

    // update active state
    activitiesContainer.querySelectorAll('.activity').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // use data-activity if present; otherwise use visible text
    const label = btn.dataset.activity?.trim() || btn.textContent.trim();
    selectedQuery = btn.dataset.activity || label;

    selectedActivityText.textContent = `🔍 Searching for: ${label}`;
  });

  // helper to require selection
  function requireSelection(cb) {
    if (!selectedQuery) {
      alert('Please select an activity first.');
      return;
    }
    cb();
  }

  // Open Google Maps search for selectedQuery
  findBtn?.addEventListener('click', () => {
    requireSelection(() => {
      const url = `https://www.google.com/maps/search/${encodeURIComponent(selectedQuery)}`;
      window.open(url, '_blank');
    });
  });

  // Open Meetup search
  meetupBtn?.addEventListener('click', () => {
    requireSelection(() => {
      const url = `https://www.meetup.com/find/?keywords=${encodeURIComponent(selectedQuery)}`;
      window.open(url, '_blank');
    });
  });


  // Logout handling (if present)
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  });
  api.logFunActivity().then(() => console.log("Fun activity logged"));

});
