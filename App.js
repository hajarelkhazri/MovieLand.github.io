import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';
//d0b26c7c

const API_URL='http://www.omdbapi.com?apikey=d0b26c7c';
/*const movie = {
      "Title": "Spiderman",
      "Year": "2010",
      "imdbID": "tt1785572",
      "Type": "movie",
      "Poster": "N/A"
  }*/

  const App = () => {
   const[movies, setMovies] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');

   const searchMovies = async (title) => {
   const response = await fetch (`${API_URL}&s=${title}`);
   const data = await response.json();
   setMovies(data.Search);
   }
   useEffect(() => {
       searchMovies('Spiderman');
   },[]);
   useEffect(()=>{
    const keyDownHandler = (event) => {
      console.log("user pressed" , event.key);

      if (event.key === 'Enter'){
        event.preventDefault();
        searchMovies(searchTerm);
      }
    };
   
   document.addEventListener('keydown',keyDownHandler)
   return () =>{
    document.removeEventListener('keydown',keyDownHandler)
   }
   },[searchTerm])




   return(
      <div className='app'>
         <h1>Movieworld</h1>
         <div className="search">
            <input
              placeholder='Search for your movie'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img 
            src={SearchIcon}
            alt="search"
            onClick={() =>searchMovies(searchTerm)}
            />
            </div>
            {movies?.length > 0 ? (
               <div className="container">
                  {movies.map((movie) =>(
                     <MovieCard movie={movie} key={movie.imdbID}/>
                     ))}
               </div>
               ):(
                  <div className='empty'>
                     <h2>No movies found</h2>
                  </div>
               )
            }
      </div>
   );

}

export default App;
