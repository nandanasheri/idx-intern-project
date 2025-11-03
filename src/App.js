import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import PropertyList from "./components/PropList";
import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [results, setResults]=useState([]);

  const handleSearch = async (filters) =>
  {
    console.log("Searching with filters:", filters);

    // Build the query URL for our local proxy
    const baseUrl = "http://localhost:3001/api/search";
    const params = new URLSearchParams();

    // Add each filter to the URL if it has a value
    if (filters.city) params.append("q", filters.city);
    if (filters.zipcode) params.append("zipcode", filters.zipcode);
    if (filters.address) params.append("address", filters.address);
    if (filters.min_price) params.append("min_price", filters.min_price);
    if (filters.max_price) params.append("max_price", filters.max_price);

    const queryUrl = `${baseUrl}?${params.toString()}`;
    console.log("Query URL:", queryUrl);

    try {
      // Fetch data from our proxy server
      const response = await fetch(queryUrl);
      const jsonData = await response.json();
      
      // Log the raw JSON data
      console.log("Raw JSON Data:", jsonData);
      
      // Extract the data array from the response
      const properties = jsonData.data || jsonData;
      
      // Update results state with the fetched data
      setResults(properties);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]);
    }
  };

  return (
    <Router>
    <div className="app-container">
      <NavBar />
      <Routes>
          <Route path="/" element={<HomePage onSearch={handleSearch} results={results} />}/>
      </Routes>
      
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
