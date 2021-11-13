import React from 'react';

// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';

// Components

// Hook
import { useHomeFetch } from '../hooks/useHomeFetch';
// Image
import NoImage from '../images/no_image.jpg';
import Button from './Button';
import Grid from './Grid';
import HeroImage from './HeroImage';
import SearchBar from './SearchBar';
import Spinner from './Spinner';
import Thumb from './Thumb';

const Home = () => {
    const { state, setSearchTerm, searchTerm, loading, setIsLoadingMore, error } = useHomeFetch();
    
    console.log(state);
    
    if (error) {
        return <div>Something went wrong...</div>
    }
    
    return (
        <>
            {!searchTerm && state.results[0] ? 
            <HeroImage 
                image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
                title={state.results[0].original_title}
                text={state.results[0].overview}
            /> : null
            }
            <SearchBar setSearchTerm={setSearchTerm}/>
            <Grid header={searchTerm ? searchTerm : 'Popular Movies'}>
                {state.results.map(movie => (
                    <Thumb key={movie.id}
                           clickable
                           image={
                               movie.poster_path ? 
                               IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path 
                               : NoImage
                           }
                           movieId={movie.id}/>
                ))}
            </Grid>
            { loading && <Spinner/>}
            {
                state.page < state.total_pages && !loading && (
                    <Button text='Load More' callback={() => setIsLoadingMore(true)}/>
                )
            }
        </>
    );
}

export default Home;
