// Main script for index.html
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user") || "null");
    
    // Update navigation based on login status
    const navLinks = document.querySelector('.nav-links');
    if (user) {
        // User is logged in - show dashboard link instead of auth
        const authLink = navLinks.querySelector('a[href="auth.html"]');
        if (authLink) {
            authLink.textContent = 'Dashboard';
            authLink.href = 'dashboard.html';
        }
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add some interactive effects
    const showcase = document.getElementById('showcase');
    if (showcase) {
        showcase.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        showcase.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});
