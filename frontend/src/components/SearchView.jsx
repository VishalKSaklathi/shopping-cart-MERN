import React from 'react'
import { useSearch } from '../context/useSearch'
import { Link } from 'react-router-dom';
function SearchView() {
    const { searchText, searchResults } = useSearch();
    return (
        <div style={{ marginTop: '100px', padding: '1rem' }}>
            <h4>Search Results for: "{searchText}"</h4>
            {searchResults.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <ul className="list-group">
                    {searchResults.map(product => (
                        <Link to={`/products/${product.id}`}>
                            <li key={product.id} className="list-group-item">
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    width="50"
                                    className="me-3"
                                />
                                <strong>{product.title}</strong> - ₹{Math.ceil(product.price * 80)}
                            </li>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchView

// How i was able to acheive search functionality?
// Create a context called searchContext, provider searchProvider then useSearch customhook
// in searchProider i wrote the logic to filter results and used useEffect
// using that hook call it wherever it it requied
// and u need to handle onSubmit of Form as well by calling e.preventDefault and naigateing to /search