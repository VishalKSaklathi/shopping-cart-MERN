import { useContext } from 'react';
import { SearchContext } from './searchContext';

export const useSearch = () => useContext(SearchContext);
