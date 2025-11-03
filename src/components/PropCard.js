import React from "react";
import "./PropCard.css";

function PropCard({property})
{
    return(
        <div className="property-card">
            <img 
                src={property.display_img || "https://via.placeholder.com/300x200?text=No+Image"} 
                alt={property.address}
                className="property-image"
            />
            <div className="property-details">
                <h3 className="property-address">{property.address}</h3>
                <p className="property-location">{property.city}, {property.state} {property.zipcode}</p>
                <p className="property-price">${property.price}</p>
                <div className="property-info">
                    <p className="property-sqft">
                        <strong>Sq Ft:</strong> {property.sqft ? parseFloat(property.sqft).toLocaleString() : 'N/A'}
                    </p>
                    <p className="property-full-address">
                        <strong>Full Address:</strong> {property.full_addr}
                    </p>
                </div>
                <div className="property-agent">
                    <p><strong>Agent:</strong> {property.agent}</p>
                    <p><strong>Organization:</strong> {property.organization}</p>
                </div>
            </div>
        </div>
    )
}

export default PropCard;