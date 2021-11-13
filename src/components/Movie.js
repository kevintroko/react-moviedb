import React from 'react';
import { useMovieFetch } from '../hooks/useMovieFetch';
import { useParams  } from 'react-router-dom';

const Movie = () => {
    const { movieId } = useParams();
    const { state: movie, loading, error } = useMovieFetch(movieId);
    
    console.log(movie);
    return (
      <>
        <div>Movie</div>
      </>  
    );
};

export default Movie;
