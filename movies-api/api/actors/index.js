import express from 'express';
import Actor from './actorModel';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// Endpoint to add a new actor
router.post('/add', asyncHandler(async (req, res) => {
    const { name, biography, dateOfBirth } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Name is required.' });
    }

    try {
        const newActor = new Actor({ name, biography, dateOfBirth });
        await newActor.save();
        res.status(201).json({ status: 'success', data: newActor });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to add new actor', error: error.message });
    }
}));


// Endpoint to fetch all actors
router.get('/', asyncHandler(async (req, res) => {
    try {
        const actors = await Actor.find();
        res.status(200).json({ status: 'success', data: actors });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to fetch actors', error: error.message });
    }
}));


export default router;
