import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import TrendingMoviesPage from "./pages/trendingMoviesPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AuthForm from "./AuthForm";
import MovieDetails from "./components/movieDetails";
import RecommendationsPage from "./pages/RecommendationsPage";
import ActorMoviesPage from './pages/ActorMoviesPage'; 
import SearchResultsPage from "./pages/searchResultsPage";






const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  const [darkMode, setDarkMode] = useState(false); // Manage dark mode state

  // Create theme based on the darkMode state
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      ...(darkMode
        ? {
            background: {
              default: "#121212", // Dark background
              paper: "#1e1e1e", // Cards and modals
            },
            text: {
              primary: "#ffffff", // White text
              secondary: "#b0b0b0", // Dimmer text
            },
          }
        : {
            background: {
              default: "#f5f5f5", // Light background
              paper: "#ffffff", // Cards and modals
            },
            text: {
              primary: "#000000", // Black text
              secondary: "#4f4f4f", // Dimmer text
            },
          }),
    },
  });

  // Handle theme toggle
  const handleThemeToggle = () => {
    setDarkMode((prev) => !prev);
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reset and apply global theme styles */}
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SiteHeader darkMode={darkMode} onThemeToggle={handleThemeToggle} /> {/* Pass props */}
          <MoviesContextProvider>
            <Routes>
              <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/actor/:id" element={<ActorMoviesPage />} />  
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
              <Route path="/movies/popular" element={<PopularMoviesPage />} />
              <Route path="/movies/trending" element={<TrendingMoviesPage />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/recommendations/:id" element={<RecommendationsPage />} /> 
              <Route path="/auth" element={<AuthForm />} />
              <Route path="/movies/:id" component={MovieDetails} />
              <Route path="/search/:query" element={<SearchResultsPage />} />

            </Routes>
          </MoviesContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
