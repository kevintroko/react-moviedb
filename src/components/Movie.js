import React from 'react';
import { useMovieFetch } from '../hooks/useMovieFetch';
import { useParams  } from 'react-router-dom';
import BreadCrumb from './BreadCrumb';
import Spinner from './Spinner';
import MovieInfo from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
import Grid from './Grid';
import Actor from './Actor';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
import NoImage from '../images/no_image.jpg';

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
        <MovieInfo movie={movie}></MovieInfo>
        <MovieInfoBar 
          budget={movie.budget} 
          revenue={movie.revenue} 
          time={movie.runtime}>
        </MovieInfoBar>
        <Grid header='Actors'>
          {
            movie.actors.map(
              actor => (
                <Actor
                  key={actor.credit_id}
                  name={actor.name}
                  character={actor.character}
                  imageUrl={
                    actor.profile_path 
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                    : NoImage
                  }>
                </Actor>
              )
            )
          }
        </Grid>
      </>  
    );
};

export default Movie;
