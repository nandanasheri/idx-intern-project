import React from "react";
import PropList from "../components/PropList";
import "./ResultsPage.css";

function ResultsPage({results})
{
    return(
        <div className="results-container">
            <h2>Search Results</h2>
            {results.length>0 ? (<PropList properties={results} />) : (<p>No matching results found.</p>)}
            </div>
    );
}

export default ResultsPage;