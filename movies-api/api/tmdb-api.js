import fetch from 'node-fetch';

// Fetch upcoming movies from TMDB
export const getUpcomingMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US`
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.status_message || "An error occurred while fetching the upcoming movies.");
        }

        return await response.json(); // Return the full response
    } catch (error) {
        throw new Error(error.message || "Failed to fetch upcoming movies.");
    }
};

// Fetch genres from TMDB
export const getGenres = async () => {
    try {
       
        const response = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
        );

        // If the response is not OK (not status 200), throw an error
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error fetching genres:", errorData.message); // Log the error message
            throw new Error(errorData.message);
        }

        // Parse the response to JSON if the request is successful
        const data = await response.json();
        
        // Return only the genres array to simplify further usage
        return data.genres;
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error occurred while fetching genres:", error);
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

// Fetch movies by release date from TMDB
export const getMoviesByDate = async (startDate, endDate) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&language=en-US&page=1`
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


// Fetch actor/director by name from TMDB
export const searchPersonByName = async (name) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/person?api_key=${process.env.TMDB_KEY}&query=${encodeURIComponent(name)}&language=en-US&page=1`
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();
        return data.results; // Return the list of people found (actors, directors)
    } catch (error) {
        throw error;
    }
};

// Fetch movies for a specific person (actor/director)
export const getMoviesByPersonId = async (personId) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${process.env.TMDB_KEY}&language=en-US`
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();
        return data.cast.concat(data.crew); // Combine actor and director roles
    } catch (error) {
        throw error;
    }
};

