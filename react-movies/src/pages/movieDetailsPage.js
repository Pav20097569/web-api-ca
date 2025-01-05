import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import MovieDetails from "../components/movieDetails/";  
import PageTemplate from "../components/templateMoviePage";
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import MovieCredits from "../components/credits"; 
import { getMovie, getMovieCredits } from "../api/tmdb-api";  

const MoviePage = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();  // Initialize navigate function

  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: id }],
    getMovie
  );

  const { data: credits, isLoading: creditsLoading, isError: creditsError } = useQuery(
    ['movie', { id: id, endpoint: 'credits' }],
    getMovieCredits
  );

  if (isLoading || creditsLoading) {
    return <Spinner />;
  }

  if (isError || creditsError) {
    return <h1>{error?.message || 'Error fetching movie credits'}</h1>;
  }

  // Redirect to actor's movie page
  const handleActorClick = (actorId) => {
    navigate(`/actor/${actorId}`);  // Redirect to actor's movie page
  };

  return (
    <>
      {/* Embed the CSS styles in the page */}
      <style>
        {`
          /* Container for the actor buttons */
          .actor-button-container {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-top: 20px;
            padding: 10px;
          }

          /* Style for each actor button */
          .actor-button {
            background-color: #007bff; /* Blue background */
            color: white; /* Text color */
            padding: 10px 20px; /* Top and bottom padding, left and right padding */
            border: none;
            border-radius: 25px; /* Rounded corners */
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease, transform 0.2s ease; /* Smooth transition for hover effects */
            white-space: nowrap; /* Prevent text from wrapping */
            min-width: 150px; /* Ensures buttons have a minimum width */
          }

          /* Hover effect for the actor button */
          .actor-button:hover {
            background-color: #0056b3; /* Darker blue */
            transform: scale(1.05); /* Slightly enlarges the button */
          }

          /* Style for buttons when clicked */
          .actor-button:active {
            transform: scale(0.98); /* Slight shrink when clicked */
          }

          /* For mobile responsiveness, make sure buttons adjust on smaller screens */
          @media (max-width: 768px) {
            .actor-button {
              min-width: 120px; /* Adjust the minimum width for smaller screens */
            }
          }
        `}
      </style>

      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
            <MovieCredits credits={credits} />

            {/* Render the actor buttons with styling */}
            <div>
              <h3>Search Movies Based on Actor</h3>
              <div className="actor-button-container">
                {credits.cast.slice(0, 10).map((actor) => (
                  <button
                    key={actor.id}
                    onClick={() => handleActorClick(actor.id)} // Redirect to actor's movie page
                    className="actor-button"
                  >
                    {actor.name}
                  </button>
                ))}
              </div>
            </div>
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details...</p>
      )}
    </>
  );
};

export default MoviePage;
