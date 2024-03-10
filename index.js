// app.js or server file
const express = require('express');
const app = express();
const dbConnection = require('./config/database');

// Load config from env
require('dotenv').config();

// Middleware
app.use(express.json()); // Parse body as JSON

// Connect to DB
dbConnection();

// Import routes for the todo API
const routes = require('./routes/routes');

// Mount the todo API routes
app.use("/api/v1", routes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});

// Default route
app.get('/', (req, res) => {
    res.send("Default route");
});
