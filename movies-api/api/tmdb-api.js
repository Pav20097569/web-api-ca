import fetch from 'node-fetch';

// Fetch upcoming movies from TMDB
export const getUpcomingMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Fetch genres from TMDB
export const getGenres = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();
        return data.genres; // Return only the genres array
    } catch (error) {
        throw error;
    }
};


// Fetch movies by title from TMDB
export const searchMoviesByTitle = async (title) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${encodeURIComponent(title)}&language=en-US&page=1` //encoded uri makes sure spaces and special characters are searched correctly
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();
        return data.results; // Return the list of movies found
    } catch (error) {
        throw error;
    }
};


// Fetch movies by language from TMDB
export const getMoviesByLanguage = async (language) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=${language}&page=1`
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();
        return data.results; // Return the list of movies found
    } catch (error) {
        throw error;
    }
};