import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]); // State for favorites
  const [myReviews, setMyReviews] = useState({}); // State for reviews
  const [mustWatch, setMustWatch] = useState([]); // State for Must Watch list

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
    } else {
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites);
  };

  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter((mId) => mId !== movie.id));
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  // New function to add movies to Must Watch list
  const addToMustWatch = (movieId) => {
    setMustWatch((prevMustWatch) => {
      if (!prevMustWatch.includes(movieId)) {
        return [...prevMustWatch, movieId];
      }
      return prevMustWatch; 
    });
    console.log("Must Watch List:", [...mustWatch, movieId]);
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        mustWatch, 
        addToMustWatch, 
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
