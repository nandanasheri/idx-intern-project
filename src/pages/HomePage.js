import React from "react";
import {useNavigate} from "react-router-dom";
import SearchBar from "../components/SearchBar";
import "./HomePage.css";

function HoomePage({onSearch})
{
    const navigate=useNavigate();

    const handleSearch=(query) =>
    {
        onSearch(query);
        navigate("/results");
    }

    return(
        <div className="home-container">
            <h1>Search for your home in California:</h1>
            <SearchBar onSearch={handleSearch}/>
        </div>
    );
}

export default HoomePage;