import React, { createContext, useState, useEffect } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    //fetch and filter from API when searchteext cahnges
    useEffect(() => {
        const fetchAndFilter = async () => {
            if (searchText.trim() == '') {
                setSearchResults([]);
                return;
            }
            try {
                const response = await fetch('https://dummyjson.com/products');
                const data = await response.json();
                const filtered = data.products.filter(product =>
                    product.title.toLowerCase().includes(searchText.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchText.toLowerCase())
                );
                setSearchResults(filtered);
            } catch (e) {
                console.error("Search fetch error", e);
            }
        }
        fetchAndFilter();
    }, [searchText]);
    return (
        <SearchContext.Provider value={{ searchText, setSearchText, searchResults }}>
            {children}
        </SearchContext.Provider>
    );
}