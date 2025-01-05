import React, { useContext, useState } from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'; 
import { MoviesContext } from '../contexts/moviesContext';
import styled from 'styled-components'; // Import styled-components for pagination

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

const UpcomingMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery("upcomingMovies", () => getUpcomingMovies(1));
  const { addToMustWatch } = useContext(MoviesContext); 

  // State for pagination
  const [page, setPage] = useState(1);
  const MOVIES_PER_PAGE = 10;

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    console.error("Error fetching upcoming movies:", error);
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

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

  if (!movies || movies.length === 0) {
    return <h1>No upcoming movies found.</h1>;
  }

  return (
    <>
      <PageTemplate
        title="Upcoming Movies"
        movies={displayedMovies} // Pass only the movies for the current page
        action={(movie) => (
          <PlaylistAddIcon 
            onClick={() => addToMustWatch(movie.id)} 
            style={{ cursor: 'pointer' }} 
          />
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

export default UpcomingMoviesPage;
