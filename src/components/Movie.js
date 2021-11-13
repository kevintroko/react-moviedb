import React from 'react';
import { useMovieFetch } from '../hooks/useMovieFetch';
import { useParams  } from 'react-router-dom';
import BreadCrumb from './BreadCrumb';
import Spinner from './Spinner';
import MovieInfo from './MovieInfo';

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
        <MovieInfo  movie={movie}></MovieInfo>
      </>  
    );
};

export default Movie;
