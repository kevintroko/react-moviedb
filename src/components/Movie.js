import React from 'react';
import { useMovieFetch } from '../hooks/useMovieFetch';
import { useParams  } from 'react-router-dom';
import BreadCrumb from './BreadCrumb';
import Spinner from './Spinner';

const Movie = () => {
    const { movieId } = useParams();
    const { state: movie, loading, error } = useMovieFetch(movieId);
    
    console.log(movie);
    
    if (loading) {
        return <Spinner/>
    }
    
    if (error) {
        return <div>Something went wrong...</div>
    }
    
    return (
      <>
        <BreadCrumb movieTitle={movie.original_title}></BreadCrumb>
        <div>Movie</div>
      </>  
    );
};

export default Movie;
