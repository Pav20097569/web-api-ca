# Assignment 2 - Web API.

Name: Pawel Jaglarz

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)
 
 + Added Api Endpoint for : Search Movie by Title, Search movie by    language, Search movie by release date and search movie by actor or director

 + Linked Backend and front end for listing all the movies on the homepage
 
 + Attempted to add actor collection to mongo but not working correctly  
 
 + Authentication using firebase as having troubles with figuring out authentication using node

 + Backend and frontend link for upcoming movies but error fetching


## API Configuration

Configurations that need to be made to run api env file example:

NODE_ENV=development
PORT=8080
HOST=
MONGO_DB=YourMongoURL
TMDB_KEY=YourTMDBKey
SECRET=YourJWTSecret


______________________
NODEENV=development
PORT=8080
HOST=
mongoDB=YourMongoURL
seedDb=true
secret=YourJWTSecret
______________________

## API Design
Web API Design

GET /api/movies - Retrieve a list of movies.

GET /api/movies/{id} - Retrieve details of a specific movie by its ID.

GET /api/movies/tmdb/upcoming - Fetch a list of upcoming movies from TMDB.

GET /api/movies/tmdb/genres - Fetch all movie genres from TMDB.

GET /api/movies/tmdb/search - Search for movies by title on TMDB.

GET /api/movies/tmdb/language - Fetch movies by language from TMDB.

GET /api/movies/tmdb/releasedates - Fetch movies by release dates from TMDB.

GET /api/movies/tmdb/searchByPerson - Search for movies by actor or director's name.


## Integrating with React App

To integrate the React app with the backend API, I utilized HTTP requests (via fetch or a library like axios) to communicate with the different routes provided by the backend. This approach allows the frontend to interact with our custom movie data, user authentication, and more, without relying entirely on the TMDB API.
  

Replaced TMDB API calls: The previous implementation used direct TMDB API calls to fetch movie data. Now, we fetch movie data from our custom API. Specifically, we call the /api/movies endpoint to retrieve a list of movies

Upcoming Movies: To get the list of upcoming movies, we now call /api/movies/tmdb/upcoming to fetch the latest upcoming movies from TMDB through our backend but when I click the upcoming movies button it wont show the movies but when looking through localhost for the backend it shows

