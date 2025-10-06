const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Email configuration
const createTransporter = () => {
  // For development, we'll use Gmail SMTP
  // You can also use other services like SendGrid, Mailgun, etc.
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'shriyakhaithwas@gmail.com', // Set your email
      pass: process.env.EMAIL_PASS || 'jrkqmsafgvqsaegn' // Set your app password
    }
  });
};

// Email templates
const getWelcomeEmailTemplate = (fullName, username) => {
  return {
    subject: '🎉 Welcome to FITFUN HUB!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; background: linear-gradient(90deg, #000000 0%, #1a1a2e 50%, #000000 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; color: #00d4ff;">🌟 Welcome to FITFUN HUB!</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px;">Your All-in-One Health & Entertainment Platform</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-top: 0;">Hello ${fullName}! 👋</h2>
          
          <p style="color: #555; line-height: 1.6;">
            Welcome to FITFUN HUB! We're thrilled to have you join our community of health and entertainment enthusiasts.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00d4ff;">
            <h3 style="color: #333; margin-top: 0;">Your Account Details:</h3>
            <p><strong>Username:</strong> ${username}</p>
            <p><strong>Full Name:</strong> ${fullName}</p>
          </div>
          
          <div style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h3 style="margin-top: 0;">What's Next?</h3>
            <p style="margin-bottom: 0;">🏋️‍♀️ Explore our fitness options<br>
            🎭 Discover entertainment experiences<br>
            📲 Start your journey to wellness and happiness!</p>
          </div>
          
          <p style="color: #555; line-height: 1.6;">
            Ready to get started? <a href="http://localhost:8000/dashboard.html" style="color: #00d4ff; text-decoration: none; font-weight: bold;">Login to your dashboard</a> and begin exploring all that FITFUN HUB has to offer!
          </p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #888; font-size: 14px; margin: 0;">
              Stay fit. Have fun. Live more. 💪🎉<br>
              <strong>FITFUN HUB Team</strong>
            </p>
          </div>
        </div>
      </div>
    `
  };
};

// Function to send welcome email
const sendWelcomeEmail = async (email, fullName, username) => {
  try {
    const transporter = createTransporter();
    const emailTemplate = getWelcomeEmailTemplate(fullName, username);
    
    const mailOptions = {
      from: process.env.EMAIL_USER || '***********@gmail.com',
      to: email,
      subject: emailTemplate.subject,
      html: emailTemplate.html
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    return { success: false, error: error.message };
  }
};


// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/fitfunhub", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ DB Error:", err));

// Schema
const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: String
});

const User = mongoose.model("User", userSchema);

// ==========================
// Diet Activity Schema
// ==========================
const dietActivitySchema = new mongoose.Schema({
  userName: { type: String, required: true },
  dietType: { type: String, default: "General" },
  clickedAt: { type: Date, default: Date.now }
});
const DietActivity = mongoose.model("DietActivity", dietActivitySchema);

// ==========================
// Home Workout Activity Schema
// ==========================
const workoutActivitySchema = new mongoose.Schema({
  userName: { type: String, required: true },
  workoutType: { type: String, default: "General" },
  clickedAt: { type: Date, default: Date.now }
});
const WorkoutActivity = mongoose.model("WorkoutActivity", workoutActivitySchema);

// ==========================
// Exercise Library Activity Schema
// ==========================
const exerciseActivitySchema = new mongoose.Schema({
  userName: { type: String, required: true },
  exerciseName: { type: String, default: "General" },
  clickedAt: { type: Date, default: Date.now }
});
const ExerciseActivity = mongoose.model("ExerciseActivity", exerciseActivitySchema);

// ==========================
// Fit Activity Schema
// ==========================
const fitActivitySchema = new mongoose.Schema({
  userName: { type: String, required: true },
  fitType: { type: String, default: "General" },
  clickedAt: { type: Date, default: Date.now }
});
const FitActivity = mongoose.model("FitActivity", fitActivitySchema);

// ==========================
// Fun Activity Schema
// ==========================
const funActivitySchema = new mongoose.Schema({
  userName: { type: String, required: true },
  funType: { type: String, default: "General" },
  clickedAt: { type: Date, default: Date.now }
});
const FunActivity = mongoose.model("FunActivity", funActivitySchema);


// Signup
app.post("/signup", async (req, res) => {
  try {
    const { fullName, email, username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, username, password: hashed });
    await newUser.save();
    
    // Send welcome email
    const emailResult = await sendWelcomeEmail(email, fullName, username);
    
    if (emailResult.success) {
      console.log('✅ Welcome email sent to:', email);
      res.json({ 
        success: true, 
        message: "User registered successfully! Welcome email sent to your inbox. 🎉",
        emailSent: true
      });
    } else {
      console.log('⚠️ User registered but email failed to send:', emailResult.error);
      res.json({ 
        success: true, 
        message: "User registered successfully! (Note: Welcome email could not be sent)",
        emailSent: false,
        emailError: emailResult.error
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: "Error: " + err.message });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid password" });

    res.json({ success: true, message: "Login successful", user: { fullName: user.fullName, email: user.email } });
  } catch (err) {
    res.status(400).json({ success: false, message: "Error: " + err.message });
  }
});

// ==========================
// Diet Activity Routes
// ==========================
app.post("/api/activity/diet", async (req, res) => {
  try {
    const newActivity = new DietActivity(req.body);
    await newActivity.save();
    res.json(newActivity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.get("/api/activity/diet", async (req, res) => {
  const activities = await DietActivity.find();
  res.json(activities);
});

// ==========================
// Workout Activity Routes
// ==========================
app.post("/api/activity/workout", async (req, res) => {
  try {
    const newActivity = new WorkoutActivity(req.body);
    await newActivity.save();
    res.json(newActivity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.get("/api/activity/workout", async (req, res) => {
  const activities = await WorkoutActivity.find();
  res.json(activities);
});

// ==========================
// Exercise Library Activity Routes
// ==========================
app.post("/api/activity/exercise", async (req, res) => {
  try {
    const newActivity = new ExerciseActivity(req.body);
    await newActivity.save();
    res.json(newActivity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.get("/api/activity/exercise", async (req, res) => {
  const activities = await ExerciseActivity.find();
  res.json(activities);
});

// ==========================
// Fit Activity Routes
// ==========================
app.post("/api/activity/fit", async (req, res) => {
  try {
    const newActivity = new FitActivity(req.body);
    await newActivity.save();
    res.json(newActivity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.get("/api/activity/fit", async (req, res) => {
  const activities = await FitActivity.find();
  res.json(activities);
});

// ==========================
// Fun Activity Routes
// ==========================
app.post("/api/activity/fun", async (req, res) => {
  try {
    const newActivity = new FunActivity(req.body);
    await newActivity.save();
    res.json(newActivity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.get("/api/activity/fun", async (req, res) => {
  const activities = await FunActivity.find();
  res.json(activities);
});


const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
