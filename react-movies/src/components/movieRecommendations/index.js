import React, { useState, useEffect } from 'react';
import { getMovieRecommendations } from '../tmdb-api';
import MovieCard from './MovieCard';

const MovieRecommendations = ({ movieId }) => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const movieData = await getMovie({ queryKey: ['movie', { id: movieId }] });
        setMovie(movieData);
      } catch (error) {
        setError("Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);


  if (loading) {
    return <div>Loading recommendations...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Recommended Movies</h2>
      <MovieRecommendations movieId={movieId} />
      <div className="movie-list">
        {recommendedMovies.length > 0 ? (
          recommendedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} /> 
          ))
        ) : (
          <p>No recommendations available</p>
        )}
      </div>
    </div>
  );
};

export default MovieRecommendations;
