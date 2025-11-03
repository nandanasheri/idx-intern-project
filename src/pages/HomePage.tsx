import React, { useState } from "react";

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
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleQuickSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    console.log("Quick searching for:", searchQuery);

    const baseUrl = "http://localhost:3001/api/search";
    const params = new URLSearchParams();
    params.append("q", searchQuery);

    const queryUrl = `${baseUrl}?${params.toString()}`;
    console.log("Query URL:", queryUrl);

    try {
      const response = await fetch(queryUrl);
      const jsonData = await response.json();
      
      console.log("Raw JSON Data:", jsonData);
      
      const properties = jsonData.data || jsonData;
      setResults(properties);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-primary via-purple-600 to-primary-light">
      {/* Hero Section */}
      <div className="text-center px-8 py-16 text-white">
        <h1 className="text-5xl mb-4 font-bold drop-shadow-lg">
          Find Your Dream Home in California
        </h1>
        <p className="text-xl mb-8 opacity-95">
          Search thousands of properties across the Golden State
        </p>
        
        {/* Search Bar and Filters Button */}
        <form onSubmit={handleQuickSearch} className="max-w-3xl mx-auto">
          <div className="flex gap-3 items-center">
            <div className="flex-1 flex items-center bg-white rounded-full shadow-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search by city (e.g., Sacramento, Oakland, San Jose...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-6 py-4 text-lg border-none outline-none text-gray-800"
              />
              <button 
                type="submit"
                className="bg-primary text-white border-none px-6 py-4 text-2xl cursor-pointer transition-all duration-300 hover:bg-primary-dark"
              >
                🔍
              </button>
            </div>
            <button 
              type="button"
              onClick={() => setShowFilterModal(true)}
              className="bg-purple-800 text-white border-none px-8 py-4 text-lg font-semibold rounded-full cursor-pointer transition-all duration-300 shadow-lg hover:-translate-y-0.5 hover:shadow-xl whitespace-nowrap"
            >
              ⚙️ Filters
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="bg-white min-h-[50vh] px-8 py-12 rounded-t-[30px] mt-8">
          <h2 className="text-center mb-8 text-gray-800 text-3xl font-bold">
            Found {results.length} Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1400px] mx-auto">
            {results.map((property) => (
              <div 
                key={property.id} 
                className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <img 
                  src={property.display_img || "https://via.placeholder.com/400x250?text=No+Image"} 
                  alt={property.address}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {property.address}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {property.city}, {property.state} {property.zipcode}
                  </p>
                  <p className="text-2xl font-bold text-primary my-4">
                    ${property.price}
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg my-4">
                    <div className="mb-2 text-sm text-gray-700">
                      <strong>Sq Ft:</strong> {property.sqft ? parseFloat(property.sqft).toLocaleString() : 'N/A'}
                    </div>
                    <div className="text-xs text-gray-600">
                      <strong>Full Address:</strong> {property.full_addr}
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <p className="my-1 text-xs text-gray-600">
                      <strong>Agent:</strong> {property.agent}
                    </p>
                    <p className="my-1 text-xs text-gray-600">
                      <strong>Organization:</strong> {property.organization}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div 
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-[1000] p-4"
          onClick={() => setShowFilterModal(false)}
        >
          <div 
            className="bg-white rounded-2xl p-8 max-w-[500px] w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="m-0 text-gray-800 text-3xl font-bold">Search Filters</h2>
              <button 
                onClick={() => setShowFilterModal(false)}
                className="bg-transparent border-none text-2xl cursor-pointer text-gray-400 transition-colors duration-200 p-0 w-10 h-10 flex items-center justify-center hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSearch} className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label htmlFor="city" className="mb-2 text-gray-600 font-semibold text-sm">
                  City
                </label>
                <input 
                  type="text"
                  id="city"
                  name="city"
                  placeholder="e.g., Sacramento, Oakland"
                  value={filters.city}
                  onChange={handleInputChange}
                  className="p-3 border-2 border-gray-200 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:border-primary"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="zipcode" className="mb-2 text-gray-600 font-semibold text-sm">
                  Zipcode
                </label>
                <input 
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  placeholder="e.g., 94601"
                  value={filters.zipcode}
                  onChange={handleInputChange}
                  className="p-3 border-2 border-gray-200 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:border-primary"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="address" className="mb-2 text-gray-600 font-semibold text-sm">
                  Address
                </label>
                <input 
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Street address"
                  value={filters.address}
                  onChange={handleInputChange}
                  className="p-3 border-2 border-gray-200 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="min_price" className="mb-2 text-gray-600 font-semibold text-sm">
                    Min Price
                  </label>
                  <input 
                    type="number"
                    id="min_price"
                    name="min_price"
                    placeholder="Min"
                    value={filters.min_price}
                    onChange={handleInputChange}
                    className="p-3 border-2 border-gray-200 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="max_price" className="mb-2 text-gray-600 font-semibold text-sm">
                    Max Price
                  </label>
                  <input 
                    type="number"
                    id="max_price"
                    name="max_price"
                    placeholder="Max"
                    value={filters.max_price}
                    onChange={handleInputChange}
                    className="p-3 border-2 border-gray-200 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="bg-gradient-to-r from-primary to-primary-light text-white border-none p-4 text-lg font-semibold rounded-lg cursor-pointer transition-all duration-300 mt-2 hover:-translate-y-0.5 hover:shadow-lg"
              >
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
