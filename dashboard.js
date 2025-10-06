// Enhanced Dashboard with API Integration
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!api.isAuthenticated()) {
        window.location.href = "auth.html";
        return;
    }

    // Get user data and display welcome message
    const user = api.getUser();
    if (user) {
        const welcomeElement = document.getElementById("welcomeUser");
        if (welcomeElement) {
            welcomeElement.textContent = `Welcome, ${user.fullName || "User"} 🎉`;
        }
    }

    
    // Logout functionality
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            try {
                // Show loading state
                logoutBtn.textContent = 'Logging out...';
                logoutBtn.disabled = true;

                // Call API logout (for future token invalidation)
                await api.logout();
                
                // Show success message
                api.showMessage('Logged out successfully', 'success', 1000);
                
                // Redirect after a short delay
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1000);
                
            } catch (error) {
                console.error('Logout error:', error);
                // Even if API call fails, clear local data and redirect
                api.clearUser();
                window.location.href = "index.html";
            }
        });
    }

    // Add user profile information display
    displayUserProfile(user);

    // Add dashboard statistics (placeholder for future features)
    loadDashboardStats();
});

// Function to display user profile information
function displayUserProfile(user) {
    if (!user) return;
    
    // You can add more user information display here
    console.log('User profile loaded:', user);
}

// Function to load dashboard statistics
async function loadDashboardStats() {
    try {
        // This is a placeholder for future dashboard statistics
        // You can add API calls here to fetch user activity, bookings, etc.
        console.log('Dashboard stats loaded');
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
    }
}
