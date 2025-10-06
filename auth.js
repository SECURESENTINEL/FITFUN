// Enhanced Authentication with API Service
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    if (api.isAuthenticated()) {
        window.location.href = 'dashboard.html';
        return;
    }

    // Signup form handler
    document.getElementById("signupForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const username = document.getElementById("usernameSignup").value;
        const password = document.getElementById("passwordSignup").value;

        const signupBtn = e.target.querySelector('button[type="submit"]');
        const originalText = signupBtn.textContent;
        
        try {
            // Show loading state
            signupBtn.textContent = 'Signing up...';
            signupBtn.disabled = true;
            api.showLoading(document.getElementById("message"));

            const response = await api.signup({ fullName, email, username, password });
            
            if (response.success) {
                // Show enhanced success message with email notification
                let successMessage = response.message;
                if (response.emailSent) {
                    successMessage += '\n📧 Check your email for a welcome message!';
                } else if (response.emailError) {
                    successMessage += '\n⚠️ Note: Welcome email could not be sent.';
                }
                
                api.showMessage(successMessage, 'success');
                
                // Show additional success alert
                setTimeout(() => {
                    alert(`🎉 Welcome to FITFUN HUB, ${fullName}!\n\n✅ Account created successfully!\n📧 ${response.emailSent ? 'Welcome email sent to your inbox!' : 'Welcome email could not be sent.'}\n\nYou can now login with your credentials.`);
                }, 500);
                
                // Clear form on success
                document.getElementById("signupForm").reset();
            } else {
                api.showMessage(response.message, 'error');
            }
            
        } catch (error) {
            api.showMessage(error.message, 'error');
        } finally {
            // Reset button state
            signupBtn.textContent = originalText;
            signupBtn.disabled = false;
            api.hideLoading(document.getElementById("message"));
        }
    });

    // Login form handler
    document.getElementById("loginForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const username = document.getElementById("usernameLogin").value;
        const password = document.getElementById("passwordLogin").value;

        const loginBtn = e.target.querySelector('button[type="submit"]');
        const originalText = loginBtn.textContent;
        
        try {
            // Show loading state
            loginBtn.textContent = 'Logging in...';
            loginBtn.disabled = true;
            api.showLoading(document.getElementById("message"));

            const response = await api.login({ username, password });
            
            if (response.success) {
                api.showMessage(response.message, 'success');
                // Redirect to dashboard after successful login
                setTimeout(() => {
                    window.location.href = "dashboard.html";
                }, 1000);
            } else {
                api.showMessage(response.message, 'error');
            }
            
        } catch (error) {
            api.showMessage(error.message, 'error');
        } finally {
            // Reset button state
            loginBtn.textContent = originalText;
            loginBtn.disabled = false;
            api.hideLoading(document.getElementById("message"));
        }
    });

    // Add form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('input', function() {
            const inputs = form.querySelectorAll('input[required]');
            const submitBtn = form.querySelector('button[type="submit"]');
            const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
            submitBtn.disabled = !allFilled;
        });
    });
});
