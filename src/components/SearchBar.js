import React, {useState} from 'react';
import "./SearchBar.css";

function SearchBar({onSearch})
{
    const[filters, setFilters]=useState({
        city: "",
        zipcode: "",
        address: "",
        min_price: "",
        max_price: ""
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit= (e) =>
    {
        e.preventDefault();
        onSearch(filters);
    }

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <div className="filter-container">
                <input 
                    type="text"
                    name="city"
                    placeholder="City"
                    value={filters.city}
                    onChange={handleInputChange}
                    className="search-input"
                />
                <input 
                    type="text"
                    name="zipcode"
                    placeholder="Zipcode"
                    value={filters.zipcode}
                    onChange={handleInputChange}
                    className="search-input"
                />
                <input 
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={filters.address}
                    onChange={handleInputChange}
                    className="search-input"
                />
                <input 
                    type="number"
                    name="min_price"
                    placeholder="Min Price"
                    value={filters.min_price}
                    onChange={handleInputChange}
                    className="search-input"
                />
                <input 
                    type="number"
                    name="max_price"
                    placeholder="Max Price"
                    value={filters.max_price}
                    onChange={handleInputChange}
                    className="search-input"
                />
            </div>
            <button type="submit" className="search-button">
                Search
            </button>
        </form>
    );
};

export default SearchBar;