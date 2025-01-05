import React, { useEffect, useState } from "react";
import MovieCard from "../components/movieCard";
import { Grid } from "@mui/material"; // Use Grid from MUI
import { useParams } from "react-router-dom";
import { getMovieRecommendations } from "../api/tmdb-api";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styled from 'styled-components'; // Import styled-components for pagination

// Styled Components for Pagination
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled(Button)`
  margin: 0 5px;
`;

const RecommendationsPage = () => {
  const { id } = useParams();
  const [recommendations, setRecommendations] = useState([]);
  const [page, setPage] = useState(1); // State for current page
  const MOVIES_PER_PAGE = 6; // Number of movies per page

  useEffect(() => {
    // Fetch movie recommendations based on movie ID
    const fetchRecommendations = async () => {
      const data = await getMovieRecommendations(id);
      setRecommendations(data.results);
    };

    fetchRecommendations();
  }, [id]);

  // Paginate the recommendations
  const startIndex = (page - 1) * MOVIES_PER_PAGE;
  const endIndex = startIndex + MOVIES_PER_PAGE;
  const displayedMovies = recommendations.slice(startIndex, endIndex);

  // Pagination controls
  const handleNextPage = () => {
    if (endIndex < recommendations.length) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (startIndex > 0) {
      setPage((prev) => Math.max(prev - 1, 1));
    }
  };

  return (
    <div>
      <Grid container spacing={3} sx={{ padding: "2em", paddingTop: "5em" }}>
        {displayedMovies.length > 0 ? (
          displayedMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}> {/* Set consistent grid sizes */}
              <MovieCard movie={movie} action={() => {}} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" component="p" sx={{ width: "100%", textAlign: "center" }}>
            No recommendations available.
          </Typography>
        )}
      </Grid>

      {/* Pagination controls */}
      <Pagination>
        <PageButton 
          onClick={handlePreviousPage} 
          disabled={page === 1}
          variant="outlined"
        >
          Previous
        </PageButton>
        <Typography variant="body1" sx={{ margin: "0 10px" }}>Page {page}</Typography>
        <PageButton 
          onClick={handleNextPage} 
          disabled={endIndex >= recommendations.length}
          variant="outlined"
        >
          Next
        </PageButton>
      </Pagination>
    </div>
  );
};

export default RecommendationsPage;
