import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import { useQuery } from "react-query";
import { getActorMovies, getActorDetails } from "../api/tmdb-api"; // Import the function to fetch actor's movies and details
import { Grid, Card, CardContent, Typography, CardMedia, Pagination, Box, Button } from "@mui/material";

const ActorMoviesPage = () => {
  const { id } = useParams(); // Get the actor's id from the URL parameters
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [page, setPage] = useState(1); // Track the current page

  // Fetch actor movies with pagination
  const { data: moviesData, isLoading: moviesLoading, error: moviesError } = useQuery(
    ["actorMovies", { actorId: id, page: page, perPage: 10 }],
    getActorMovies,
    { keepPreviousData: true }
  );

  // Fetch actor details to get their name
  const { data: actorData, isLoading: actorLoading, error: actorError } = useQuery(
    ["actorDetails", { actorId: id }],
    () => getActorDetails(id)
  );

  if (moviesLoading || actorLoading) return <div>Loading...</div>;
  if (moviesError || actorError) return <div>Error: {moviesError?.message || actorError?.message}</div>;

  // Destructure the list of movies and pagination info
  const { cast, total_pages } = moviesData;

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value); // Update the page number
  };

  // Navigate to movie details page
  const handleMoreInfoClick = (movieId) => {
    navigate(`/movies/${movieId}`); // Use useNavigate to go to the movie details page
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Heading with Actor's Name */}
      <Typography variant="h4" gutterBottom align="center" sx={{ marginBottom: 3 }}>
        Movies Starring {actorData?.name}
      </Typography>

      <Grid container spacing={3}>
        {cast.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: "10px",
                '&:hover': {
                  boxShadow: 6, // Enhanced shadow on hover
                  transform: "scale(1.05)",
                  transition: "transform 0.3s ease-in-out",
                },
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <CardMedia
                component="img"
                alt={movie.title}
                height="200"
                image={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : "default-image.jpg"}
                sx={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
              />
              <CardContent sx={{ paddingBottom: 2 }}>
                <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.release_date}
                </Typography>
                {/* More Info Button */}
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => handleMoreInfoClick(movie.id)}
                  sx={{ marginTop: 1 }}
                >
                  More Info
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Component */}
      <Box mt={3} display="flex" justifyContent="center">
        <Pagination
          count={total_pages} // Total number of pages
          page={page} // Current page
          onChange={handlePageChange} // Handle page change
          color="primary"
          siblingCount={1}
        />
      </Box>
    </div>
  );
};

export default ActorMoviesPage;
