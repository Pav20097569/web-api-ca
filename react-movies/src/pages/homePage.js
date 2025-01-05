import React, { useState } from "react";
import { useQuery } from 'react-query';
import { fetchMovies } from '../api/axios'; 
import PageTemplate from '../components/templateMovieListPage';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import styled from 'styled-components'; // Import styled-components

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

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

const HomePage = (props) => {
  const MOVIES_PER_PAGE = 10; 
  const [page, setPage] = useState(1); // Manage Current Page State

  // Fetching movies using React Query and Axios
  const { data, error, isLoading, isError } = useQuery(['discover', { page }], fetchMovies);

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  // Pagination logic
  const startIndex = (page - 1) * MOVIES_PER_PAGE;
  const endIndex = startIndex + MOVIES_PER_PAGE;
  const displayedMovies = movies.slice(startIndex, endIndex);

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

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  const addToFavorites = (movieId) => true;

  return (
    <Container>
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies} // Pass only the limited movies to PageTemplate
        action={(movie) => <AddToFavoritesIcon movie={movie} />} // Handle adding to favorites
      />
      <Pagination>
        <Button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </Button>
        <PageIndicator>Page {page}</PageIndicator>
        <Button onClick={handleNextPage} disabled={endIndex >= movies.length}>
          Next
        </Button>
      </Pagination>
    </Container>
  );
};

export default HomePage;
