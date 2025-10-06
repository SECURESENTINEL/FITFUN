// API Service Module for FITFUN HUB
class APIService {
    constructor() {
        this.baseURL = 'http://localhost:5000';
        this.user = this.getCurrentUser();
    }

    // Get current user from localStorage
    getCurrentUser() {
        try {
            return JSON.parse(localStorage.getItem('user') || 'null');
        } catch (error) {
            console.error('Error parsing user data:', error);
            return null;
        }
    }

    // Set user in localStorage
    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.user = user;
    }

    // Clear user from localStorage
    clearUser() {
        localStorage.removeItem('user');
        this.user = null;
    }

    // Generic API request method
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }
            
            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Authentication methods
    async signup(userData) {
        try {
            const response = await this.request('/signup', {
                method: 'POST',
                body: JSON.stringify(userData)
            });
            return response;
        } catch (error) {
            throw new Error(`Signup failed: ${error.message}`);
        }
    }

    async login(credentials) {
        try {
            const response = await this.request('/login', {
                method: 'POST',
                body: JSON.stringify(credentials)
            });
            
            if (response.success) {
                this.setUser(response.user);
            }
            
            return response;
        } catch (error) {
            throw new Error(`Login failed: ${error.message}`);
        }
    }

    async logout() {
        this.clearUser();
        return { success: true, message: 'Logged out successfully' };
    }

    // Check if user is authenticated
    isAuthenticated() {
        return this.user !== null;
    }

    // Get user info
    getUser() {
        return this.user;
    }

    // Utility method to show loading state
    showLoading(element) {
        if (element) {
            element.innerHTML = '<div class="loading">Loading...</div>';
            element.style.opacity = '0.7';
        }
    }

    // Utility method to hide loading state
    hideLoading(element) {
        if (element) {
            element.style.opacity = '1';
        }
    }

    // Utility method to show messages
    showMessage(message, type = 'info', duration = 3000) {
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.className = `message ${type}`;
            
            if (duration > 0) {
                setTimeout(() => {
                    messageElement.textContent = '';
                    messageElement.className = 'message';
                }, duration);
            }
        }
    }
    // ==========================
// Activity Tracking Methods
// ==========================
async logDietActivity() {
    return await this.request('/api/activity/diet', {
        method: 'POST',
        body: JSON.stringify({
            userName: this.user?.fullName
        })
    });
}

async logWorkoutActivity() {
    return await this.request('/api/activity/workout', {
        method: 'POST',
        body: JSON.stringify({
            userName: this.user?.fullName
        })
    });
}

async logExerciseActivity() {
    return await this.request('/api/activity/exercise', {
        method: 'POST',
        body: JSON.stringify({
            userName: this.user?.fullName
        })
    });
}

async logFitActivity() {
    return await this.request('/api/activity/fit', {
        method: 'POST',
        body: JSON.stringify({
            userName: this.user?.fullName
        })
    });
}

async logFunActivity() {
    return await this.request('/api/activity/fun', {
        method: 'POST',
        body: JSON.stringify({
            userName: this.user?.fullName
        })
    });
}

}



// Create global API instance
const api = new APIService();
