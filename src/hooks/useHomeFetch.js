import { useEffect, useState } from 'react';

// API
import API from '../API';

const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0  
};

export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    
    console.log(searchTerm);
    
    const fetchMovies = async (page, searchTerm2 = '') => {
        try {
            setError(false);
            setLoading(true);
            
            const movies = await API.fetchMovies(searchTerm2, page);
            
            setState(prev => ({
                ...movies,
                results: page > 1 ? [...prev.results, ...movies.results] : [...movies.results]  
            }));
        } catch (e) {
            setError(true);
        }
        
        setLoading(false);
    }
    
    // Initial Render and search
    useEffect(() => {
        console.log('hello from use effect');
        setState(initialState)
        fetchMovies(1, searchTerm)
    }, [searchTerm]);
    
    // Load more
    useEffect(() => {
        if (!isLoadingMore) {
            return;
        }
        
        fetchMovies(state.page + 1, searchTerm);
        setIsLoadingMore(false);
        
    }, [isLoadingMore, searchTerm, state.page])
    
    return { state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore }
};
