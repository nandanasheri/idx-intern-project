import React from "react";
import SearchBar from "../components/SearchBar";
import PropList from "../components/PropList";
import "./HomePage.css";

function HoomePage({onSearch, results})
{
    const handleSearch=(filters) =>
    {
        onSearch(filters);
    }

    return(
        <div className="home-container">
            <h1>Search for your home in California:</h1>
            <SearchBar onSearch={handleSearch}/>
            
            {results && results.length > 0 && (
                <div className="results-section">
                    <h2>Search Results ({results.length})</h2>
                    <PropList properties={results} />
                </div>
            )}
        </div>
    );
}

export default HoomePage;