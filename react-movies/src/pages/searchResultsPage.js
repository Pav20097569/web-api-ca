import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Pagination, Box } from "@mui/material";
import { getSearchResults } from "../api/tmdb-api"; // Updated API function

const SearchResultsPage = () => {
  const { query } = useParams(); // Extract the search query from the URL
  const [page, setPage] = useState(1); // Pagination state

  // Fetch search results
  const { data, isLoading, isError } = useQuery(
    ["searchResults", { query, page }],
    () => getSearchResults(query, page),  // Pass page parameter to API function
    { keepPreviousData: true }
  );

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography>Error loading search results.</Typography>;

  const { results, total_pages } = data; // Results and pagination info

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value); // Update the page number
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Search Results for: "{query}"
      </Typography>

      <Grid container spacing={3}>
        {results.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Card>
              <CardMedia
                component="img"
                alt={movie.title}
                height="300"
                image={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : "default-image.jpg"}
              />
              <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {movie.release_date}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
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

export default SearchResultsPage;
