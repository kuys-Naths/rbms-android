// Load environment variables from .env file
require('dotenv').config();
console.log('MONGODB_URI:', process.env.MONGODB_URI); // Debugging line



// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');

// Create an instance of Express
const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGODB_URI; // Use a consistent variable name

if (!mongoURI) {
  console.error('MongoDB URI is missing. Check your .env file.');
  process.exit(1); // Exit the process with failure if the URI is missing
}

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with failure if the connection fails
  });

// Example route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
