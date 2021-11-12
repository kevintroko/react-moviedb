import React, { useState, useEffect } from 'react';

// Styles
import { Wrapper, Content } from './Searchbar.styles';

// Image
import searchIcon from '../../images/search-icon.svg';

const SearchBar = ({ setSearchTerm }) => {
    const [state, setState] = useState('');
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchTerm(state)
        }, 1000)
        
        return () => clearTimeout(timer);
    }, [setSearchTerm, state]); 
    
    return (
        <Wrapper>
            <Content>
                <img src={searchIcon} alt="search-icon"/>
                <input type="text" 
                       placeholder="Search Movie"
                       onChange={event => setState(event.currentTarget.value)}
                       value={state}/>
            </Content>
        </Wrapper>
    )
};

export default SearchBar;
