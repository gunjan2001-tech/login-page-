const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Define a schema and model
const userSchema = new mongoose.Schema({
    username: String,
    password: String // Note: Never store plain passwords in production
});

const User = mongoose.model('User', userSchema);

// Handle POST request to /api/submit
app.post('/', async (req, res) => {
    const { username, password } = req.body;
    
    // Debugging log
    console.log('Request Body:', req.body);

    if (username && password) {
        try {
            // Save to database
            const user = new User({ username, password });
            await user.save();
            res.json({ message: `Received username: ${username}. Data stored successfully.` });
        } catch (error) {
            res.status(500).json({ message: 'Error saving data to database' });
        }
    } else {
        res.status(400).json({ message: 'Username and password are required.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
