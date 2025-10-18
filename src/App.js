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
  const properties=[
    {
      // temp data for now
      title: "Luxury Home in Los Angeles",
      location: "Los Angeles, CA",
      price: 2200000,
    }
  ]
  const handleSearch = (query) =>
  {
    console.log("Searching for:", query);

  const data= ["hello", "los angeles"];

  const filtered=data.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  setResults(filtered);
  };

  return (
    <Router>
    <div className="app-container">
      <NavBar />
      <Routes>
          <Route path="/" element={<HomePage onSearch={handleSearch} />}/>
          <Route path="/results" element={<ResultsPage results={results} />}/>
      </Routes>
      
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
