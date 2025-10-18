import React from "react";
import "./PropCard.css";

function PropCard({property})
{
    return(
        <div className="property-card">
            <img src={property.image} alt={property.title}/>
            <h3>{property.title}</h3>
            <p>{property.location}</p>
            <p className="price">${property.price.toLocaleString()}</p>
        </div>
    )
}

export default PropCard;