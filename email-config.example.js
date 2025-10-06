// Email Configuration for FITFUN HUB
// Copy this file to email-config.js and fill in your email credentials

module.exports = {
  // Gmail SMTP Configuration (Recommended for development)
  gmail: {
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com', // Your Gmail address
      pass: 'your-app-password' // Your Gmail App Password (not regular password)
    }
  },
  
  // Alternative: SendGrid Configuration
  sendgrid: {
    service: 'sendgrid',
    auth: {
      apiKey: 'your-sendgrid-api-key'
    }
  },
  
  // Alternative: Mailgun Configuration
  mailgun: {
    service: 'mailgun',
    auth: {
      apiKey: 'your-mailgun-api-key',
      domain: 'your-mailgun-domain'
    }
  },
  
  // Alternative: Custom SMTP Configuration
  custom: {
    host: 'smtp.your-provider.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'your-email@your-provider.com',
      pass: 'your-password'
    }
  }
};

// Instructions for Gmail Setup:
// 1. Enable 2-Factor Authentication on your Gmail account
// 2. Generate an App Password: https://myaccount.google.com/apppasswords
// 3. Use the App Password (not your regular Gmail password)
// 4. Update the user and pass fields above
