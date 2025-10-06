# FITFUN HUB - Backend-Frontend Connection Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running on localhost:27017)
- Modern web browser

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`

### Frontend Setup
1. Open the frontend directory in your browser or use a local server:
   ```bash
   # Option 1: Use Python's built-in server
   cd frontend
   python -m http.server 8000
   # Then visit http://localhost:8000
   
   # Option 2: Use Node.js http-server
   npx http-server frontend -p 8000
   # Then visit http://localhost:8000
   ```

2. Or simply open `index.html` directly in your browser

## 🔧 Testing the Connection

### Method 1: Use the Test Page
1. Open `test-connection.html` in your browser
2. Click "Test Backend Connection" to verify the backend is running
3. Test signup and login functionality

### Method 2: Manual Testing
1. Open `auth.html` in your browser
2. Try creating a new account (signup)
3. Try logging in with your credentials
4. You should be redirected to `dashboard.html` on successful login

## 📁 File Structure

```
FITFUN HUB/
├── backend/
│   ├── server.js          # Main backend server
│   ├── package.json       # Backend dependencies
│   └── node_modules/      # Backend dependencies
├── frontend/
│   ├── index.html         # Home page
│   ├── auth.html          # Login/Signup page
│   ├── dashboard.html     # User dashboard
│   ├── api.js            # API service module
│   ├── auth.js           # Authentication logic
│   ├── dashboard.js      # Dashboard functionality
│   ├── script.js         # Main frontend script
│   └── style.css         # Enhanced styling
└── test-connection.html  # Connection test page
```

## 🔗 API Endpoints

The backend provides the following endpoints:

- `POST /signup` - User registration
  - Body: `{ fullName, email, username, password }`
  - Response: `{ success: boolean, message: string }`

- `POST /login` - User authentication
  - Body: `{ username, password }`
  - Response: `{ success: boolean, message: string, user: object }`

## 🎯 Features Implemented

### Backend Features
- ✅ Express.js server with CORS enabled
- ✅ MongoDB connection with Mongoose
- ✅ User registration with password hashing (bcrypt)
- ✅ User authentication
- ✅ Error handling and validation

### Frontend Features
- ✅ Centralized API service module
- ✅ User authentication flow
- ✅ Protected routes (dashboard requires login)
- ✅ Loading states and error handling
- ✅ Responsive design with enhanced UI
- ✅ Local storage for user session management

### Integration Features
- ✅ Seamless frontend-backend communication
- ✅ Real-time error handling
- ✅ User session management
- ✅ Automatic redirects based on authentication status

## 🐛 Troubleshooting

### Backend Issues
1. **MongoDB Connection Error**: Ensure MongoDB is running on localhost:27017
2. **Port Already in Use**: Change the port in `server.js` (line 60)
3. **Dependencies Missing**: Run `npm install` in the backend directory

### Frontend Issues
1. **CORS Errors**: Ensure the backend server is running
2. **API Connection Failed**: Check that the backend is running on port 5000
3. **Authentication Not Working**: Clear browser localStorage and try again

### Common Solutions
- Clear browser cache and localStorage
- Restart both backend and frontend servers
- Check browser console for error messages
- Ensure MongoDB is running and accessible

## 🚀 Next Steps

1. **Start the Backend**: Run `npm start` in the backend directory
2. **Open the Frontend**: Navigate to the frontend directory and open `index.html`
3. **Test the Connection**: Use `test-connection.html` to verify everything works
4. **Create an Account**: Go to the auth page and sign up
5. **Access Dashboard**: Login and explore the dashboard

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify that MongoDB is running
3. Ensure the backend server is accessible on port 5000
4. Use the test connection page to diagnose issues
