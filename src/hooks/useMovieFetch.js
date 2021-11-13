import { useEffect, useState, useCallback } from 'react';
import API from '../API';

export const useMovieFetch = movieId => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState({});
    const [error, setError] = useState(false);
    
    const fetchMovie = useCallback(async() => {
        try {
            setLoading(true);
            setError(false);
    
            const movie = await API.fetchMovie(movieId);
            const credits = await API.fetchCredits(movieId);
            // Get directors only
            const directors = credits.crew.filter(
              member => member.job === 'Director'
            );
    
            setState({
              ...movie,
              actors: credits.cast,
              directors
            });
            
            setLoading(false);
        } catch (e) {
            setError(true);
        }
    }, [movieId]);
    
    useEffect(() => {
        fetchMovie();    
    }, [movieId, fetchMovie]);
    
    return { state, error, loading }
}