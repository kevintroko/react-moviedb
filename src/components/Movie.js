import React from 'react';
import { useMovieFetch } from '../hooks/useMovieFetch';
import { useParams  } from 'react-router-dom';
import BreadCrumb from './BreadCrumb';
import Spinner from './Spinner';
import MovieInfo from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';

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
        <MovieInfoBar budget={movie.budget} revenue={movie.revenue} time={movie.runtime}></MovieInfoBar>
      </>  
    );
};

export default Movie;
