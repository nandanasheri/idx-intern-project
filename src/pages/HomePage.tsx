import React, { useState } from "react";
import "./HomePage.css";

interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  full_addr: string;
  price: string;
  sqft: string;
  agent: string;
  organization: string;
  display_img: string;
}

interface Filters {
  city: string;
  zipcode: string;
  address: string;
  min_price: string;
  max_price: string;
}

const HomePage: React.FC = () => {
  const [results, setResults] = useState<Property[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    city: "",
    zipcode: "",
    address: "",
    min_price: "",
    max_price: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching with filters:", filters);

    const baseUrl = "http://localhost:3001/api/search";
    const params = new URLSearchParams();

    if (filters.city) params.append("q", filters.city);
    if (filters.zipcode) params.append("zipcode", filters.zipcode);
    if (filters.address) params.append("address", filters.address);
    if (filters.min_price) params.append("min_price", filters.min_price);
    if (filters.max_price) params.append("max_price", filters.max_price);

    const queryUrl = `${baseUrl}?${params.toString()}`;
    console.log("Query URL:", queryUrl);

    try {
      const response = await fetch(queryUrl);
      const jsonData = await response.json();
      
      console.log("Raw JSON Data:", jsonData);
      
      const properties = jsonData.data || jsonData;
      setResults(properties);
      setShowFilterModal(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]);
    }
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Find Your Dream Home in California</h1>
        <p>Search thousands of properties across the Golden State</p>
        <button 
          className="filter-button"
          onClick={() => setShowFilterModal(true)}
        >
          🔍 Open Search Filters
        </button>
      </div>

      {results.length > 0 && (
        <div className="results-container">
          <h2>Found {results.length} Properties</h2>
          <div className="property-grid">
            {results.map((property) => (
              <div key={property.id} className="property-card">
                <img 
                  src={property.display_img || "https://via.placeholder.com/400x250?text=No+Image"} 
                  alt={property.address}
                  className="property-image"
                />
                <div className="property-details">
                  <h3 className="property-address">{property.address}</h3>
                  <p className="property-location">
                    {property.city}, {property.state} {property.zipcode}
                  </p>
                  <p className="property-price">${property.price}</p>
                  <div className="property-info">
                    <div className="info-item">
                      <strong>Sq Ft:</strong> {property.sqft ? parseFloat(property.sqft).toLocaleString() : 'N/A'}
                    </div>
                    <div className="info-item">
                      <strong>Full Address:</strong> {property.full_addr}
                    </div>
                  </div>
                  <div className="property-agent">
                    <p><strong>Agent:</strong> {property.agent}</p>
                    <p><strong>Organization:</strong> {property.organization}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showFilterModal && (
        <div className="modal-overlay" onClick={() => setShowFilterModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Search Filters</h2>
              <button 
                className="close-button"
                onClick={() => setShowFilterModal(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSearch} className="filter-form">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input 
                  type="text"
                  id="city"
                  name="city"
                  placeholder="e.g., Sacramento, Oakland"
                  value={filters.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipcode">Zipcode</label>
                <input 
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  placeholder="e.g., 94601"
                  value={filters.zipcode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input 
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Street address"
                  value={filters.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="min_price">Min Price</label>
                  <input 
                    type="number"
                    id="min_price"
                    name="min_price"
                    placeholder="Min"
                    value={filters.min_price}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="max_price">Max Price</label>
                  <input 
                    type="number"
                    id="max_price"
                    name="max_price"
                    placeholder="Max"
                    value={filters.max_price}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <button type="submit" className="search-button">
                Search Properties
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
