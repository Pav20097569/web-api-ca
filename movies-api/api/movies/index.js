import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import { getUpcomingMovies, getGenres } from '../tmdb-api'; // Import getGenres from tmdb-api
import { searchMoviesByTitle } from '../tmdb-api';

const router = express.Router();

// Fetch paginated list of movies
router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; // Convert to numeric (req.query contains string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); // Calculate total pages 

    // Construct return object and insert into response
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

// Get movie details by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({ message: 'The movie you requested could not be found.', status_code: 404 });
    }
}));

// Get upcoming movies from TMDB
router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

// Fetch movie genres from TMDB
router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    try {
        const genres = await getGenres(); // Call TMDB API to fetch genres
        res.status(200).json({ status: 'success', data: genres });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to fetch genres from TMDB', error: error.message });
    }
}));


// New Endpoint - Search TMDB movies by title
router.get('/tmdb/search', asyncHandler(async (req, res) => {
    const { title } = req.query; // Title passed as a query parameter

    if (!title) {
        return res.status(400).json({ message: 'Title query parameter is required.', status_code: 400 });
    }

    try {
        const searchResults = await searchMoviesByTitle(title); // Call the TMDB API to search for movies
        res.status(200).json({ status: 'success', data: searchResults });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to search movies from TMDB', error: error.message });
    }
}));

// New Endpoint  - Fetch movies by genre
router.get('/byGenre', asyncHandler(async (req, res) => {
    const { genre } = req.query; // Genre passed as a query parameter
    if (!genre) {
        return res.status(400).json({ message: 'Genre parameter is required.', status_code: 400 });
    }
    try {
        const movies = await movieModel.find({ genre: genre }); // Find movies with the specified genre
        res.status(200).json({ status: 'success', data: movies });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to fetch movies by genre', error: error.message });
    }
}));


export default router;