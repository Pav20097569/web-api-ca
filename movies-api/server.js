import express from 'express';
import authRoutes from './authRoutes'; // Import the authentication routes

const app = express();
app.use(express.json()); // For parsing application/json

app.use('/auth', authRoutes); // Authentication routes under "/auth" endpoint

// A simple test route
app.get('/', (req, res) => {
    res.send('Welcome to the Auth API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
