import React, { useContext, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import styled from 'styled-components'; // For styled pagination buttons

// Styled Components for Pagination
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: ${(props) => (props.disabled ? '#cccccc' : '#007bff')};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  margin: 0 5px;
`;

const PageIndicator = styled.span`
  margin: 0 10px;
  font-weight: bold;
`;

const FavoriteMoviesPage = () => {
  const { favorites: movieIds } = useContext(MoviesContext);

  // Track the current page
  const [page, setPage] = useState(1);
  const MOVIES_PER_PAGE = 10;

  // Create an array of queries and run them in parallel.
  const favoriteMovieQueries = useQueries(
    movieIds.map((movieId) => ({
      queryKey: ["movie", { id: movieId }],
      queryFn: getMovie,
    }))
  );

  // Check if any query is still loading
  const isLoading = favoriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  // Prepare the movie data and add genre ids
  const movies = favoriteMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id);
    return q.data;
  });

  // Paginate the movies
  const startIndex = (page - 1) * MOVIES_PER_PAGE;
  const endIndex = startIndex + MOVIES_PER_PAGE;
  const displayedMovies = movies.slice(startIndex, endIndex);

  // Pagination controls
  const handleNextPage = () => {
    if (endIndex < movies.length) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (startIndex > 0) {
      setPage((prev) => Math.max(prev - 1, 1));
    }
  };

  return (
    <>
      <PageTemplate
        title="Favorite Movies"
        movies={displayedMovies} // Pass only the movies for the current page
        action={(movie) => (
          <>
            <RemoveFromFavorites movie={movie} />
            <WriteReview movie={movie} />
          </>
        )}
      />
      {/* Pagination */}
      <Pagination>
        <Button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </Button>
        <PageIndicator>Page {page}</PageIndicator>
        <Button onClick={handleNextPage} disabled={endIndex >= movies.length}>
          Next
        </Button>
      </Pagination>
    </>
  );
};

export default FavoriteMoviesPage;
