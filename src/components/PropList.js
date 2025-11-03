import React from "react";
import PropCard from "./PropCard";
import "./PropList.css";

function PropList({properties})
{
    return(
        <div className="property-list">
            {properties.map((property) =>
                (<PropCard key={property.id} property={property}/>
            ))}
        </div>
    );
}

export default PropList;